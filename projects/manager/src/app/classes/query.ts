import { KeyValue } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { DataService } from 'services/data.service';
import { QueryList, QueryService } from '../services/query.service';
import { EditableItemListComponent } from '../shared-components/item-lists/editable-item-list/editable-item-list.component';
import { ItemListComponent } from '../shared-components/item-lists/item-list/item-list.component';
import { ListItem } from './list-item';
import { MenuOption } from './menu-option';


export interface Query {
    queryType: QueryType;
    operator: Array<OperatorType>;
    intValue?: Array<number>;
    stringValue?: Array<string>;
    doubleValue?: Array<number>;
    dateValue?: Array<Date>;
}

export interface IQueryRow {
    queryType: QueryType;
    otherQueryType?: QueryType;
    hasOperators: boolean;
    operatorType: OperatorType;
    valueType: ValueType;
    intValue: number;
    doubleValue?: number;
    dateValue?: Date;
    stringValue?: string;
    whereDropdownSelectedIndex: number;
    dropdownList?: Array<KeyValue<any, any>>;
    valueDropdownSelectedIndex?: number;
    queryRowIndex?: number;
    queryList?: Array<QueryList>;
    itemType?: string;
    itemTypes?: string;
    resetQuery(): void;
}

export enum ValueType {
    Dropdown,
    Price,
    EditableItemList,
    ItemList,
    Date
}



export enum QueryType {
    Category,
    Niche,
    ProductSubgroup,
    FeaturedProducts,
    CustomerRelatedProducts,
    ProductPrice,
    ProductRating,
    ProductKeywords,
    ProductCreationDate
}


export enum OperatorType {
    Equals,
    GreaterThan,
    GreaterThanOrEqualTo,
    LessThan,
    LessThanOrEqualTo,
}



export class QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryRows: Array<IQueryRow>,
        public queries: Array<Query>,
        public dataService: DataService,
        public queryService: QueryService) { }
    public queryType: QueryType;
    public operatorType: OperatorType = OperatorType.Equals;
    public intValue: number;
    public hasOperators: boolean;
    public valueType: ValueType;
    resetQuery() { };

    onDelete(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
    }

    getProducts() {
        if (this.queries.length > 0) {
            this.queryService.productResultsInProgress = true;
            this.dataService.post('api/Products/Alita', this.queries)
                .subscribe((products) => {
                    this.queryService.productResultsInProgress = false;
                    this.queryService.results = products.length;
                });
        } else {
            this.queryService.results = 0;
        }
    }
}




export class QueryRowDropdownBase extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryRows: Array<IQueryRow>,
        public queries: Array<Query>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryRows, queries, dataService, queryService);
        this.hasOperators = false;
        this.valueType = ValueType.Dropdown;
    }
    public queryList: Array<QueryList>;
    public valueDropdownSelectedIndex: number = 0;
    public dropdownList: Array<KeyValue<any, any>>;


    getUsedDropdownOptions(queryType: QueryType) {
        let usedDropdownOptions = [];

        // Loop through all the queryrows
        this.queryRows.forEach(x => {
            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {

                // And as long as that queryrow has NOT been set to 'none'
                if (x.valueDropdownSelectedIndex != 0) {
                    // Add the value of that queryrow to the used list
                    usedDropdownOptions.push(x.intValue);
                }
            }
        });
        return usedDropdownOptions;
    }


    buildDropdown(queryRow: IQueryRow, usedDropdownOptions: Array<number>, queryList: Array<QueryList>) {
        // Create the first option in the dropdown list
        queryRow.dropdownList = [{ key: "None", value: null }];

        // Loop through all the items of the query list
        queryList.forEach(y => {

            // If we come across an item in the list that is NOT a dropdown option that has been used yet
            // or the item happens to be the same as the selected option of this quryrow
            if (usedDropdownOptions.indexOf(y.id) == -1 || y.id == queryRow.intValue) {

                // Add it to the dropdown list of this quryrow
                queryRow.dropdownList.push({
                    key: y.name,
                    value: y.id
                })
            }
        })
        // Now that the dropdown list has been created, set the option that will be selected
        queryRow.valueDropdownSelectedIndex = queryRow.dropdownList.findIndex(y => y.value == queryRow.intValue);
    }

    updateDropdownQuery(queryType: QueryType) {
        let queryIndex: number = this.queries.findIndex(x => x.queryType == queryType);
        if (queryIndex != -1) this.queries.splice(queryIndex, 1);
        queryIndex = -1;

        // Loop through all the queryrows
        this.queryRows.forEach(x => {

            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {

                // And as long as the this queryrow has NOT been set to 'none'
                if (x.valueDropdownSelectedIndex != 0) {

                    // Create the query if it has NOT been created already
                    if (queryIndex == -1) {
                        this.queries.push({ queryType: queryType, operator: [OperatorType.Equals], intValue: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    // Update the query
                    this.queries[queryIndex].intValue.push(x.intValue);
                }
            }
        });
    }

    resetQuery() {
        // Reset the selected index of the value dropdown to zero
        this.valueDropdownSelectedIndex = 0;
        // Update the query
        this.updateDropdownQuery(this.queryType);

        this.getProducts();
    }

    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
        // Update the query
        this.updateDropdownQuery(this.queryType);

        this.getProducts();
    }
}


export class QueryRowDropdown extends QueryRowDropdownBase {
    initialize(queryType: QueryType, queryRowIndex: number, queryList: Array<QueryList>) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryList = queryList;

        // Build the dropdown for this new queryrow
        let usedDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryRows[queryRowIndex].queryType);
        this.buildDropdown(this.queryRows[queryRowIndex], usedDropdownOptions, this.queryRows[queryRowIndex].queryList);
    }

    updateValue(newValue: number) {
        // Update the value and the selected index
        this.intValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.intValue);

        // Rebuild all the dropdowns
        let usedDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryType);
        this.queryRows.forEach(x => {
            if (x.queryType == this.queryType) {
                this.buildDropdown(x, usedDropdownOptions, this.queryList);
            }
        });

        // Update the query
        this.updateDropdownQuery(this.queryType)

        this.getProducts();
    }
}



export class QueryRowDropdownParentChild extends QueryRowDropdownBase {
    public otherQueryType: QueryType;

    updateUsedParentIds(parentQueryType: QueryType, usedParentIds: Array<number>, parentQueryRow: IQueryRow, parentList: Array<QueryList>) {
        // If we come across a queryrow where its type is parent
        if (parentQueryRow.queryType == parentQueryType) {

            // As long as the value of the parent queryrow is NOT null
            if (parentQueryRow.intValue != null) {

                // Get the index of the parent from the parent list that corresponds with the 
                // value of the current parent queryrow and add that index to the used parent ids list
                usedParentIds.push(parentList.findIndex(y => y.id == parentQueryRow.intValue));
            }
        }
    }




    buildChildDropdown(childQueryRow: IQueryRow, usedChildDropdownOptions: Array<number>, usedParentIds: Array<number>, parentList: Array<QueryList>) {
        // Create the first option in the child dropdown list
        childQueryRow.dropdownList = [{ key: "None", value: null }];

        // If NO parent is available yet to build the child dropdown list
        if (usedParentIds.length == 0) {

            // Loop through all the parents of the parents list
            parentList.forEach(y => {

                // Then loop through each child of that current parent
                y.children.forEach(z => {

                    // And if we come across a child that has NOT been used yet or is the selected child in the dropdown of the current child quryrow
                    if (usedChildDropdownOptions.indexOf(z.id) == -1 || z.id == childQueryRow.intValue) {

                        // Add it to the dropdown list of the current child quryrow
                        childQueryRow.dropdownList.push({
                            key: z.name,
                            value: z.id
                        })
                    }
                })
            });

            // If a parent is available to build the child dropdown list 
        } else {

            // Loop through all the parent ids that have been used so far
            usedParentIds.forEach(y => {

                // Then loop through each child of that parent
                parentList[y].children.forEach(z => {

                    // And if we come across a child that has NOT been used yet or is the selected child in the dropdown of the current child quryrow
                    if (usedChildDropdownOptions.indexOf(z.id) == -1 || z.id == childQueryRow.intValue) {

                        // Add it to the dropdown list of the current child quryrow
                        childQueryRow.dropdownList.push({
                            key: z.name,
                            value: z.id
                        })
                    }
                });
            })
        }

        // Get the index of the option in the dropdown list where the option's value matches the current child queryrow value
        let valueDropdownSelectedIndex = childQueryRow.dropdownList.findIndex(y => y.value == childQueryRow.intValue);

        // If an option value in the dropdown list does NOT match the current child queryrow value, then assign the selected
        // index as zero (None). But if a match is found, assign the selected index the index of that dropdown option
        childQueryRow.valueDropdownSelectedIndex = valueDropdownSelectedIndex == -1 ? 0 : valueDropdownSelectedIndex;
    }


    updateChildQuery(parentQueryType: QueryType, childQueryType: QueryType, parentList: Array<QueryList>) {
        let parentQueryIndex: number;
        let parentId: number;
        let childQueryIndex: number = this.queries.findIndex(x => x.queryType == childQueryType);
        if (childQueryIndex != -1) this.queries.splice(childQueryIndex, 1);

        // Loop through all the queryrows
        this.queryRows.forEach(x => {

            // If we come across a child queryrow
            if (x.queryType == childQueryType) {

                // Find the index again for both the parent and child queries just in case they have changed
                parentQueryIndex = this.queries.findIndex(x => x.queryType == parentQueryType);
                childQueryIndex = this.queries.findIndex(x => x.queryType == childQueryType);

                // As long as the current child has NOT been set to 'none'
                if (x.valueDropdownSelectedIndex != 0) {

                    // Create the child query if it has NOT been created already
                    if (childQueryIndex == -1) {
                        this.queries.push({ queryType: childQueryType, operator: [OperatorType.Equals], intValue: [] });
                        childQueryIndex = this.queries.length - 1;
                    }

                    // Add the current child to the child query
                    this.queries[childQueryIndex].intValue.push(x.dropdownList[x.valueDropdownSelectedIndex].value);

                    // If a parent query exists
                    if (parentQueryIndex != -1) {

                        // Loop through all the parents of the parent list
                        for (let i = 0; i < parentList.length; i++) {
                            // Loop through each child of the curret parent
                            for (let j = 0; j < parentList[i].children.length; j++) {
                                // If we come across a child where its id matches the current child
                                if (parentList[i].children[j].id == x.dropdownList[x.valueDropdownSelectedIndex].value) {
                                    // Look to the parent where that child resides and record the id of that parent
                                    parentId = parentList[i].id;
                                    break;
                                }
                            }
                        }

                        // As long as the current child queryrow resides after the parent queryrow it belongs to
                        if (this.queryRows.indexOf(x) > this.queryRows.findIndex(y => y.intValue == parentId)) {
                            // Get the index of the id in the parent query that matches the id of the parent
                            let parentIdIndex = this.queries[parentQueryIndex].intValue.indexOf(parentId);

                            // If the id in the parent query exists
                            if (parentIdIndex != -1) {
                                // Remove that id from parent query
                                this.queries[parentQueryIndex].intValue.splice(parentIdIndex, 1);
                            }

                            // If all parents are removed from the parent query
                            if (this.queries[parentQueryIndex].intValue.length == 0) {
                                // Then remove the parent query
                                this.queries.splice(parentQueryIndex, 1);
                            }
                        }
                    }
                }
            }
        });
    }

    resetQuery() {
        // Reset the selected index of the value dropdown to zero
        this.valueDropdownSelectedIndex = 0;
        // Update the parent query
        this.updateDropdownQuery(this.queryType);
        // Update the child query
        this.updateChildQuery(this.queryType, this.otherQueryType, this.queryList);

        this.getProducts();
    }

    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
        // Update the parent query
        this.updateDropdownQuery(this.queryType);
        // Update the child query
        this.updateChildQuery(this.queryType, this.otherQueryType, this.queryList);

        this.getProducts();
    }
}




export class QueryRowDropdownParent extends QueryRowDropdownParentChild {
    initialize(parentQueryType: QueryType, childQueryType: QueryType, queryRowIndex: number, queryList: Array<QueryList>) {
        this.queryRows[queryRowIndex].queryType = parentQueryType;
        this.queryRows[queryRowIndex].otherQueryType = childQueryType;
        this.queryRows[queryRowIndex].queryList = queryList;

        // Build the dropdown for this new parent queryrow
        let usedParentDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryRows[queryRowIndex].queryType);
        this.buildDropdown(this.queryRows[queryRowIndex], usedParentDropdownOptions, this.queryRows[queryRowIndex].queryList);
    }



    updateValue(newValue: number) {
        // Update the value and the selected index
        this.intValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.intValue);


        // Rebuild all the parent queryrow dropdowns
        let usedParentDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryType);
        this.queryRows.forEach(x => {
            if (x.queryType == this.queryType) {
                this.buildDropdown(x, usedParentDropdownOptions, this.queryList);
            }
        });


        // Rebuild all the child queryrow dropdowns
        let usedParentIds: Array<number> = [];
        let usedChildDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.otherQueryType);
        this.queryRows.forEach(x => {
            // Update the list of parent ids that have been used so far
            this.updateUsedParentIds(this.queryType, usedParentIds, x, this.queryList);

            if (x.queryType == this.otherQueryType) {
                // And as long as the current child queryrow resides after the parent queryrow that was selected
                if (this.queryRows.indexOf(x) > this.queryRows.indexOf(this)) {
                    this.buildChildDropdown(x, usedChildDropdownOptions, usedParentIds, this.queryList);
                }
            }
        });


        // If there are any child queryrows that reside before the first parent queryrow
        if (this.queryRows.findIndex(x => x.queryType == this.otherQueryType) < this.queryRows.findIndex(x => x.queryType == this.queryType)) {

            // Rebuild those child queryrow dropdowns
            let usedParentIds: Array<number> = [];
            let usedChildDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.otherQueryType);
            this.queryRows.forEach(x => {
                if (x.queryType == this.otherQueryType) {

                    // As long as the current child queryrow resides before the first parent queryrow
                    if (this.queryRows.indexOf(x) < this.queryRows.findIndex(x => x.queryType == this.queryType)) {
                        this.buildChildDropdown(x, usedChildDropdownOptions, usedParentIds, this.queryList);
                    }
                }
            });
        }

        // Update the parent query
        this.updateDropdownQuery(this.queryType);
        // Update the child query
        this.updateChildQuery(this.queryType, this.otherQueryType, this.queryList);

        this.getProducts();
    }
}



export class QueryRowDropdownChild extends QueryRowDropdownParentChild {
    initialize(parentQueryType: QueryType, childQueryType: QueryType, queryRowIndex: number, queryList: Array<QueryList>) {
        this.queryRows[queryRowIndex].queryType = childQueryType;
        this.queryRows[queryRowIndex].otherQueryType = parentQueryType;
        this.queryRows[queryRowIndex].queryList = queryList;

        // Update the list of parent ids that have been used so far
        let usedParentIds: Array<number> = [];
        this.queryRows.forEach(x => {
            this.updateUsedParentIds(this.queryRows[queryRowIndex].otherQueryType, usedParentIds, x, this.queryRows[queryRowIndex].queryList);
        })

        // Build the dropdown for this new child queryrow
        let usedChildDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryRows[queryRowIndex].queryType);
        this.buildChildDropdown(this.queryRows[queryRowIndex], usedChildDropdownOptions, usedParentIds, this.queryRows[queryRowIndex].queryList);
    }


    updateValue(newValue: number) {
        // Update the value and the selected index
        this.intValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.intValue);


        // Rebuild all the child queryrow dropdowns
        let usedParentIds: Array<number> = [];
        let usedChildDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryType);
        this.queryRows.forEach(x => {
            // Update the list of parent ids that have been used so far
            this.updateUsedParentIds(this.otherQueryType, usedParentIds, x, this.queryList);

            if (x.queryType == this.queryType) {
                this.buildChildDropdown(x, usedChildDropdownOptions, usedParentIds, this.queryList);
            }
        });

        // Update the parent query
        this.updateDropdownQuery(this.otherQueryType);
        // Update the child query
        this.updateChildQuery(this.otherQueryType, this.queryType, this.queryList);

        this.getProducts();
    }
}


export class QueryRowDropdownWithOperator extends QueryRowDropdownBase {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryRows: Array<IQueryRow>,
        public queries: Array<Query>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryRows, queries, dataService, queryService)
        this.hasOperators = true;
    }
    public doubleValue: number;
    public queryRowIndex: number;



    initialize(queryType: QueryType, queryRowIndex: number, queryList: Array<QueryList>) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryList = queryList;
        this.queryRows[queryRowIndex].queryRowIndex = queryRowIndex;

        // Build the dropdown for this new queryrow
        let usedDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryRows[queryRowIndex].queryType);
        this.buildDropdown(this.queryRows[queryRowIndex], usedDropdownOptions, this.queryRows[queryRowIndex].queryList);
    }


    getUsedDropdownOptions(queryType: QueryType) {
        let usedDropdownOptions = [];

        // Loop through all the queryrows
        this.queryRows.forEach(x => {
            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {

                // And as long as that queryrow has NOT been set to 'none'
                if (x.valueDropdownSelectedIndex != 0) {

                    // Add the value of that queryrow to the used list
                    usedDropdownOptions.push(x.doubleValue);
                }
            }
        });
        return usedDropdownOptions;
    }


    buildDropdown(queryRow: IQueryRow, usedDropdownOptions: Array<number>, queryList: Array<QueryList>) {
        // Build the value dropdown
        // Create the first option in the dropdown list
        queryRow.dropdownList = [{ key: "None", value: null }];

        // Loop through all the items of the query list
        queryList.forEach(y => {

            // If we come across an item in the list that is NOT a dropdown option that has been used yet
            // or the item happens to be the same as the selected option of this quryrow
            if (usedDropdownOptions.indexOf(y.id) == -1 || y.id == queryRow.doubleValue) {

                // Add it to the dropdown list of this quryrow
                queryRow.dropdownList.push({
                    key: y.name,
                    value: y.id
                })
            }
        })
        // Now that the dropdown list has been created, set the option that will be selected
        queryRow.valueDropdownSelectedIndex = queryRow.dropdownList.findIndex(y => y.value == queryRow.doubleValue);
    }

    updateDropdownQuery(queryType: QueryType) {
        let queryIndex: number = this.queries.findIndex(x => x.queryType == queryType);
        if (queryIndex != -1) this.queries.splice(queryIndex, 1);
        queryIndex = -1;

        // Loop through all the queryrows
        this.queryRows.forEach(x => {

            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {

                // And as long as the value dropdown for this queryrow has NOT been set to 'none'
                if (x.valueDropdownSelectedIndex != 0) {

                    // Create the query if it has NOT been created already
                    if (queryIndex == -1) {
                        this.queries.push({ queryType: queryType, operator: [], doubleValue: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    // Update the query
                    this.queries[queryIndex].doubleValue.push(x.doubleValue);
                    this.queries[queryIndex].operator.push(x.operatorType);
                }
            }
        });

        // As long as the value dropdown for this queryrow has NOT been set to 'none'
        if (this.valueDropdownSelectedIndex != 0) {
            this.getProducts();
        }
    }



    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
        this.updateDropdownQuery(this.queryType);
    }


    updateValue(newValue: number) {
        // Update the value and the selected index
        this.doubleValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.doubleValue);

        // Rebuild all the dropdowns
        let usedDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryType);
        this.queryRows.forEach(x => {
            if (x.queryType == this.queryType) {
                this.buildDropdown(x, usedDropdownOptions, this.queryList);
            }
        });

        // Update the query
        this.updateDropdownQuery(this.queryType);
    }
}



export class QueryRowPrice extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryRows: Array<IQueryRow>,
        public queries: Array<Query>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryRows, queries, dataService, queryService)
        this.hasOperators = true;
        this.valueType = ValueType.Price;
    }
    public doubleValue: number;


    initialize(queryType: QueryType, queryRowIndex: number) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryRowIndex = queryRowIndex;
    }

    getPrice(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        let wholeNumberValue: number = 0;
        let decimalValue: number = 0.0;

        // Calculate the whole number and decimal values based on what is being passed in from the input text boxes
        wholeNumberValue = wholeNumberInputText.value.length == 0 ? 0 : parseInt(wholeNumberInputText.value);
        decimalValue = decimalInputText.value.length == 0 ? 0 : decimalValue = parseInt(decimalInputText.value) * (decimalInputText.value.length == 1 ? 0.1 : 0.01);

        // Return the whole number and decimal value
        return wholeNumberValue + decimalValue;
    }



    updateWholeNumberValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(wholeNumberInputText.value) ? wholeNumberInputText.value = wholeNumberInputText.value.replace(/[^0123456789]/ig, '') : null;

        // Update the whole number value
        this.doubleValue = this.getPrice(wholeNumberInputText, decimalInputText);
        // Update the query
        this.updateQuery(this.queryType);
    }

    updateDecimalValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(decimalInputText.value) ? decimalInputText.value = decimalInputText.value.replace(/[^0123456789]/ig, '') : null;

        // Update the decimal value
        this.doubleValue = this.getPrice(wholeNumberInputText, decimalInputText);
        // Update the query
        this.updateQuery(this.queryType);
    }


    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
        this.updateQuery(this.queryType);
    }


    updateQuery(queryType: QueryType) {
        let queryIndex: number = this.queries.findIndex(x => x.queryType == queryType);
        if (queryIndex != -1) this.queries.splice(queryIndex, 1);
        queryIndex = -1;

        // Loop through all the queryrows
        this.queryRows.forEach(x => {

            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {

                // And as long as the value for this queryrow has NOT been set to '0.00'
                if (x.doubleValue != 0 && x.doubleValue != null) {

                    // Create the query if it has NOT been created already
                    if (queryIndex == -1) {
                        this.queries.push({ queryType: queryType, operator: [], doubleValue: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    // Update the query
                    this.queries[queryIndex].doubleValue.push(x.doubleValue);
                    this.queries[queryIndex].operator.push(x.operatorType);
                }
            }
        });

        // As long as the value for this queryrow has NOT been set to '0.00'
        if (this.doubleValue != 0 && this.doubleValue != null) {
            this.getProducts();
        }
    }

    onDecimalInputBlur(decimalInputText: HTMLInputElement) {
        let intValue = parseInt(decimalInputText.value);

        if (intValue < 10 && decimalInputText.value.length == 1) {
            decimalInputText.value = intValue + "0";
        }
    }


    resetQuery() {
        // Reset the value of the price to null
        this.doubleValue = null;
        // Update the query
        this.updateQuery(this.queryType);
    }


    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
        // Update the query
        this.updateQuery(this.queryType);
    }
}


export class QueryRowItemList extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryRows: Array<IQueryRow>,
        public queries: Array<Query>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryRows, queries, dataService, queryService)
        this.hasOperators = false;
        this.valueType = ValueType.ItemList;
    }
    public stringValue: string;
    public listItems: Array<ListItem> = [];
    private itemList: ItemListComponent;
    public itemType: string;
    public itemTypes: string;



    initialize(queryType: QueryType, queryRowIndex: number, itemType: string, itemTypes: string) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryRowIndex = queryRowIndex;
        this.queryRows[queryRowIndex].itemType = itemType;
        this.queryRows[queryRowIndex].itemTypes = itemTypes;
    }


    listOptions(itemList: ItemListComponent) {
        this.itemList = itemList;

        // Define the item list options
        return {
            // Current Object
            currentObj: this,
            // Menu Options
            menuOptions: () => {
                return [
                    // New
                    new MenuOption('New ' + this.itemType, itemList.addIcon.isDisabled, this.openPopup, null, null),
                    // Delete
                    new MenuOption(!itemList.isMultiSelected ? 'Delete ' + this.itemType : 'Delete ' + this.itemTypes, itemList.deleteIcon.isDisabled, this.onListItemDelete, null, null)
                ]
            },
            // On Add Item
            onAddItem: this.openPopup,
            // On Delete Item
            onDeleteItem: this.onListItemDelete
        }
    }

    updateQuery(queryType: QueryType) {
        let queryIndex: number = this.queries.findIndex(x => x.queryType == queryType);
        if (queryIndex != -1) this.queries.splice(queryIndex, 1);
        queryIndex = -1;

        // Loop through all the queryrows
        this.queryRows.forEach(x => {

            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {

                // And as long as the this queryrow list is NOT empty
                if (x.stringValue.length != 0) {

                    // Create the query if it has NOT been created already
                    if (queryIndex == -1) {
                        this.queries.push({ queryType: queryType, operator: [OperatorType.Equals], stringValue: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    // Update the query
                    this.queries[queryIndex].stringValue = this.queries[queryIndex].stringValue.concat(x.stringValue.split(','));
                }
            }
        });

        this.getProducts();
    }


    onListItemDelete() {
        this.itemList.deleteListItem();
        this.stringValue = this.listItems.map(x => x.name).toString();
        this.updateQuery(this.queryType);
    }


    openPopup(sourceElement: HTMLElement) {
        console.log("open Popup")
    }


    resetQuery() {
        // Reset the value to an empty string
        this.stringValue = "";
        // Update the query
        this.updateQuery(this.queryType);
    }

    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
        // Update the query
        this.updateQuery(this.queryType);
    }
}


export class QueryRowEditableItemList extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryRows: Array<IQueryRow>,
        public queries: Array<Query>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryRows, queries, dataService, queryService)
        this.hasOperators = false;
        this.valueType = ValueType.EditableItemList;
    }
    public stringValue: string;
    public editableListItems: Array<ListItem> = [];
    private editableItemList: EditableItemListComponent;
    public itemType: string;
    public itemTypes: string;


    initialize(queryType: QueryType, queryRowIndex: number, itemType: string, itemTypes: string) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryRowIndex = queryRowIndex;
        this.queryRows[queryRowIndex].itemType = itemType;
        this.queryRows[queryRowIndex].itemTypes = itemTypes;
    }


    editableListOptions(editableItemList: EditableItemListComponent) {
        this.editableItemList = editableItemList;

        // Define the item list options
        return {
            // Current Object
            currentObj: this,
            // Menu Options
            menuOptions: () => {
                return [
                    // New
                    new MenuOption('New ' + this.itemType, editableItemList.addIcon.isDisabled, this.onListItemAdd, null, null),
                    // Edit
                    new MenuOption('Edit ' + this.itemType, editableItemList.editIcon.isDisabled, this.onListItemEdit, null, null),
                    // Delete
                    new MenuOption(!editableItemList.isMultiSelected ? 'Delete ' + this.itemType : 'Delete ' + this.itemTypes, editableItemList.deleteIcon.isDisabled, this.onListItemDelete, null, null)
                ]
            },
            // On Add Item
            onAddItem: this.onListItemAdd,
            // On Add Item
            onEditItem: this.onListItemEdit,
            // On Delete Item
            onDeleteItem: this.onListItemDelete
        }
    }


    updateQuery(queryType: QueryType) {
        let queryIndex: number = this.queries.findIndex(x => x.queryType == queryType);
        if (queryIndex != -1) this.queries.splice(queryIndex, 1);
        queryIndex = -1;

        // Loop through all the queryrows
        this.queryRows.forEach(x => {

            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {

                // And as long as the this queryrow list is NOT empty
                if (x.stringValue.length != 0) {

                    // Create the query if it has NOT been created already
                    if (queryIndex == -1) {
                        this.queries.push({ queryType: queryType, operator: [OperatorType.Equals], stringValue: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    // Update the query
                    this.queries[queryIndex].stringValue = this.queries[queryIndex].stringValue.concat(x.stringValue.split(','));
                }
            }
        });

        this.getProducts();
    }



    onListItemAdd() {
        this.editableItemList.onListItemAdd();
        if (this.editableItemList.listItems[0].name.length > 0) {
            this.stringValue = this.editableListItems.map(x => x.name).toString();
            this.updateQuery(this.queryType);
        }
    }


    onListItemEdit() {
        this.editableItemList.onListItemEdit();
        this.stringValue = this.editableListItems.map(x => x.name).toString();
        this.updateQuery(this.queryType);
    }


    onListItemDelete() {
        this.editableItemList.deleteListItem();
        this.stringValue = this.editableListItems.map(x => x.name).toString();
        this.updateQuery(this.queryType);
    }

    resetQuery() {
        // Reset the value to an empty string
        this.stringValue = "";
        // Update the query
        this.updateQuery(this.queryType);
    }


    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
        // Update the query
        this.updateQuery(this.queryType);
    }
}



export class QueryRowDate extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryRows: Array<IQueryRow>,
        public queries: Array<Query>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryRows, queries, dataService, queryService)
        this.hasOperators = true;
        this.valueType = ValueType.Date;
    }
    public dateValue: Date;


    initialize(queryType: QueryType, queryRowIndex: number) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryRowIndex = queryRowIndex;
    }

    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
        this.updateQuery(QueryType.ProductCreationDate);
    }

    updateValue(inputText: HTMLInputElement) {
        this.dateValue = new Date(inputText.value);
        this.updateQuery(QueryType.ProductCreationDate);
    }



    updateQuery(queryType: QueryType) {
        let queryIndex: number = this.queries.findIndex(x => x.queryType == queryType);
        if (queryIndex != -1) this.queries.splice(queryIndex, 1);
        queryIndex = -1;

        // Loop through all the queryrows
        this.queryRows.forEach(x => {

            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {

                // And as long as the value for this queryrow has NOT been set to null
                if (x.dateValue != null) {

                    // Create the query if it has NOT been created already
                    if (queryIndex == -1) {
                        this.queries.push({ queryType: queryType, operator: [], dateValue: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    // Update the query
                    this.queries[queryIndex].dateValue.push(x.dateValue);
                    this.queries[queryIndex].operator.push(x.operatorType);
                }
            }
        });

        // As long as the value for this queryrow has NOT been set to null
        if (this.dateValue != null) {
            this.getProducts();
        }
    }


    resetQuery() {
        // Reset the value to null
        this.dateValue = null;
        // Update the query
        this.updateQuery(this.queryType);
    }

    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
        // Update the query
        this.updateQuery(this.queryType);
    }
}




// ===================================================( QUERY ROW NONE )===================================================\\
export class QueryRowSub extends QueryRow implements IQueryRow {
    

    constructor(public whereDropdownSelectedIndex: number,
        public queryRows: Array<IQueryRow>,
        public queries: Array<Query>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex,
            queryRows,
            queries,
            dataService,
            queryService)

            this.queryType = 22;
    }







    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new none queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new QueryRowNone(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));
    }
}



// ===================================================( QUERY ROW NONE )===================================================\\
export class QueryRowNone extends QueryRow implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new none queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new QueryRowNone(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));
    }
}


// ===================================================( CATEGORY QUERY ROW )===================================================\\
export class CategoryQueryRow extends QueryRowDropdownParent implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new category queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CategoryQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));

        // Initialize the new category queryrow
        this.initialize(QueryType.Category, QueryType.Niche, queryRowIndex, this.queryService.categories);
    }
}

// ===================================================( NICHE QUERY ROW )===================================================\\
export class NicheQueryRow extends QueryRowDropdownChild implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new niche queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new NicheQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));

        // Initialize the new category queryrow
        this.initialize(QueryType.Category, QueryType.Niche, queryRowIndex, this.queryService.categories);
    }
}


// ===================================================( PRODUCT SUBGROUP QUERY ROW )===================================================\\
export class ProductSubgroupQueryRow extends QueryRowDropdown {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new subgroup queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductSubgroupQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));

        // Initialize the new subgroup queryrow
        this.initialize(QueryType.ProductSubgroup, queryRowIndex, this.queryService.subgroups);
    }
}


// ===================================================( FEATURED PRODUCTS QUERY ROW )===================================================\\
export class FeaturedProductsQueryRow extends QueryRowItemList implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new featured products queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new FeaturedProductsQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));

        // Initialize the new featured products queryrow
        this.initialize(QueryType.FeaturedProducts, queryRowIndex, "Product", "Products")
    }
}


// ===================================================( CUSTOMER RELATED PRODUCTS QUERY ROW )===================================================\\
export class CustomerRelatedProductsQueryRow extends QueryRowDropdown {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new customer related products queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CustomerRelatedProductsQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));

        // Initialize the new customer related products queryrow
        this.initialize(QueryType.CustomerRelatedProducts, queryRowIndex, this.queryService.customerRelatedProducts);
    }
}

// ===================================================( PRODUCT PRICE QUERY ROW )===================================================\\
export class ProductPriceQueryRow extends QueryRowPrice implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new product price queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductPriceQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));

        // Initialize the new product price queryrow
        this.initialize(QueryType.ProductPrice, queryRowIndex)
    }
}


// ===================================================( PRODUCT RATING QUERY ROW )===================================================\\
export class ProductRatingQueryRow extends QueryRowDropdownWithOperator implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new product rating queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductRatingQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));

        // Initialize the new product rating queryrow
        this.initialize(QueryType.ProductRating, queryRowIndex, this.queryService.productRating);
    }
}


// ===================================================( PRODUCT KEYWORDS QUERY ROW )===================================================\\
export class ProductKeywordsQueryRow extends QueryRowEditableItemList implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new keywords queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductKeywordsQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));

        // Initialize the new keywords queryrow
        this.initialize(QueryType.ProductKeywords, queryRowIndex, "Keyword", "Keywords")
    }
}


// ===================================================( PRODUCT CREATION DATE QUERY ROW )===================================================\\
export class ProductCreationDateQueryRow extends QueryRowDate implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Reset the query
        this.queryRows[queryRowIndex].resetQuery();

        // Create the new product creation date queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductCreationDateQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.dataService, this.queryService));

        // Initialize the new product creation date queryrow
        this.initialize(QueryType.ProductCreationDate, queryRowIndex)
    }
}
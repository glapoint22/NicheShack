import { KeyValue } from '@angular/common';
import { QueryList, QueryService } from '../services/query.service';
import { EditableItemListComponent } from '../shared-components/item-lists/editable-item-list/editable-item-list.component';
import { ItemListComponent } from '../shared-components/item-lists/item-list/item-list.component';
import { ListItem } from './list-item';
import { MenuOption } from './menu-option';


export interface Query {
    queryType: QueryType;
    operator: Array<OperatorType>;
    numValue?: Array<number>;
    doubleValue?: Array<number>;
    dateValue?: Array<Date>;
}

export interface IQueryRow {
    queryType: QueryType;
    otherQueryType?: QueryType;
    hasOperators: boolean;
    operatorType: OperatorType;
    valueType: ValueType;
    numValue: number;
    numValue2?: number;
    doubleValue?: number;
    doubleValue2?: number;
    dateValue?: Date;
    dateValue2?: Date;
    whereDropdownSelectedIndex: number;
    dropdownList?: Array<KeyValue<any, any>>;
    dropdownList2?: Array<KeyValue<any, any>>;
    valueDropdownSelectedIndex?: number;
    valueDropdownSelectedIndex2?: number;
    queryRowIndex?: number;
    queryList?: Array<QueryList>;
    itemType?: string;
    itemTypes?: string;
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
    IsBetween
}


export class QueryRowClass {
    constructor(public queryRows: Array<IQueryRow>, public queries: Array<Query>) { }
    public queryType: QueryType;
    public operatorType: OperatorType = OperatorType.Equals;
    public numValue: number;
    public hasOperators: boolean;
    public valueType: ValueType;
    public whereDropdownSelectedIndex: number;


    updateQuery(queryType: QueryType) {
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
                        this.queries.push({ queryType: queryType, operator: [OperatorType.Equals], numValue: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    // Update the query
                    this.queries[queryIndex].numValue.push(x.numValue);
                }
            }
        });
    }


    updateQueriesOLD(oldQueryType: QueryType, newQueryType: QueryType) {
        // If the old querytype of the queryrow that is being updated is NOT null (meaning it has already been assigned)
        if (oldQueryType != null) {
            let count: number = 0;

            // Get a count of how many other queryrows in the list have this old querytype
            this.queryRows.forEach(x => {
                if (x.queryType == oldQueryType) {
                    count++;
                }
            })

            // If there are no more queryrows that has this old querytype
            if (count == 0) {
                // Remove the query from the queries array that has this old querytype
                this.queries.splice(this.queries.findIndex(x => x.queryType == oldQueryType), 1);

                // But if there are still queryrows that has this old querytype
            } else {

                // Just Remove the value in the query that corresponds with the value of the queryrow being updated
                this.setQueriesValue(oldQueryType);
            }
        }

        // Check to see if the queryrow with this updated querytype has a corresponding query
        if (this.queries.findIndex(x => x.queryType == newQueryType) == -1) {
            // If the updated queryrow does NOT have a corresponding query, then create one
            this.queries.push({ queryType: this.queryType, operator: [this.operatorType], numValue: [this.numValue] });
        }

        // Set the value to the query with the value of its corresponding queryrow
        this.setQueriesValue(newQueryType);

        if (this.hasOperators) {
            this.setQueriesOperator(newQueryType);
        }
    }

    setQueriesValue(queryType: QueryType) {
        let valueList: Array<number> = [];

        // Check to see if the queryrow with this querytype has a corresponding query
        if (this.queries.findIndex(x => x.queryType == queryType) == -1) {
            // If the queryrow does NOT have a corresponding query, then create one
            this.queries.push({ queryType: this.queryType, operator: [this.operatorType], numValue: [] });
        }

        let index = this.queries.findIndex(x => x.queryType == queryType);

        // Loop through all the queryrows
        this.queryRows.forEach(x => {
            // If we come across a queryrow queryType where its querytype is the same querytype that's being passed in
            if (x.queryType == queryType) {

                // If the query's corresponding queryrow does NOT have operators
                if (!this.hasOperators) {

                    // Then check to see if the value of that queryrow has NOT yet been added to this temporary value list
                    if (valueList.findIndex(y => y == x.numValue) == -1) {
                        // If not, add the value from that queryrow to this temporary value list
                        valueList.push(x.numValue);
                    }

                    // If the query's corresponding queryrow has operators
                } else {

                    if (x.operatorType == OperatorType.IsBetween) {

                        // valueList.push(x.numValue + "," + x.numValue2);

                    } else {
                        // Then just add the value from that queryrow to this temporary value list
                        valueList.push(x.numValue);
                    }
                }
            }
        });

        // If the value type is a list
        if (this.valueType == ValueType.ItemList || this.valueType == ValueType.EditableItemList) {
            // Convert the value list into one long string
            let valueListJoin = valueList.join();
            // Then turn that string into a single array
            // this.queries[index].numValue = valueListJoin.split(',');

            // If the value type is anything other than a list
        } else {

            // Assign the value list to the query that corresponds with the querytype
            this.queries[index].numValue = valueList;
        }
    }

    setQueriesOperator(queryType: QueryType) {
        let index = this.queries.findIndex(x => x.queryType == queryType);
        let operatorTypeList: Array<OperatorType> = [];

        // Loop through all the queryrows
        this.queryRows.forEach(x => {
            // If we come across a queryrow queryType its querytype is the same querytype that's being passed in
            if (x.queryType == queryType) {
                // Add the operator type from that queryrow to the temporary operatortype list
                operatorTypeList.push(x.operatorType);
            }
        })


        if (index == -1) {
            // If the queryrow does NOT have a corresponding query, then create one
            this.queries.push({ queryType: this.queryType, operator: [this.operatorType], numValue: [] });

            index = this.queries.findIndex(x => x.queryType == queryType);
        }

        // Update the operator of the query with the temporary operatortype list
        this.queries[index].operator = operatorTypeList;

        // Update the value of the query (Needed if two values need to be displayed when selecting the operator type 'isBetween' )
        this.setQueriesValue(queryType)
    }
}

























export class QueryRow {
    constructor(public whereDropdownSelectedIndex: number, public queryRows: Array<IQueryRow>, public queries: Array<Query>) { }
    public queryType: QueryType;
    public operatorType: OperatorType = OperatorType.Equals;
    public numValue: number;
    public hasOperators: boolean;
    public valueType: ValueType;
}




export class QueryRowDropdownBase extends QueryRow {
    constructor(public whereDropdownSelectedIndex: number, public queryRows: Array<IQueryRow>, public queries: Array<Query>, public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryRows, queries);
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
                    usedDropdownOptions.push(x.numValue);
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
            if (usedDropdownOptions.indexOf(y.id) == -1 || y.id == queryRow.numValue) {

                // Add it to the dropdown list of this quryrow
                queryRow.dropdownList.push({
                    key: y.name,
                    value: y.id
                })
            }
        })
        // Now that the dropdown list has been created, set the option that will be selected
        queryRow.valueDropdownSelectedIndex = queryRow.dropdownList.findIndex(y => y.value == queryRow.numValue);
    }

    updateQuery(queryType: QueryType) {
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
                        this.queries.push({ queryType: queryType, operator: [OperatorType.Equals], numValue: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    // Update the query
                    this.queries[queryIndex].numValue.push(x.numValue);
                }
            }
        });
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
        this.numValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.numValue);

        // Rebuild all the dropdowns
        let usedDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryType);
        this.queryRows.forEach(x => {
            if (x.queryType == this.queryType) {
                this.buildDropdown(x, usedDropdownOptions, this.queryList);
            }
        });

        // Update the query
        this.updateQuery(this.queryType)
    }
}



export class QueryRowDropdownParentChild extends QueryRowDropdownBase {
    public otherQueryType: QueryType;

    updateUsedParentIds(parentQueryType: QueryType, usedParentIds: Array<number>, parentQueryRow: IQueryRow, parentList: Array<QueryList>) {
        // If we come across a queryrow where its type is parent
        if (parentQueryRow.queryType == parentQueryType) {

            // As long as the value of the parent queryrow is NOT null
            if (parentQueryRow.numValue != null) {

                // Get the index of the parent from the parent list that corresponds with the 
                // value of the current parent queryrow and add that index to the used parent ids list
                usedParentIds.push(parentList.findIndex(y => y.id == parentQueryRow.numValue));
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
                    if (usedChildDropdownOptions.indexOf(z.id) == -1 || z.id == childQueryRow.numValue) {

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
                    if (usedChildDropdownOptions.indexOf(z.id) == -1 || z.id == childQueryRow.numValue) {

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
        let valueDropdownSelectedIndex = childQueryRow.dropdownList.findIndex(y => y.value == childQueryRow.numValue);

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
                        this.queries.push({ queryType: childQueryType, operator: [OperatorType.Equals], numValue: [] });
                        childQueryIndex = this.queries.length - 1;
                    }

                    // Add the current child to the child query
                    this.queries[childQueryIndex].numValue.push(x.dropdownList[x.valueDropdownSelectedIndex].value);

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
                        if (this.queryRows.indexOf(x) > this.queryRows.findIndex(y => y.numValue == parentId)) {
                            // Get the index of the id in the parent query that matches the id of the parent
                            let parentIdIndex = this.queries[parentQueryIndex].numValue.indexOf(parentId);

                            // If the id in the parent query exists
                            if (parentIdIndex != -1) {
                                // Remove that id from parent query
                                this.queries[parentQueryIndex].numValue.splice(parentIdIndex, 1);
                            }

                            // If all parents are removed from the parent query
                            if (this.queries[parentQueryIndex].numValue.length == 0) {
                                // Then remove the parent query
                                this.queries.splice(parentQueryIndex, 1);
                            }
                        }
                    }
                }
            }
        });
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
        this.numValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.numValue);


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
        this.updateQuery(this.queryType);
        // Update the child query
        this.updateChildQuery(this.queryType, this.otherQueryType, this.queryList);
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
        this.numValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.numValue);


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
        this.updateQuery(this.otherQueryType);
        // Update the child query
        this.updateChildQuery(this.otherQueryType, this.queryType, this.queryList);
    }
}


export class QueryRowDropdownWithOperator extends QueryRowDropdownBase {
    constructor(whereDropdownSelectedIndex: number, queryRows: Array<IQueryRow>, queries: Array<Query>, queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryRows, queries, queryService)
        this.hasOperators = true;
    }
    public valueDropdownSelectedIndex2: number = 0;
    public dropdownList2: Array<KeyValue<any, any>>;
    public numValue2: number;
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
                    usedDropdownOptions.push(x.numValue);
                }

                // If a range operator has been selected
                if (x.operatorType == OperatorType.IsBetween) {

                    // And as long as that value dropdown has NOT been set to 'none'
                    if (x.valueDropdownSelectedIndex2 != 0) {
                        // Add the selected value of that value dropdown to the used list
                        usedDropdownOptions.push(x.numValue2);
                    }
                }
            }
        });
        return usedDropdownOptions;
    }


    buildDropdown(queryRow: IQueryRow, usedDropdownOptions: Array<number>, queryList: Array<QueryList>) {
        // Build the value dropdown
        super.buildDropdown(queryRow, usedDropdownOptions, queryList);

        // If a range operator has been selected
        if (queryRow.operatorType == OperatorType.IsBetween) {

            // Create the first option in the dropdown list
            queryRow.dropdownList2 = [{ key: "None", value: null }];

            // Loop through all the items of the query list
            queryList.forEach(y => {

                // If we come across an item in the list that is NOT a dropdown option that has been used yet
                // or the item happens to be the same as the selected option of this quryrow
                if ((usedDropdownOptions.indexOf(y.id) == -1 || y.id == queryRow.numValue2) && y.id > queryRow.numValue) {

                    // Add it to the dropdown list of this quryrow
                    queryRow.dropdownList2.push({
                        key: y.name,
                        value: y.id
                    })
                }
            })
            // Get the index of the option in the dropdown list where the option's value matches the current queryrow value
            let valueDropdownSelectedIndex2 = queryRow.dropdownList2.findIndex(y => y.value == queryRow.numValue2);

            // If an option value in the dropdown list does NOT match the current queryrow value, then assign the selected
            // index as zero (None). But if a match is found, assign the selected index the index of that dropdown option
            queryRow.valueDropdownSelectedIndex2 = valueDropdownSelectedIndex2 == -1 ? 0 : valueDropdownSelectedIndex2;
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

                // And as long as the value dropdown for this queryrow has NOT been set to 'none'
                if (x.valueDropdownSelectedIndex != 0) {

                    // If the range operator has NOT been selected
                    if (x.operatorType != OperatorType.IsBetween) {

                        // Create the query if it has NOT been created already
                        if (queryIndex == -1) {
                            this.queries.push({ queryType: queryType, operator: [], numValue: [] });
                            queryIndex = this.queries.length - 1;
                        }

                        // Update the query
                        this.queries[queryIndex].numValue.push(x.numValue);
                        this.queries[queryIndex].operator.push(x.operatorType);

                        // If any operator other than the range operator has been selected
                    } else {

                        // And as long as the 2nd value dropdown for this queryrow has NOT been set to 'none'
                        if (x.valueDropdownSelectedIndex2 != 0) {

                            // Create the query if it has NOT been created already
                            if (queryIndex == -1) {
                                this.queries.push({ queryType: queryType, operator: [], numValue: [] });
                                queryIndex = this.queries.length - 1;
                            }

                            // Update the query
                            this.queries[queryIndex].operator.push(x.operatorType);
                            this.queries[queryIndex].numValue.push(x.numValue);
                            this.queries[queryIndex].numValue.push(x.numValue2);
                            // this.queries[queryIndex].numValue.push(x.numValue + "," + x.numValue2);
                        }
                    }
                }
            }
        });
    }



    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
        this.updateQuery(this.queryType);

        // If a range operator has been selected
        if (this.operatorType == OperatorType.IsBetween) {

            // Build the options for the 2nd dropdown in the range
            let usedDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryType);
            this.buildDropdown(this.queryRows[this.queryRowIndex], usedDropdownOptions, this.queryList);
        }
    }


    updateValue(newValue: number) {
        // Update the value and the selected index
        this.numValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.numValue);

        // Rebuild all the dropdowns
        let usedDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryType);
        this.queryRows.forEach(x => {
            if (x.queryType == this.queryType) {
                this.buildDropdown(x, usedDropdownOptions, this.queryList);
            }
        });


        // Rebuild all the dropdowns again if a second value dropdown has been set to 'none' from not having a high enough option available
        if (this.numValue2 != null && this.valueDropdownSelectedIndex2 == 0) {
            let usedDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryType);
            this.queryRows.forEach(x => {
                if (x.queryType == this.queryType) {
                    this.buildDropdown(x, usedDropdownOptions, this.queryList);
                }
            });
        }

        // Update the query
        this.updateQuery(this.queryType);
    }

    updateValue2(newValue2: number) {
        // Update the value and the selected index
        this.numValue2 = newValue2 != null ? newValue2 : null;
        this.valueDropdownSelectedIndex2 = this.dropdownList.findIndex(x => x.value == this.numValue2);

        // Rebuild all the dropdowns
        let usedDropdownOptions: Array<number> = this.getUsedDropdownOptions(this.queryType);
        this.queryRows.forEach(x => {
            if (x.queryType == this.queryType) {
                this.buildDropdown(x, usedDropdownOptions, this.queryList);
            }
        });

        // Update the query
        this.updateQuery(this.queryType);
    }
}



export class QueryRowPrice extends QueryRow {
    constructor(whereDropdownSelectedIndex: number, queryRows: Array<IQueryRow>, queries: Array<Query>) {
        super(whereDropdownSelectedIndex, queryRows, queries)
        this.hasOperators = true;
        this.valueType = ValueType.Price;
    }
    public doubleValue: number;
    public doubleValue2: number;


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

        // Get the whole number value from the 1st input text
        if (wholeNumberInputText.id == "wholeNumber1") {
            this.doubleValue = this.getPrice(wholeNumberInputText, decimalInputText);
            // If the range operator has been selected, get the whole number value from the 2nd input text
        } else {
            this.doubleValue2 = this.getPrice(wholeNumberInputText, decimalInputText);
        }
        // Update the query
        this.updateQuery(this.queryType);
    }

    updateDecimalValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(decimalInputText.value) ? decimalInputText.value = decimalInputText.value.replace(/[^0123456789]/ig, '') : null;

        // Get the decimal value from the 1st input text
        if (decimalInputText.id == "decimal1") {
            this.doubleValue = this.getPrice(wholeNumberInputText, decimalInputText);
            // If the range operator has been selected, get the decimal value from the 2nd input text
        } else {
            this.doubleValue2 = this.getPrice(wholeNumberInputText, decimalInputText);
        }
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

                    // If the range operator has NOT been selected
                    if (x.operatorType != OperatorType.IsBetween) {

                        // Create the query if it has NOT been created already
                        if (queryIndex == -1) {
                            this.queries.push({ queryType: queryType, operator: [], doubleValue: [] });
                            queryIndex = this.queries.length - 1;
                        }

                        // Update the query
                        this.queries[queryIndex].doubleValue.push(x.doubleValue);
                        this.queries[queryIndex].operator.push(x.operatorType);

                        // If the range operator has been selected
                    } else {

                        // And as long as the 2nd value for this queryrow has NOT been set to '0.00'
                        if (x.doubleValue2 != 0 && x.doubleValue2 != null) {

                            // Create the query if it has NOT been created already
                            if (queryIndex == -1) {
                                this.queries.push({ queryType: queryType, operator: [], doubleValue: [] });
                                queryIndex = this.queries.length - 1;
                            }

                            // Update the query
                            this.queries[queryIndex].operator.push(x.operatorType);
                            this.queries[queryIndex].doubleValue.push(x.doubleValue);
                            this.queries[queryIndex].doubleValue.push(x.doubleValue2);
                        }
                    }
                }
            }
        });
    }

    onDecimalInputBlur(decimalInputText: HTMLInputElement) {
        let intValue = parseInt(decimalInputText.value);

        if (intValue < 10 && decimalInputText.value.length == 1) {
            decimalInputText.value = intValue + "0";
        }
    }
}



export class QueryRowDate extends QueryRow {
    constructor(whereDropdownSelectedIndex: number, queryRows: Array<IQueryRow>, queries: Array<Query>) {
        super(whereDropdownSelectedIndex, queryRows, queries)
        this.hasOperators = true;
        this.valueType = ValueType.Date;
    }
    public dateValue: Date;
    public dateValue2: Date;


    initialize(queryType: QueryType, queryRowIndex: number) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryRowIndex = queryRowIndex;
    }

    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
        this.updateQuery(QueryType.ProductCreationDate);
    }

    updateValue(inputText: HTMLInputElement) {
        this.dateValue = new Date(inputText.value.replace(/[-]/ig, '/'));
        this.updateQuery(QueryType.ProductCreationDate);
    }

    updateValue2(inputText2: HTMLInputElement) {
        this.dateValue2 = new Date(inputText2.value.replace(/[-]/ig, '/'));
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

                    // If the range operator has NOT been selected
                    if (x.operatorType != OperatorType.IsBetween) {

                        // Create the query if it has NOT been created already
                        if (queryIndex == -1) {
                            this.queries.push({ queryType: queryType, operator: [], dateValue: [] });
                            queryIndex = this.queries.length - 1;
                        }

                        // Update the query
                        this.queries[queryIndex].dateValue.push(x.dateValue);
                        this.queries[queryIndex].operator.push(x.operatorType);

                        // If the range operator has been selected
                    } else {

                        // And as long as the 2nd value for this queryrow has NOT been set to null
                        if (x.dateValue2 != null) {

                            // Create the query if it has NOT been created already
                            if (queryIndex == -1) {
                                this.queries.push({ queryType: queryType, operator: [], dateValue: [] });
                                queryIndex = this.queries.length - 1;
                            }

                            // Update the query
                            this.queries[queryIndex].operator.push(x.operatorType);
                            this.queries[queryIndex].dateValue.push(x.dateValue);
                            this.queries[queryIndex].dateValue.push(x.dateValue2);
                        }
                    }
                }
            }
        });
    }
}





// ===================================================( QUERY ROW NONE )===================================================\\
export class QueryRowNone implements IQueryRow {

    constructor(private queryRows: Array<IQueryRow>, private queries: Array<Query>) { }
    queryType = null;
    hasOperators = null;
    operatorType = null;
    valueType = null;
    numValue = null;
    whereDropdownSelectedIndex = 0;

    newQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new QueryRowNone(this.queryRows, this.queries));
    }
}



// ===================================================( CATEGORY QUERY ROW )===================================================\\
export class CategoryQueryRow extends QueryRowDropdownParent implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new category queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CategoryQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.queryService));

        // Initialize the new category queryrow
        this.initialize(QueryType.Category, QueryType.Niche, queryRowIndex, this.queryService.categories);
    }
}



// ===================================================( NICHE QUERY ROW )===================================================\\
export class NicheQueryRow extends QueryRowDropdownChild implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new niche queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new NicheQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.queryService));

        // Initialize the new category queryrow
        this.initialize(QueryType.Category, QueryType.Niche, queryRowIndex, this.queryService.categories);
    }
}


// ===================================================( PRODUCT SUBGROUP QUERY ROW )===================================================\\
export class ProductSubgroupQueryRow extends QueryRowDropdown {
    newQueryRow(queryRowIndex: number) {
        // Create the new subgroup queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductSubgroupQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.queryService));

        // Initialize the new subgroup queryrow
        this.initialize(QueryType.ProductSubgroup, queryRowIndex, this.queryService.subgroups);
    }
}


// ===================================================( FEATURED PRODUCTS QUERY ROW )===================================================\\
export class FeaturedProductsQueryRow extends QueryRowClass implements IQueryRow {
    constructor(queryRows: Array<IQueryRow>, queries: Array<Query>) {
        super(queryRows, queries);
        this.queryType = QueryType.FeaturedProducts;
        this.numValue = null;
        this.hasOperators = false;
        this.valueType = ValueType.ItemList;
        this.whereDropdownSelectedIndex = 4;
    }
    public listItems: Array<ListItem> = [];
    private itemList: ItemListComponent;


    newQueryRow(queryRowIndex: number) {
        let oldQueryType = this.queryRows[queryRowIndex].queryType;

        // Update the query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new FeaturedProductsQueryRow(this.queryRows, this.queries));

        // Then update the queries
        this.updateQueriesOLD(oldQueryType, QueryType.FeaturedProducts);
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
                    // New Product
                    new MenuOption('New Product', itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
                    // Delete Product
                    new MenuOption(!itemList.isMultiSelected ? 'Delete Product' : 'Delete Products', itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
                ]
            },
            // On Add Item
            onAddItem: this.openPopup,
            // On Delete Item
            onDeleteItem: this.onListItemDelete
        }
    }


    onListItemAdd() {
        this.itemList.onListItemAdd();
        if (this.itemList.listItems[0].name.length > 0) {
            // this.numValue = this.listItems.map(x => x.name).toString();
            this.setQueriesValue(QueryType.FeaturedProducts);
        }
    }


    onListItemDelete() {
        this.itemList.deleteListItem();
        // this.numValue = this.listItems.map(x => x.name).toString();
        this.setQueriesValue(QueryType.FeaturedProducts);
    }


    openPopup(sourceElement: HTMLElement) {
        console.log("open Popup")
    }
}


// ===================================================( CUSTOMER RELATED PRODUCTS QUERY ROW )===================================================\\
export class CustomerRelatedProductsQueryRow extends QueryRowDropdown {
    newQueryRow(queryRowIndex: number) {
        // Create the new customer related products queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CustomerRelatedProductsQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.queryService));

        // Initialize the new customer related products queryrow
        this.initialize(QueryType.CustomerRelatedProducts, queryRowIndex, this.queryService.customerRelatedProducts);
    }
}

// ===================================================( PRODUCT PRICE QUERY ROW )===================================================\\
export class ProductPriceQueryRow extends QueryRowPrice implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new product price queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductPriceQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries));

        this.initialize(QueryType.ProductPrice, queryRowIndex)
    }
}



// ===================================================( PRODUCT RATING QUERY ROW )===================================================\\
export class ProductRatingQueryRow extends QueryRowDropdownWithOperator implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new product rating queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductRatingQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries, this.queryService));

        // Initialize the new product rating queryrow
        this.initialize(QueryType.ProductRating, queryRowIndex, this.queryService.productRating);
    }
}











export class QueryRowEditableItemList extends QueryRow {
    constructor(whereDropdownSelectedIndex: number, queryRows: Array<IQueryRow>, queries: Array<Query>) {
        super(whereDropdownSelectedIndex, queryRows, queries)
        this.hasOperators = true;
        this.valueType = ValueType.EditableItemList;
    }
    public stringValue: string;
    public editableListItems: Array<ListItem> = [];
    private editableItemList: EditableItemListComponent;
    public itemType: string;
    public itemTypes: string;


    initialize(queryType: QueryType, queryRowIndex: number, itemType: string, itemTypes) {
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
                    new MenuOption('New ' + this.itemType, editableItemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
                    // Edit
                    new MenuOption('Edit ' + this.itemType, editableItemList.editIcon.isDisabled, this.onListItemEdit, null, 'Ctrl+Alt+E'),
                    // Delete
                    new MenuOption(!editableItemList.isMultiSelected ? 'Delete ' + this.itemType : 'Delete ' + this.itemTypes, editableItemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
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

    onListItemAdd() {
        this.editableItemList.onListItemAdd();
        if (this.editableItemList.listItems[0].name.length > 0) {
            this.stringValue = this.editableListItems.map(x => x.name).toString();
            // this.setQueriesValue(QueryType.ProductKeywords);
        }
    }


    onListItemEdit() {
        this.editableItemList.onListItemEdit();
        // this.numValue = this.editableListItems.map(x => x.name).toString();
        // this.setQueriesValue(QueryType.ProductKeywords);
    }


    onListItemDelete() {
        this.editableItemList.deleteListItem();
        // this.numValue = this.editableListItems.map(x => x.name).toString();
        // this.setQueriesValue(QueryType.ProductKeywords);
    }
}












// ===================================================( PRODUCT KEYWORDS QUERY ROW )===================================================\\
export class ProductKeywordsQueryRow extends QueryRowEditableItemList implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new keywords queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductKeywordsQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries));

        this.initialize(QueryType.ProductKeywords, queryRowIndex, "Keyword", "Keywords")
    }





    // constructor(queryRows: Array<IQueryRow>, queries: Array<Query>) {
    //     super(queryRows, queries);
    //     this.queryType = QueryType.ProductKeywords;
    //     this.numValue = null;
    //     this.hasOperators = false;
    //     this.valueType = ValueType.EditableItemList;
    //     this.whereDropdownSelectedIndex = 8;
    // }
    // public editableListItems: Array<ListItem> = [];
    // private editableItemList: EditableItemListComponent;

    // newQueryRow(queryRowIndex: number) {
    //     let oldQueryType = this.queryRows[queryRowIndex].queryType;

    //     // Update the query row
    //     this.queryRows.splice(queryRowIndex, 1);
    //     this.queryRows.splice(queryRowIndex, 0, new ProductKeywordsQueryRow(this.queryRows, this.queries));

    //     // Then update the queries
    //     this.updateQueriesOLD(oldQueryType, QueryType.ProductKeywords);
    // }

    // editableListOptions(editableItemList: EditableItemListComponent) {
    //     this.editableItemList = editableItemList;

    //     // Define the item list options
    //     return {
    //         // Current Object
    //         currentObj: this,
    //         // Menu Options
    //         menuOptions: () => {
    //             return [
    //                 // New Keyword
    //                 new MenuOption('New Keyword', editableItemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
    //                 // Edit Keyword
    //                 new MenuOption('Edit Keyword', editableItemList.editIcon.isDisabled, this.onListItemEdit, null, 'Ctrl+Alt+E'),
    //                 // Delete Keyword
    //                 new MenuOption(!editableItemList.isMultiSelected ? 'Delete Keyword' : 'Delete Keywords', editableItemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
    //             ]
    //         },
    //         // On Add Item
    //         onAddItem: this.onListItemAdd,
    //         // On Add Item
    //         onEditItem: this.onListItemEdit,
    //         // On Delete Item
    //         onDeleteItem: this.onListItemDelete
    //     }
    // }

    // onListItemAdd() {
    //     this.editableItemList.onListItemAdd();
    //     if (this.editableItemList.listItems[0].name.length > 0) {
    //         // this.numValue = this.editableListItems.map(x => x.name).toString();
    //         this.setQueriesValue(QueryType.ProductKeywords);
    //     }
    // }


    // onListItemEdit() {
    //     this.editableItemList.onListItemEdit();
    //     // this.numValue = this.editableListItems.map(x => x.name).toString();
    //     this.setQueriesValue(QueryType.ProductKeywords);
    // }


    // onListItemDelete() {
    //     this.editableItemList.deleteListItem();
    //     // this.numValue = this.editableListItems.map(x => x.name).toString();
    //     this.setQueriesValue(QueryType.ProductKeywords);
    // }
}


// ===================================================( PRODUCT CREATION DATE QUERY ROW )===================================================\\
export class ProductCreationDateQueryRow extends QueryRowDate implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new product creation date queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductCreationDateQueryRow(this.whereDropdownSelectedIndex, this.queryRows, this.queries));

        this.initialize(QueryType.ProductCreationDate, queryRowIndex)
    }
}
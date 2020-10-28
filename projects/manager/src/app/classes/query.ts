import { KeyValue } from '@angular/common';
import { stringify } from 'querystring';
import { DataService } from 'services/data.service';
import { QueryList, QueryService } from '../services/query.service';
import { EditableItemListComponent } from '../shared-components/item-lists/editable-item-list/editable-item-list.component';
import { ItemListComponent } from '../shared-components/item-lists/item-list/item-list.component';
import { Category } from './category';
import { ListItem } from './list-item';
import { MenuOption } from './menu-option';


export class QueryRowClass {
    constructor(public queryRows: Array<QueryRow>, public queries: Array<Query>) { }
    public queryType: QueryType;
    public operatorType: OperatorType = OperatorType.Equals;
    public value: string;
    public hasOperators: boolean;
    public valueType: ValueType;
    public whereDropdownSelectedIndex: number;








    getUsedDropdownOptions(queryType: QueryType) {
        let usedDropdownOptions = [];

        // Loop through all the queryrows
        this.queryRows.forEach(x => {
            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {

                // And as long as that queryrow has NOT been set to 'none'
                if (x.valueDropdownSelectedIndex != 0) {
                    // Add the value of that queryrow to the used list
                    usedDropdownOptions.push(parseInt(x.value));
                }
            }
        });
        return usedDropdownOptions;
    }



    buildDropdown(queryRow: QueryRow, usedDropdownOptions: Array<number>, queryList: Array<QueryList>) {
        // Create the first option in the dropdown list
        queryRow.dropdownList = [{ key: "None", value: null }];

        // Loop through all the items of the query list
        queryList.forEach(y => {

            // If we come across an item in the list that is NOT a dropdown option that has been used yet
            // or the item happens to be the same as the selected option of this quryrow
            if (usedDropdownOptions.indexOf(y.id) == -1 || y.id == parseInt(queryRow.value)) {

                // Add it to the dropdown list of this quryrow
                queryRow.dropdownList.push({
                    key: y.name,
                    value: y.id
                })
            }
        })
        // Now that the dropdown list has been created, set the option that will be selected
        queryRow.valueDropdownSelectedIndex = queryRow.dropdownList.findIndex(y => y.value == queryRow.value);
    }









    updateUsedCategoriesList(usedCategories: Array<number>, categoryQueryRow: QueryRow, databaseCategories: Array<QueryList>) {

        // If we come across a queryrow where its type is category
        if (categoryQueryRow.queryType == QueryType.Category) {

            // As long as the value of the category queryrow is NOT null
            if (categoryQueryRow.value != null) {

                // Get the index of the category from the database categories that corresponds with the 
                // value of the current category queryrow and add that index to the used categories list
                usedCategories.push(databaseCategories.findIndex(y => y.id == parseInt(categoryQueryRow.value)));
            }
        }
    }





    buildNicheDropdown(nicheQueryRow: QueryRow, usedNicheDropdownOptions: Array<number>, usedCategories: Array<number>, databaseCategories: Array<QueryList>) {
        // Create the first option in the niche dropdown list
        nicheQueryRow.dropdownList = [{ key: "None", value: null }];

        // If NO category is available yet to build the niche dropdown list
        if (usedCategories.length == 0) {

            // Loop through all the categories of the categories array
            databaseCategories.forEach(y => {

                // Then loop through each niche of that current category
                y.niches.forEach(z => {

                    // And if we come across a niche that has NOT been used yet or is the selected niche in the dropdown of the current niche quryrow
                    if (usedNicheDropdownOptions.indexOf(z.id) == -1 || z.id == parseInt(nicheQueryRow.value)) {

                        // Add it to the dropdown list of the current niche quryrow
                        nicheQueryRow.dropdownList.push({
                            key: z.name,
                            value: z.id
                        })
                    }
                })
            });

            // If a category is available to build the niche dropdown list 
        } else {

            // Loop through all the categories that have been used so far
            usedCategories.forEach(y => {

                // Then loop through each niche of that category
                databaseCategories[y].niches.forEach(z => {

                    // And if we come across a niche that has NOT been used yet or is the selected niche in the dropdown of the current niche quryrow
                    if (usedNicheDropdownOptions.indexOf(z.id) == -1 || z.id == parseInt(nicheQueryRow.value)) {

                        // Add it to the dropdown list of the current niche quryrow
                        nicheQueryRow.dropdownList.push({
                            key: z.name,
                            value: z.id
                        })
                    }
                });
            })
        }

        // Get the index of the option in the dropdown list where the option's value matches the current niche queryrow value
        let valueDropdownSelectedIndex = nicheQueryRow.dropdownList.findIndex(y => y.value == nicheQueryRow.value);

        // If an option value in the dropdown list does NOT match the current niche queryrow value, then assign the selected
        // index as zero (None). But if a match is found, assign the selected index the index of that dropdown option
        nicheQueryRow.valueDropdownSelectedIndex = valueDropdownSelectedIndex == -1 ? 0 : valueDropdownSelectedIndex;
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
                        this.queries.push({ queryType: queryType, operator: [OperatorType.Equals], value: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    // Update the query
                    this.queries[queryIndex].value.push(x.value);
                }
            }
        });
    }





    updateNicheQuery(databaseCategories: Array<QueryList>) {
        let categoryQueryIndex: number;
        let categoryId: number;
        let nicheQueryIndex: number = this.queries.findIndex(x => x.queryType == QueryType.Niche);
        if (nicheQueryIndex != -1) this.queries.splice(nicheQueryIndex, 1);

        // Loop through all the queryrows
        this.queryRows.forEach(x => {

            // If we come across a queryrow where its type is niche
            if (x.queryType == QueryType.Niche) {

                categoryQueryIndex = this.queries.findIndex(x => x.queryType == QueryType.Category);
                nicheQueryIndex = this.queries.findIndex(x => x.queryType == QueryType.Niche);

                // As long as the current niche has NOT been set to 'none'
                if (x.valueDropdownSelectedIndex != 0) {

                    // Create the niche query if it has NOT been created already
                    if (nicheQueryIndex == -1) {
                        this.queries.push({ queryType: QueryType.Niche, operator: [OperatorType.Equals], value: [] });
                        nicheQueryIndex = this.queries.length - 1;
                    }

                    // Add the current niche to the niche query
                    this.queries[nicheQueryIndex].value.push(x.dropdownList[x.valueDropdownSelectedIndex].value.toString());

                    // If a category query exists
                    if (categoryQueryIndex != -1) {

                        // Loop through all the categories of the category array
                        for (let i = 0; i < databaseCategories.length; i++) {
                            // Loop through each niche of the curret category
                            for (let j = 0; j < databaseCategories[i].niches.length; j++) {
                                // If we come across a niche where its id matches the current niche
                                if (databaseCategories[i].niches[j].id == x.dropdownList[x.valueDropdownSelectedIndex].value) {
                                    // Look to the category where that niche resides and record the id of that category
                                    categoryId = databaseCategories[i].id;
                                    break;
                                }
                            }
                        }

                        // As long as the current niche queryrow resides after the category queryrow it belongs to
                        if (this.queryRows.indexOf(x) > this.queryRows.findIndex(y => y.value == categoryId.toString())) {
                            // Get the index of the id in the category query that matches the id of the category
                            let categoryIdIndex = this.queries[categoryQueryIndex].value.indexOf(categoryId.toString());

                            // If the id in the category query exists
                            if (categoryIdIndex != -1) {
                                // Remove that id from category query
                                this.queries[categoryQueryIndex].value.splice(categoryIdIndex, 1);
                            }

                            // If all categories are removed from the category query
                            if (this.queries[categoryQueryIndex].value.length == 0) {
                                // Then remove the category query
                                this.queries.splice(categoryQueryIndex, 1);
                            }
                        }
                    }
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
            this.queries.push({ queryType: this.queryType, operator: [this.operatorType], value: [this.value] });
        }

        // Set the value to the query with the value of its corresponding queryrow
        this.setQueriesValue(newQueryType);

        if (this.hasOperators) {
            this.setQueriesOperator(newQueryType);
        }
    }

    setQueriesValue(queryType: QueryType) {
        let valueList: Array<string> = [];

        // Check to see if the queryrow with this querytype has a corresponding query
        if (this.queries.findIndex(x => x.queryType == queryType) == -1) {
            // If the queryrow does NOT have a corresponding query, then create one
            this.queries.push({ queryType: this.queryType, operator: [this.operatorType], value: [] });
        }

        let index = this.queries.findIndex(x => x.queryType == queryType);

        // Loop through all the queryrows
        this.queryRows.forEach(x => {
            // If we come across a queryrow queryType where its querytype is the same querytype that's being passed in
            if (x.queryType == queryType) {

                // If the query's corresponding queryrow does NOT have operators
                if (!this.hasOperators) {

                    // Then check to see if the value of that queryrow has NOT yet been added to this temporary value list
                    if (valueList.findIndex(y => y == x.value) == -1) {
                        // If not, add the value from that queryrow to this temporary value list
                        valueList.push(x.value);
                    }

                    // If the query's corresponding queryrow has operators
                } else {

                    if (x.operatorType == OperatorType.IsBetween) {

                        valueList.push(x.value + "," + x.value2);

                    } else {
                        // Then just add the value from that queryrow to this temporary value list
                        valueList.push(x.value);
                    }
                }
            }
        });

        // If the value type is a list
        if (this.valueType == ValueType.ItemList || this.valueType == ValueType.EditableItemList) {
            // Convert the value list into one long string
            let valueListJoin = valueList.join();
            // Then turn that string into a single array
            this.queries[index].value = valueListJoin.split(',');

            // If the value type is anything other than a list
        } else {

            // Assign the value list to the query that corresponds with the querytype
            this.queries[index].value = valueList;
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
            this.queries.push({ queryType: this.queryType, operator: [this.operatorType], value: [] });

            index = this.queries.findIndex(x => x.queryType == queryType);
        }

        // Update the operator of the query with the temporary operatortype list
        this.queries[index].operator = operatorTypeList;

        // Update the value of the query (Needed if two values need to be displayed when selecting the operator type 'isBetween' )
        this.setQueriesValue(queryType)
    }
}


export interface QueryRow {
    queryType: QueryType;
    hasOperators: boolean;
    operatorType: OperatorType;
    valueType: ValueType;
    value: string;
    value2?: string;
    whereDropdownSelectedIndex: number;
    dropdownList?: Array<KeyValue<any, any>>;
    dropdownList2?: Array<KeyValue<any, any>>;
    valueDropdownSelectedIndex?: number;
    valueDropdownSelectedIndex2?: number;
    queryRowIndex?: number;
}

export interface Query {
    queryType: QueryType;
    operator: Array<OperatorType>;
    value: Array<string>;
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



// ===================================================( QUERY ROW NONE )===================================================\\
export class QueryRowNone implements QueryRow {

    constructor(private queryRows: Array<QueryRow>, private queries: Array<Query>) { }
    queryType = null;
    hasOperators = null;
    operatorType = null;
    valueType = null;
    value = null;
    whereDropdownSelectedIndex = 0;

    newQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new QueryRowNone(this.queryRows, this.queries));
    }
}


// ===================================================( CATEGORY QUERY ROW )===================================================\\
export class CategoryQueryRow extends QueryRowClass implements QueryRow {
    constructor(
        queryRows: Array<QueryRow>,
        queries: Array<Query>,
        private queryService: QueryService) {
        super(queryRows, queries);
        this.queryType = QueryType.Category;
        this.hasOperators = false;
        this.valueType = ValueType.Dropdown;
        this.whereDropdownSelectedIndex = 1;
    }
    public valueDropdownSelectedIndex: number = 0;
    public dropdownList: Array<KeyValue<any, any>>;

    newQueryRow(queryRowIndex: number) {
        // Create the new category queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CategoryQueryRow(this.queryRows, this.queries, this.queryService));

        // Build the dropdown for this new category queryrow
        let usedCategoryDropdownOptions: Array<number> = this.getUsedDropdownOptions(QueryType.Category);
        this.buildDropdown(this.queryRows[queryRowIndex], usedCategoryDropdownOptions, this.queryService.categories);
    }


    updateValue(newValue: number) {
        // Update the value and the selected index
        this.value = newValue != null ? newValue.toString() : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.value);


        // Rebuild all the category queryrow dropdowns
        let usedCategoryDropdownOptions: Array<number> = this.getUsedDropdownOptions(QueryType.Category);
        this.queryRows.forEach(x => {
            if (x.queryType == QueryType.Category) {
                this.buildDropdown(x, usedCategoryDropdownOptions, this.queryService.categories);
            }
        });


        // Rebuild all the niche queryrow dropdowns
        let usedCategories: Array<number> = [];
        let usedNicheDropdownOptions: Array<number> = this.getUsedDropdownOptions(QueryType.Niche);
        this.queryRows.forEach(x => {
            // Update the list of categories that have been used so far
            this.updateUsedCategoriesList(usedCategories, x, this.queryService.categories);

            if (x.queryType == QueryType.Niche) {
                // And as long as the current niche queryrow resides after the category queryrow that was selected
                if (this.queryRows.indexOf(x) > this.queryRows.indexOf(this)) {
                    this.buildNicheDropdown(x, usedNicheDropdownOptions, usedCategories, this.queryService.categories);
                }
            }
        });


        // If there are any niche queryrows that reside before the first category queryrow
        if (this.queryRows.findIndex(x => x.queryType == QueryType.Niche) < this.queryRows.findIndex(x => x.queryType == QueryType.Category)) {
            usedCategories = [];

            // Rebuild those niche queryrow dropdowns
            usedNicheDropdownOptions = this.getUsedDropdownOptions(QueryType.Niche);
            this.queryRows.forEach(x => {
                if (x.queryType == QueryType.Niche) {

                    // As long as the current niche queryrow resides before the first category queryrow
                    if (this.queryRows.indexOf(x) < this.queryRows.findIndex(x => x.queryType == QueryType.Category)) {
                        this.buildNicheDropdown(x, usedNicheDropdownOptions, usedCategories, this.queryService.categories);
                    }
                }
            });
        }

        // Update the category query
        this.updateQuery(QueryType.Category);
        // Update the niche query
        this.updateNicheQuery(this.queryService.categories);
    }
}


// ===================================================( NICHE QUERY ROW )===================================================\\
export class NicheQueryRow extends QueryRowClass implements QueryRow {
    constructor(
        queryRows: Array<QueryRow>,
        queries: Array<Query>,
        private queryService: QueryService) {
        super(queryRows, queries);
        this.queryType = QueryType.Niche;
        this.hasOperators = false;
        this.valueType = ValueType.Dropdown;
        this.whereDropdownSelectedIndex = 2;
    }
    public valueDropdownSelectedIndex: number = 0;
    public dropdownList: Array<KeyValue<any, any>>;

    newQueryRow(queryRowIndex: number) {
        // Create the new niche queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new NicheQueryRow(this.queryRows, this.queries, this.queryService));

        // Update the list of categories that have been used so far
        let usedCategories: Array<number> = [];
        this.queryRows.forEach(x => {
            this.updateUsedCategoriesList(usedCategories, x, this.queryService.categories);
        })

        // Build the dropdown for this new niche queryrow
        let usedNicheDropdownOptions: Array<number> = this.getUsedDropdownOptions(QueryType.Niche);
        this.buildNicheDropdown(this.queryRows[queryRowIndex], usedNicheDropdownOptions, usedCategories, this.queryService.categories);
    }


    updateValue(newValue: number) {
        // Update the value and the selected index
        this.value = newValue != null ? newValue.toString() : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.value);


        // Rebuild all the niche queryrow dropdowns
        let usedCategories: Array<number> = [];
        let usedNicheDropdownOptions: Array<number> = this.getUsedDropdownOptions(QueryType.Niche);
        this.queryRows.forEach(x => {
            // Update the list of categories that have been used so far
            this.updateUsedCategoriesList(usedCategories, x, this.queryService.categories);

            if (x.queryType == QueryType.Niche) {
                this.buildNicheDropdown(x, usedNicheDropdownOptions, usedCategories, this.queryService.categories);
            }
        });

        // Update the category query
        this.updateQuery(QueryType.Category);
        // Update the niche query
        this.updateNicheQuery(this.queryService.categories);
    }
}




// ===================================================( PRODUCT SUBGROUP QUERY ROW )===================================================\\
export class ProductSubgroupQueryRow extends QueryRowClass implements QueryRow {
    constructor(
        queryRows: Array<QueryRow>,
        queries: Array<Query>,
        private queryService: QueryService) {
        super(queryRows, queries);
        this.queryType = QueryType.ProductSubgroup;
        this.hasOperators = false;
        this.valueType = ValueType.Dropdown;
        this.whereDropdownSelectedIndex = 3;
    }
    public valueDropdownSelectedIndex: number = 0;
    public dropdownList: Array<KeyValue<any, any>>;

    newQueryRow(queryRowIndex: number) {
        // Create the new subgroup query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductSubgroupQueryRow(this.queryRows, this.queries, this.queryService));

        // Build the dropdown for this new subgroup queryrow
        let usedSubgroupDropdownOptions: Array<number> = this.getUsedDropdownOptions(QueryType.ProductSubgroup);
        this.buildDropdown(this.queryRows[queryRowIndex], usedSubgroupDropdownOptions, this.queryService.subgroups);
    }

    updateValue(newValue: number) {
        // Update the value and the selected index
        this.value = newValue != null ? newValue.toString() : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.value);

        // Rebuild all the subgroup dropdowns
        let usedSubgroupDropdownOptions: Array<number> = this.getUsedDropdownOptions(QueryType.ProductSubgroup);
        this.queryRows.forEach(x => {
            if (x.queryType == QueryType.ProductSubgroup) {
                this.buildDropdown(x, usedSubgroupDropdownOptions, this.queryService.subgroups);
            }
        });

        // Update the subgroup query
        this.updateQuery(QueryType.ProductSubgroup)
    }
}



// ===================================================( FEATURED PRODUCTS QUERY ROW )===================================================\\
export class FeaturedProductsQueryRow extends QueryRowClass implements QueryRow {
    constructor(queryRows: Array<QueryRow>, queries: Array<Query>) {
        super(queryRows, queries);
        this.queryType = QueryType.FeaturedProducts;
        this.value = "";
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
            this.value = this.listItems.map(x => x.name).toString();
            this.setQueriesValue(QueryType.FeaturedProducts);
        }
    }


    onListItemDelete() {
        this.itemList.deleteListItem();
        this.value = this.listItems.map(x => x.name).toString();
        this.setQueriesValue(QueryType.FeaturedProducts);
    }


    openPopup(sourceElement: HTMLElement) {
        console.log("open Popup")
    }
}




// ===================================================( CUSTOMER RELATED PRODUCTS QUERY ROW )===================================================\\
export class CustomerRelatedProductsQueryRow extends QueryRowClass implements QueryRow {
    constructor(
        queryRows: Array<QueryRow>,
        queries: Array<Query>,
        private queryService: QueryService) {
        super(queryRows, queries);
        this.queryType = QueryType.CustomerRelatedProducts;
        this.hasOperators = false;
        this.valueType = ValueType.Dropdown;
        this.whereDropdownSelectedIndex = 5;
    }
    public valueDropdownSelectedIndex: number = 0;
    public dropdownList: Array<KeyValue<any, any>>;

    newQueryRow(queryRowIndex: number) {
        // Create the new customer related products query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CustomerRelatedProductsQueryRow(this.queryRows, this.queries, this.queryService));

        // Build the dropdown for this new customer related products queryrow
        let usedCustomerRelatedProductsDropdownOptions: Array<number> = this.getUsedDropdownOptions(QueryType.CustomerRelatedProducts);
        this.buildDropdown(this.queryRows[queryRowIndex], usedCustomerRelatedProductsDropdownOptions, this.queryService.customerRelatedProducts);
    }

    updateValue(newValue: number) {
        // Update the value and the selected index
        this.value = newValue != null ? newValue.toString() : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.value);

        // Rebuild all the customer related products dropdowns
        let usedCustomerRelatedProductsDropdownOptions: Array<number> = this.getUsedDropdownOptions(QueryType.CustomerRelatedProducts);
        this.queryRows.forEach(x => {
            if (x.queryType == QueryType.CustomerRelatedProducts) {
                this.buildDropdown(x, usedCustomerRelatedProductsDropdownOptions, this.queryService.customerRelatedProducts);
            }
        });

        // Update the customer related products query
        this.updateQuery(QueryType.CustomerRelatedProducts)
    }
}



// ===================================================( PRODUCT PRICE QUERY ROW )===================================================\\
export class ProductPriceQueryRow extends QueryRowClass implements QueryRow {
    constructor(queryRows: Array<QueryRow>, queries: Array<Query>) {
        super(queryRows, queries);
        this.queryType = QueryType.ProductPrice;
        this.value = "0.00";
        this.hasOperators = true;
        this.valueType = ValueType.Price;
        this.whereDropdownSelectedIndex = 6;
    }
    public value2 = "0.00";

    newQueryRow(queryRowIndex: number) {
        let oldQueryType = this.queryRows[queryRowIndex].queryType;

        // Update the query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductPriceQueryRow(this.queryRows, this.queries));

        // Then update the queries
        this.updateQueriesOLD(oldQueryType, QueryType.ProductPrice);
    }

    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
        this.setQueriesOperator(QueryType.ProductPrice);
    }

    updateWholeNumberValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(wholeNumberInputText.value) ? wholeNumberInputText.value = wholeNumberInputText.value.replace(/[^0123456789]/ig, '') : null;

        if (wholeNumberInputText.id == "wholeNumber1") {
            this.value = (wholeNumberInputText.value.length == 0 ? 0 : wholeNumberInputText.value) + "." + (decimalInputText.value.length == 0 ? "00" : decimalInputText.value);
        } else {
            this.value2 = (wholeNumberInputText.value.length == 0 ? 0 : wholeNumberInputText.value) + "." + (decimalInputText.value.length == 0 ? "00" : decimalInputText.value);
        }

        this.setQueriesValue(QueryType.ProductPrice);
    }

    updateDecimalValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(decimalInputText.value) ? decimalInputText.value = decimalInputText.value.replace(/[^0123456789]/ig, '') : null;
        let intValue = parseInt(decimalInputText.value);

        if (decimalInputText.id == "decimal1") {
            this.value = wholeNumberInputText.value + "." + (intValue < 10 && decimalInputText.value.length == 1 ? "0" + decimalInputText.value : decimalInputText.value.length == 0 ? "00" : decimalInputText.value);
        } else {
            this.value2 = wholeNumberInputText.value + "." + (intValue < 10 && decimalInputText.value.length == 1 ? "0" + decimalInputText.value : decimalInputText.value.length == 0 ? "00" : decimalInputText.value);
        }

        this.setQueriesValue(QueryType.ProductPrice);
    }

    onDecimalInputBlur(decimalInputText: HTMLInputElement) {
        let intValue = parseInt(decimalInputText.value);

        if (intValue < 10) {
            decimalInputText.value = "0" + intValue;
        }
    }
}


// ===================================================( PRODUCT RATING QUERY ROW )===================================================\\
export class ProductRatingQueryRow extends QueryRowClass implements QueryRow {
    constructor(
        queryRows: Array<QueryRow>,
        queries: Array<Query>,
        private queryService: QueryService) {
        super(queryRows, queries);
        this.queryType = QueryType.ProductRating;
        this.hasOperators = true;
        this.valueType = ValueType.Dropdown;
        this.whereDropdownSelectedIndex = 7;
    }
    public valueDropdownSelectedIndex: number = 0;
    public valueDropdownSelectedIndex2: number = 0;
    public dropdownList: Array<KeyValue<any, any>>;
    public dropdownList2: Array<KeyValue<any, any>>;
    public value2: string;
    public queryRowIndex: number;




    getUsedRatingDropdownOptions(queryType: QueryType) {
        let usedDropdownOptions = [];

        // Loop through all the queryrows
        this.queryRows.forEach(x => {
            // If we come across the queryrow that we're looking for
            if (x.queryType == queryType) {


                // And as long as that queryrow has NOT been set to 'none'
                if (x.valueDropdownSelectedIndex != 0) {

                    // Add the value of that queryrow to the used list
                    usedDropdownOptions.push(parseInt(x.value));
                }

                // If a range operator has been selected
                if (x.operatorType == OperatorType.IsBetween) {

                    // And as long as that value dropdown has NOT been set to 'none'
                    if (x.valueDropdownSelectedIndex2 != 0) {
                        // Add the selected value of that value dropdown to the used list
                        usedDropdownOptions.push(parseInt(x.value2));
                    }
                }
            }
        });
        return usedDropdownOptions;
    }




    buildRatingDropdown(queryRow: QueryRow, usedDropdownOptions: Array<number>, queryList: Array<QueryList>) {
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
                if ((usedDropdownOptions.indexOf(y.id) == -1 || y.id == parseInt(queryRow.value2)) && y.id > parseInt(queryRow.value)) {

                    // Add it to the dropdown list of this quryrow
                    queryRow.dropdownList2.push({
                        key: y.name,
                        value: y.id
                    })
                }
            })
            // Get the index of the option in the dropdown list where the option's value matches the current niche queryrow value
            let valueDropdownSelectedIndex2 = queryRow.dropdownList2.findIndex(y => y.value == queryRow.value2);

            // If an option value in the dropdown list does NOT match the current niche queryrow value, then assign the selected
            // index as zero (None). But if a match is found, assign the selected index the index of that dropdown option
            queryRow.valueDropdownSelectedIndex2 = valueDropdownSelectedIndex2 == -1 ? 0 : valueDropdownSelectedIndex2;
        }
    }







    newQueryRow(queryRowIndex: number) {
        // Create the new product rating query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductRatingQueryRow(this.queryRows, this.queries, this.queryService));
        this.queryRows[queryRowIndex].queryRowIndex = queryRowIndex;

        // Build the dropdown for this new customer related products queryrow
        let usedRatingDropdownOptions: Array<number> = this.getUsedRatingDropdownOptions(QueryType.ProductRating);
        this.buildRatingDropdown(this.queryRows[queryRowIndex], usedRatingDropdownOptions, this.queryService.productRating);
    }






    updateRatingQuery(queryType: QueryType) {
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
                        this.queries.push({ queryType: queryType, operator: [], value: [] });
                        queryIndex = this.queries.length - 1;
                    }

                    this.queries[queryIndex].operator.push(x.operatorType);

                    if (x.operatorType == OperatorType.IsBetween) {

                        this.queries[queryIndex].value.push(x.value + "," + x.value2);

                    } else {
                        // Update the query
                        this.queries[queryIndex].value.push(x.value);
                    }

                }
            }
        });
    }





    






    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
        this.updateRatingQuery(QueryType.ProductRating);

        // If a range operator has been selected
        if (this.operatorType == OperatorType.IsBetween) {

            // Build the options for the second dropdown in the range
            let usedRatingDropdownOptions: Array<number> = this.getUsedRatingDropdownOptions(QueryType.ProductRating);
            this.buildRatingDropdown(this.queryRows[this.queryRowIndex], usedRatingDropdownOptions, this.queryService.productRating);
        }
    }






    updateValue(newValue: string) {
        // Update the value and the selected index
        this.value = newValue != null ? newValue.toString() : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.value);

        // Rebuild all the rating dropdowns
        let usedRatingDropdownOptions: Array<number> = this.getUsedRatingDropdownOptions(QueryType.ProductRating);
        this.queryRows.forEach(x => {
            if (x.queryType == QueryType.ProductRating) {
                this.buildRatingDropdown(x, usedRatingDropdownOptions, this.queryService.productRating);
            }
        });


        // Rebuild all the rating dropdowns again if a second value dropdown has been set to 'none' from not having a high enough option available
        if (this.value2 != null && this.valueDropdownSelectedIndex2 == 0) {
            let usedRatingDropdownOptions: Array<number> = this.getUsedRatingDropdownOptions(QueryType.ProductRating);
            this.queryRows.forEach(x => {
                if (x.queryType == QueryType.ProductRating) {
                    this.buildRatingDropdown(x, usedRatingDropdownOptions, this.queryService.productRating);
                }
            });
        }

        // Update the rating query
        this.updateRatingQuery(QueryType.ProductRating);
    }

    updateValue2(newValue2: string) {

        // Update the value and the selected index
        this.value2 = newValue2 != null ? newValue2.toString() : null;
        this.valueDropdownSelectedIndex2 = this.dropdownList.findIndex(x => x.value == this.value2);

        // Rebuild all the rating dropdowns
        let usedRatingDropdownOptions: Array<number> = this.getUsedRatingDropdownOptions(QueryType.ProductRating);
        this.queryRows.forEach(x => {
            if (x.queryType == QueryType.ProductRating) {
                this.buildRatingDropdown(x, usedRatingDropdownOptions, this.queryService.productRating);
            }
        });

        // Update the rating query
        this.updateRatingQuery(QueryType.ProductRating);
    }
}




// ===================================================( PRODUCT KEYWORDS QUERY ROW )===================================================\\
export class ProductKeywordsQueryRow extends QueryRowClass implements QueryRow {
    constructor(queryRows: Array<QueryRow>, queries: Array<Query>) {
        super(queryRows, queries);
        this.queryType = QueryType.ProductKeywords;
        this.value = "";
        this.hasOperators = false;
        this.valueType = ValueType.EditableItemList;
        this.whereDropdownSelectedIndex = 8;
    }
    public editableListItems: Array<ListItem> = [];
    private editableItemList: EditableItemListComponent;

    newQueryRow(queryRowIndex: number) {
        let oldQueryType = this.queryRows[queryRowIndex].queryType;

        // Update the query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductKeywordsQueryRow(this.queryRows, this.queries));

        // Then update the queries
        this.updateQueriesOLD(oldQueryType, QueryType.ProductKeywords);
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
                    // New Keyword
                    new MenuOption('New Keyword', editableItemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
                    // Edit Keyword
                    new MenuOption('Edit Keyword', editableItemList.editIcon.isDisabled, this.onListItemEdit, null, 'Ctrl+Alt+E'),
                    // Delete Keyword
                    new MenuOption(!editableItemList.isMultiSelected ? 'Delete Keyword' : 'Delete Keywords', editableItemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
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
            this.value = this.editableListItems.map(x => x.name).toString();
            this.setQueriesValue(QueryType.ProductKeywords);
        }
    }


    onListItemEdit() {
        this.editableItemList.onListItemEdit();
        this.value = this.editableListItems.map(x => x.name).toString();
        this.setQueriesValue(QueryType.ProductKeywords);
    }


    onListItemDelete() {
        this.editableItemList.deleteListItem();
        this.value = this.editableListItems.map(x => x.name).toString();
        this.setQueriesValue(QueryType.ProductKeywords);
    }
}




// ===================================================( PRODUCT CREATION DATE QUERY ROW )===================================================\\
export class ProductCreationDateQueryRow extends QueryRowClass implements QueryRow {
    constructor(queryRows: Array<QueryRow>, queries: Array<Query>) {
        super(queryRows, queries);
        this.queryType = QueryType.ProductCreationDate;
        this.value = "";
        this.hasOperators = true;
        this.valueType = ValueType.Date;
        this.whereDropdownSelectedIndex = 9;
    }
    public value2 = "";

    newQueryRow(queryRowIndex: number) {
        let oldQueryType = this.queryRows[queryRowIndex].queryType;

        // Update the query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductCreationDateQueryRow(this.queryRows, this.queries));

        // Then update the queries
        this.updateQueriesOLD(oldQueryType, QueryType.ProductCreationDate);
    }

    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
        this.setQueriesOperator(QueryType.ProductCreationDate);
    }

    updateValue(inputText: HTMLInputElement) {
        this.value = inputText.value;
        this.setQueriesValue(QueryType.ProductCreationDate);
    }

    updateValue2(inputText2: HTMLInputElement) {
        this.value2 = inputText2.value;
        this.setQueriesValue(QueryType.ProductCreationDate);
    }
}
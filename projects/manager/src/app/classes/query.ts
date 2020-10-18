import { KeyValue } from '@angular/common';
import { stringify } from 'querystring';
import { DataService } from 'services/data.service';
import { QueryService } from '../services/query.service';
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

    updateQueries(oldQueryType: QueryType, newQueryType: QueryType) {
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
    valueDropdownSelectedIndex?: number;
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
        let categories = [];
        let usedCategories = [];

        // Update the query row with a new category query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CategoryQueryRow(this.queryRows, this.queries, this.queryService));

        // Create the first option for the dropdown list
        this.queryRows[queryRowIndex].dropdownList = [{ key: "None", value: null }];

        // Loop through all the query rows
        this.queryRows.forEach(x => {
            // If we come across a query row where its type is category
            if (x.queryType == QueryType.Category) {
                // Make a list of all the categories that have been used so far
                if (x.value != null) usedCategories.push(parseInt(x.value));
            }
        })

        // Loop through all the categories of the categories array
        this.queryService.categories.forEach(x => {
            // If we come across a category that has NOT been used yet
            if (usedCategories.indexOf(x.id) == -1) {
                // Add it to the categories list
                categories.push(x);
            }
        });

        // Combine the first option with the list of categories
        this.queryRows[queryRowIndex].dropdownList = this.queryRows[queryRowIndex].dropdownList.concat(
            this.queryRows[queryRowIndex].dropdownList = categories.map(x => ({
                key: x.name,
                value: x.id
            }))
        );
    }


    updateValue(newValue: number) {
        let nicheQueryIndex: number = this.queries.findIndex(x => x.queryType == QueryType.Niche);

        // If the dropdown option that was selected is anything other than 'None'
        if (newValue != null) {
            let usedCategories = [];
            let categoryQueryIndex: number = this.queries.findIndex(x => x.queryType == QueryType.Category);


            // Save the id of the category that was selected from the dropdown
            this.value = newValue.toString();

            // To get a list of all the categories that have been used so far, loop through all the queryrows
            this.queryRows.forEach(x => {
                // If we come across a query row where its type is category
                if (x.queryType == QueryType.Category) {
                    // Add that category to the used list
                    if (x.value != null) usedCategories.push(parseInt(x.value));
                }
            });

            // If the category query exists, clear its value
            if (categoryQueryIndex != -1) this.queries[categoryQueryIndex].value = [];

            // If the niche query exists, clear its value
            if (nicheQueryIndex != -1) this.queries[nicheQueryIndex].value = [];



            // Loop through all the query rows
            this.queryRows.forEach(x => {


                // -------------------------CATEGORY-------------------------\\
                // If we come across a query row where its type is category
                if (x.queryType == QueryType.Category) {
                    let usingNiches: boolean;
                    let categoryIndex = this.queryService.categories.findIndex(y => y.id == parseInt(x.value));

                    // Rebuild the dropdown list for that current category quryrow
                    x.dropdownList = [{ key: "None", value: null }];

                    // Loop through all the queryrows
                    this.queryRows.forEach(y => {

                        // When we come across a niche queryrow
                        if (y.queryType == QueryType.Niche) {

                            // Check to see if any of the niches from the current category is the selected niche in this niche queryrow
                            if (this.queryService.categories[categoryIndex].niches.findIndex(z => z.id == parseInt(y.value)) != -1) {
                                // If it is, mark the current category as using a niche
                                usingNiches = true;
                            }

                        }
                    })













                    // As long as no niches from the current category are being used
                    // We don't want the current category to be added to the category query if any of its niches are being used
                    if (!usingNiches) {

                        // Create the category query if it has NOT been created already
                        if (categoryQueryIndex == -1) {
                            this.queries.push({ queryType: QueryType.Category, operator: [OperatorType.Equals], value: [] });
                            categoryQueryIndex = this.queries.length - 1;
                        }


                        // Add the category id of the current category to the category query
                        this.queries[categoryQueryIndex].value.push(x.value.toString());
                    }

                    // Loop through all the categories of the category array
                    this.queryService.categories.forEach(y => {

                        // If we come across a category that has NOT been used yet or is the selected category in the dropdown of the current category quryrow
                        if (usedCategories.indexOf(y.id) == -1 || y.id == parseInt(x.value)) {

                            // Add it to the dropdown list of the current category quryrow
                            x.dropdownList.push({
                                key: y.name,
                                value: y.id
                            })
                        }
                    })

                    // Now that the dropdown list has been rebuilt for the current category quryrow, set the selected index for its dropdown
                    x.valueDropdownSelectedIndex = x.dropdownList.findIndex(y => y.value == x.value);
                }


                // -------------------------NICHE-------------------------\\
                // If we come across a query row where its type is niche
                if (x.queryType == QueryType.Niche) {

                    // Create the niche query if it has NOT been created already
                    if (nicheQueryIndex == -1) {
                        this.queries.push({ queryType: QueryType.Niche, operator: [OperatorType.Equals], value: [] });
                        nicheQueryIndex = this.queries.length - 1;
                    }

                    // As long as the current niche queryrow resides after the category queryrow that was selected
                    if (this.queryRows.indexOf(x) > this.queryRows.indexOf(this)) {

                        // Rebuild the dropdown list for the current niche quryrow
                        x.dropdownList = [{ key: "None", value: null }];

                        // Loop through all the queryrows
                        this.queryRows.forEach(y => {

                            // When we come across a category queryrow
                            if (y.queryType == QueryType.Category) {

                                // As long as the value of that category queryrow has NOT been set to 'None'
                                // And as long as this category queryrow is before the current niche queryrow
                                if (y.value != null && this.queryRows.indexOf(y) < this.queryRows.indexOf(x)) {

                                    // Get the index of the category from the categories array that corresponds with the current category queryrow
                                    let categoryIndex = this.queryService.categories.findIndex(z => z.id == parseInt(y.value));

                                    // Then loop through each niche of that category
                                    this.queryService.categories[categoryIndex].niches.forEach(z => {

                                        // If we come across a niche that has NOT been used yet
                                        if (this.queries[nicheQueryIndex].value.indexOf(z.id.toString()) == -1) {

                                            // Add it to the dropdown list of the current niche quryrow
                                            x.dropdownList.push({
                                                key: z.name,
                                                value: z.id
                                            })
                                        }
                                    });
                                }
                            }
                        })

                        // Get the index of the option in the dropdown list where the option's value matches the current niche queryrow value
                        let valueDropdownSelectedIndex = x.dropdownList.findIndex(y => y.value == x.value);

                        // If an option value in the dropdown list does NOT match the current niche queryrow value, then assign the selected
                        // index as zero (None). But if a match is found, assign the selected index the index of that dropdown option
                        x.valueDropdownSelectedIndex = valueDropdownSelectedIndex == -1 ? 0 : valueDropdownSelectedIndex;
                    }

                    // As long as the value of the current niche is NOT 'None'
                    if (x.value != null) {
                        // Add the value of this current niche to the niche query
                        this.queries[nicheQueryIndex].value.push(x.value.toString());
                    }
                }
            });


            // If the dropdown option that was selected is 'None'
        } else {
            let categoryIndex = this.queryService.categories.findIndex(y => y.id == parseInt(this.value));
            let usedNiches = [];

            // Loop through all the queryrows
            this.queryRows.forEach(y => {

                // When we come across a niche queryrow
                if (y.queryType == QueryType.Niche) {

                    // If the current niche queryrow is before the category queryrow that was set to 'none'  
                    if (this.queryRows.indexOf(y) < this.queryRows.indexOf(this)) {
                        // Then add that niche to the used list
                        usedNiches.push(y.value);
                    }

                    // Check to see if the current niche belongs to the category that was set to 'none' and if that niche has NOT already been used
                    let nicheIdIndex = this.queryService.categories[categoryIndex].niches.findIndex(z => z.id == parseInt(y.value) && usedNiches.indexOf(y.value) == -1);

                    // if the current niche belongs to the category that was set to 'none' and if that niche has NOT already been used
                    if (nicheIdIndex != -1) {
                        // Set the option to that niche queryrow's value dropdown to 'none'
                        y.valueDropdownSelectedIndex = 0;
                    }
                }
            })


            // Loop through all the niches that belongs to the category that was set to 'none'
            this.queryService.categories[categoryIndex].niches.forEach(y => {

                // Check to see if the current niche belongs to the category that was set to 'none' and if that niche has NOT already been used
                let nicheIdIndex = this.queries[nicheQueryIndex].value.findIndex(z => z == y.id.toString() && usedNiches.indexOf(y.id.toString()) == -1);

                // If the current niche belongs to the category that was set to 'none' and if that niche has NOT already been used
                if (nicheIdIndex != -1) {
                    // Remove that niche from the niche query
                    this.queries[nicheQueryIndex].value.splice(nicheIdIndex, 1);
                }
            });





            // If no more niche ids are in the niche query
            if (this.queries[nicheQueryIndex].value.length == 0) {
                // Remove the niche query
                this.queries.splice(nicheQueryIndex, 1);
            }

            this.value = null;
        }
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
        let niches = [];
        let usedNiches = [];

        // Update the query row with a new niche query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new NicheQueryRow(this.queryRows, this.queries, this.queryService));


        // Create the first option for the dropdown list
        this.queryRows[queryRowIndex].dropdownList = [{ key: "None", value: null }];

        // Loop through all the query rows
        this.queryRows.forEach(x => {
            // If we come across a query row where its type is niche
            if (x.queryType == QueryType.Niche) {
                // Make a list of all the niches that have been used so far
                if (x.value != null) usedNiches.push(parseInt(x.value));
            }
        })

        // If a category queryrow has NOT been created yet
        if (this.queryRows.findIndex(x => x.queryType == QueryType.Category) == -1) {

            // Loop through all the categories of the categories array
            this.queryService.categories.forEach(x => {

                // Then loop through each niche of that current category
                x.niches.forEach(y => {

                    // If we come across a niche that has NOT been used yet
                    if (usedNiches.indexOf(y.id) == -1) {
                        // Add it to the categories list
                        niches.push(y);
                    }
                })
            });

            // But if a category queryrow has already been created
        } else {

            // Loop through all the queryrows
            this.queryRows.forEach(x => {

                // When we come across a category queryrow
                if (x.queryType == QueryType.Category) {

                    // And as long as the value of that category queryrow has NOT been set to 'None'
                    if (x.value != null) {
                        // Get the index of the category from the categories array that corresponds with the current category queryrow
                        let categoryIndex = this.queryService.categories.findIndex(y => y.id == parseInt(x.value));

                        // Then loop through each niche of that category
                        this.queryService.categories[categoryIndex].niches.forEach(y => {

                            // If we come across a niche that has NOT been used yet
                            if (usedNiches.indexOf(y.id) == -1) {
                                // Add it to the niches list
                                niches.push(y);
                            }
                        });
                    }
                }
            })
        }

        // Combine the first option with the list of niches
        this.queryRows[queryRowIndex].dropdownList = this.queryRows[queryRowIndex].dropdownList.concat(
            this.queryRows[queryRowIndex].dropdownList = niches.map(x => ({
                key: x.name,
                value: x.id
            }))
        );
    }


    updateValue(newValue: number) {
        // If the dropdown option that was selected is anything other than 'None'
        if (newValue != null) {
            this.value = newValue.toString();
            this.setQueriesValue(QueryType.Niche);
            this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == newValue);
            let categoryQueryIndex = this.queries.findIndex(x => x.queryType == QueryType.Category);
            let categoryId: number;

            // If a category query exists
            if (categoryQueryIndex != -1) {
                // Loop through all the categories of the category array
                for (let i = 0; i < this.queryService.categories.length; i++) {
                    // Loop through each niche of the curret category
                    for (let j = 0; j < this.queryService.categories[i].niches.length; j++) {
                        // If we come across a niche where its id matches the dropdown option that was selected
                        if (this.queryService.categories[i].niches[j].id == newValue) {
                            // Look to the category where that niche resides and record the id of that category
                            categoryId = this.queryService.categories[i].id;
                            break;
                        }
                    }
                }
                // Get the index of the category in the category query that matches the category id that was recorded
                let categoryIdIndex = this.queries[categoryQueryIndex].value.indexOf(categoryId.toString());

                // Remove the category from category query
                this.queries[categoryQueryIndex].value.splice(categoryIdIndex, 1);

                // If all categories are removed from the category query
                if (this.queries[categoryQueryIndex].value.length == 0) {
                    // Then remove the category query
                    this.queries.splice(categoryQueryIndex, 1);
                }
            }



            // If the dropdown option that was selected is 'None'
        } else {
            let categoryQueryRowIndex = this.queryRows.findIndex(x => x.queryType == QueryType.Category);

            // If no category queryrows exist
            if (categoryQueryRowIndex == -1) {

                // Get the index of the niche query
                let nicheQueryIndex = this.queries.findIndex(x => x.queryType == QueryType.Niche);
                // Get the index of the value in the niche query that was set to 'none'
                let nicheQueryValueIndex = this.queries[nicheQueryIndex].value.indexOf(this.value);
                // Remove that value from the niche query
                this.queries[nicheQueryIndex].value.splice(nicheQueryValueIndex, 1);

                // But if there is category queryrows
            } else {
                let nicheQueryRowIndex = this.queryRows.findIndex(x => x.queryType == QueryType.Niche && x.value != this.value);

                // If there are niche queryrows that exist other than the one that was just set to 'none'
                if (nicheQueryRowIndex != -1) {

                    // Get the index of the niche query
                    let nicheQueryIndex = this.queries.findIndex(x => x.queryType == QueryType.Niche);
                    // Get the index of the value in the niche query that was set to 'none'
                    let nicheQueryValueIndex = this.queries[nicheQueryIndex].value.indexOf(this.value);
                    // Remove that value from the niche query
                    this.queries[nicheQueryIndex].value.splice(nicheQueryValueIndex, 1);

                    // Or if no niche queryrows exist
                } else {
                    let nicheQueryIndex = this.queries.findIndex(x => x.queryType == QueryType.Niche);

                    // Clear the niche query value
                    this.queries[nicheQueryIndex].value = [];

                    // Update the niche query value with all the niches from category queryrows
                    this.queryRows.forEach(x => {
                        if (x.queryType == QueryType.Category) {
                            let categoryIndex = this.queryService.categories.findIndex(y => y.id == parseInt(x.value));
                            this.queryService.categories[categoryIndex].niches.forEach(x => this.queries[nicheQueryIndex].value = this.queries[nicheQueryIndex].value.concat(x.id.toString()));
                        }
                    })
                }
            }
        }
    }
}




// ===================================================( PRODUCT SUBGROUP QUERY ROW )===================================================\\
export class ProductSubgroupQueryRow extends QueryRowClass implements QueryRow {
    constructor(
        queryRows: Array<QueryRow>,
        queries: Array<Query>,
        private dataService: DataService) {
        super(queryRows, queries);
        this.queryType = QueryType.ProductSubgroup;
        this.hasOperators = false;
        this.valueType = ValueType.Dropdown;
        this.whereDropdownSelectedIndex = 3;
    }


    newQueryRow(queryRowIndex: number) {
        let oldQueryType = this.queryRows[queryRowIndex].queryType;

        // Update the query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductSubgroupQueryRow(this.queryRows, this.queries, this.dataService));


        // Query all the categories
        this.dataService.get('api/Subgroups')
            .subscribe((subgroups) => {


                // Create the dropdown list
                this.queryRows[queryRowIndex].dropdownList = subgroups.map(x => ({
                    key: x.name,
                    value: x.id
                }))


                // Initialize the value for the new query row
                this.queryRows[queryRowIndex].value = this.queryRows[queryRowIndex].dropdownList[0].value.toString();

                // Then update the queries
                this.updateQueries(oldQueryType, QueryType.ProductSubgroup);
            });
    }

    updateValue(newValue: number) {
        this.value = newValue.toString();
        this.setQueriesValue(QueryType.ProductSubgroup);
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
        this.updateQueries(oldQueryType, QueryType.FeaturedProducts);
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
    constructor(queryRows: Array<QueryRow>, queries: Array<Query>) {
        super(queryRows, queries);
        this.queryType = QueryType.CustomerRelatedProducts;
        this.hasOperators = false;
        this.valueType = ValueType.Dropdown;
        this.whereDropdownSelectedIndex = 5;
    }


    newQueryRow(queryRowIndex: number) {
        let oldQueryType = this.queryRows[queryRowIndex].queryType;

        // Update the query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CustomerRelatedProductsQueryRow(this.queryRows, this.queries));

        // Create the dropdown list
        this.queryRows[queryRowIndex].dropdownList = [
            { key: "List Products", value: "List Products" },
            { key: "Purchased Products", value: "Purchased Products" },
            { key: "Browsed Products", value: "Browsed Products" }
        ];

        // Initialize the value for the new query row
        this.queryRows[queryRowIndex].value = this.queryRows[queryRowIndex].dropdownList[0].value.toString();

        // Then update the queries
        this.updateQueries(oldQueryType, QueryType.CustomerRelatedProducts);
    }

    updateValue(newValue: string) {
        this.value = newValue;
        this.setQueriesValue(QueryType.CustomerRelatedProducts);
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
        this.updateQueries(oldQueryType, QueryType.ProductPrice);
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
    constructor(queryRows: Array<QueryRow>, queries: Array<Query>) {
        super(queryRows, queries);
        this.queryType = QueryType.ProductRating;
        this.value = this.getList()[0].value.toString();
        this.hasOperators = true;
        this.valueType = ValueType.Dropdown;
        this.whereDropdownSelectedIndex = 7;
    }
    public value2 = this.getList()[0].value.toString();

    getList() {
        let ratingList: Array<KeyValue<any, any>> = [
            { key: "0", value: "0" },
            { key: "1", value: "1" },
            { key: "2", value: "2" },
            { key: "3", value: "3" },
            { key: "4", value: "4" },
            { key: "5", value: "5" }
        ];
        return ratingList;
    }

    newQueryRow(queryRowIndex: number) {
        let oldQueryType = this.queryRows[queryRowIndex].queryType;

        // Update the query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductRatingQueryRow(this.queryRows, this.queries));

        // Then update the queries
        this.updateQueries(oldQueryType, QueryType.ProductRating);
    }


    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
        this.setQueriesOperator(QueryType.ProductRating);
    }

    updateValue(newValue: string) {
        this.value = newValue;
        this.setQueriesValue(QueryType.ProductRating);
    }

    updateValue2(newValue2: string) {
        this.value2 = newValue2;
        this.setQueriesValue(QueryType.ProductRating);
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
        this.updateQueries(oldQueryType, QueryType.ProductKeywords);
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
        this.updateQueries(oldQueryType, QueryType.ProductCreationDate);
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
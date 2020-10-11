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
    public selectedIndex: number;

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
        let index = this.queries.findIndex(x => x.queryType == queryType);
        let valueList: Array<string> = [];

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
        // console.log(this.queries)
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
        // console.log(this.queries)
    }
}


export interface QueryRow {
    queryType: QueryType;
    hasOperators: boolean;
    operatorType: OperatorType;
    valueType: ValueType;
    value: string;
    value2?: string;
    selectedIndex: number
    dropdownList?: Array<KeyValue<any, any>>;
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
    selectedIndex = 0;

    updateQueryRow(queryRowIndex: number) {
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
        this.selectedIndex = 1;
    }

    updateQueryRow(queryRowIndex: number) {
        let categories = [];
        let usedCategories = [];
        let oldQueryType = this.queryRows[queryRowIndex].queryType;
        
        // Update the query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CategoryQueryRow(this.queryRows, this.queries, this.queryService));

        // Create the first option for the dropdown list
        this.queryRows[queryRowIndex].dropdownList = [{ key: "None", value: null }];

        
        // Loop though all the query rows
        this.queryRows.forEach(x => {
            
            if (x.queryType == QueryType.Category) {
                // Get a list of all the categories that have been used so far
                if(x.value != null) usedCategories.push(parseInt(x.value));
            }
        })

        this.queryService.categories.forEach(x => {

            if(usedCategories.indexOf(x.id) == -1) {
                categories.push(x);
            }

            
        });


        // Combine the first option
        this.queryRows[queryRowIndex].dropdownList = this.queryRows[queryRowIndex].dropdownList.concat(

            this.queryRows[queryRowIndex].dropdownList = categories.map(x => ({
                key: x.name,
                value: x.id
            }))
        );

        // Create the dropdown list


        // Initialize the value for the new query row
        // this.queryRows[queryRowIndex].value = this.queryRows[queryRowIndex].dropdownList[0].value.toString();

        // Then update the queries
        // this.updateQueries(oldQueryType, QueryType.Category);

















        // // Query all the categories
        // this.dataService.get('api/Categories')
        //     .subscribe((categories: Array<Category>) => {

        //         // Create the dropdown list
        //         this.queryRows[queryRowIndex].dropdownList = categories.map(x => ({
        //             key: x.name,
        //             value: x.id
        //         }))

        //         // Initialize the value for the new query row
        //         this.queryRows[queryRowIndex].value = this.queryRows[queryRowIndex].dropdownList[0].value.toString();

        //         // Then update the queries
        //         this.updateQueries(oldQueryType, QueryType.Category);
        //     });
    }

    updateValue(newValue: number) {
        // Create the niche query if it does NOT exist yet
        if (this.queries.findIndex(x => x.queryType == QueryType.Niche) == -1) {
            this.queries.push({ queryType: QueryType.Niche, operator: [OperatorType.Equals], value: [] });
        }


        let nicheQueryIndex = this.queries.findIndex(x => x.queryType == QueryType.Niche);
        let valueList: Array<string> = [];

        // // Loop through all the queryrows
        // this.queryRows.forEach(x => {

        //     if (x.queryType == QueryType.Category) {


        let categoryIndex = this.queryService.categories.findIndex(y => y.id == newValue);

        this.queryService.categories[categoryIndex].niches.forEach(z => valueList.push(z.id.toString()));



        this.queries[nicheQueryIndex].value = [...new Set(this.queries[nicheQueryIndex].value.concat(valueList))];




        //     }
        // });



        this.value = newValue.toString();
        // this.setQueriesValue(QueryType.Category);
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
        this.selectedIndex = 2;
    }


    updateQueryRow(queryRowIndex: number) {
        let niches = [];
        let oldQueryType = this.queryRows[queryRowIndex].queryType;
        
        // Update the query row with a new niche query row
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new NicheQueryRow(this.queryRows, this.queries, this.queryService));


        // Create the first option for the dropdown list
        this.queryRows[queryRowIndex].dropdownList = [{ key: "None", value: null }];






        if (this.queries.findIndex(x => x.queryType == QueryType.Niche) == -1) {


            this.queryService.categories.forEach(x => niches = niches.concat(x.niches));


        } else {

            this.queryRows.forEach(x => {
                if (x.queryType == QueryType.Category) {
                    let categoryIndex = this.queryService.categories.findIndex(y => y.id == parseInt(x.value));

                    this.queryService.categories[categoryIndex].niches.forEach(x => niches = niches.concat(x));
                }
            })
        }







        // Combine the first option with the niche options
        this.queryRows[queryRowIndex].dropdownList = this.queryRows[queryRowIndex].dropdownList.concat(

            this.queryRows[queryRowIndex].dropdownList = niches.map(x => ({
                key: x.name,
                value: x.id
            }))
        );










        // // Find the index of the query that is of type 'Category'
        // let categoryQueryIndex = this.queries.findIndex(x => x.queryType == QueryType.Category);

        // // If a category query does NOT exist
        // if (categoryQueryIndex == -1) {

        //     let niches = [];

        //     this.queryService.categories.forEach(x => niches = niches.concat(x.niches));



        //     // Create the dropdown list
        //     this.queryRows[queryRowIndex].dropdownList = niches.map(x => ({
        //         key: x.name,
        //         value: x.id
        //     }))

        //     // Initialize the value for the new query row
        //     this.queryRows[queryRowIndex].value = this.queryRows[queryRowIndex].dropdownList[0].value.toString();

        //     // Then update the queries
        //     this.updateQueries(oldQueryType, QueryType.Niche);


        //     // If a category query is found
        // } else {
        //     let categoryIds: Array<number> = [];
        //     let niches = [];

        //     // Loop through all the values of the category query
        //     for (let i = 0; i < this.queries[categoryQueryIndex].value.length; i++) {
        //         // Convert its string values to num values
        //         categoryIds.push(parseInt(this.queries[categoryQueryIndex].value[i]));
        //         // Get the index of the category in the categories array from its id property
        //         let index = this.queryService.categories.findIndex(x => x.id == categoryIds[i]);
        //         // Get all the niches from that category and add them to the niches array
        //         niches = niches.concat(this.queryService.categories[index].niches);
        //     }

        //     // Create the dropdown list
        //     this.queryRows[queryRowIndex].dropdownList = niches.map(x => ({
        //         key: x.name,
        //         value: x.id
        //     }));

        //     // Initialize the value for the new query row
        //     this.queryRows[queryRowIndex].value = this.queryRows[queryRowIndex].dropdownList[0].value.toString();

        //     // Then update the queries
        //     this.updateQueries(oldQueryType, QueryType.Niche);
        // }


















        // // Find the index of the query that is of type 'Category'
        // let categoryQueryIndex = this.queries.findIndex(x => x.queryType == QueryType.Category);

        // // If a category query does NOT exist
        // if (categoryQueryIndex == -1) {
        //     // Query all the niches
        //     this.dataService.get('api/Niches/All')
        //         .subscribe((niches) => {

        //             // Create the dropdown list
        //             this.queryRows[queryRowIndex].dropdownList = niches.map(x => ({
        //                 key: x.name,
        //                 value: x.id
        //             }))

        //             // Initialize the value for the new query row
        //             this.queryRows[queryRowIndex].value = this.queryRows[queryRowIndex].dropdownList[0].value.toString();

        //             // Then update the queries
        //             this.updateQueries(oldQueryType, QueryType.Niche);
        //         });

        // // If a category query is found
        // } else {
        //     let categoryIds: Array<number> = [];

        //     // Loop through all the values of the category query
        //     for (let i = 0; i < this.queries[categoryQueryIndex].value.length; i++) {
        //         // And convert its string values to num values
        //         categoryIds.push(parseInt(this.queries[categoryQueryIndex].value[i]))
        //     }

        //     // Query the niches based on the category ids
        //     this.dataService.post('api/Niches/CategoryIds', { categoryIds: categoryIds })
        //         .subscribe((niches) => {

        //             // Create the dropdown list
        //             this.queryRows[queryRowIndex].dropdownList = niches.map(x => ({
        //                 key: x.name,
        //                 value: x.id
        //             }))

        //             // Initialize the value for the new query row
        //             this.queryRows[queryRowIndex].value = this.queryRows[queryRowIndex].dropdownList[0].value.toString();

        //             // Then update the queries
        //             this.updateQueries(oldQueryType, QueryType.Niche);
        //         });
        // }











    }

    updateValue(newValue: number) {
        this.value = newValue.toString();
        this.setQueriesValue(QueryType.Niche);
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
        this.selectedIndex = 3;
    }


    updateQueryRow(queryRowIndex: number) {
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
        this.selectedIndex = 4;
    }
    public listItems: Array<ListItem> = [];
    private itemList: ItemListComponent;


    updateQueryRow(queryRowIndex: number) {
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
        this.selectedIndex = 5;
    }


    updateQueryRow(queryRowIndex: number) {
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
        this.selectedIndex = 6;
    }
    public value2 = "0.00";

    updateQueryRow(queryRowIndex: number) {
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
        this.selectedIndex = 7;
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

    updateQueryRow(queryRowIndex: number) {
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
        this.selectedIndex = 8;
    }
    public editableListItems: Array<ListItem> = [];
    private editableItemList: EditableItemListComponent;

    updateQueryRow(queryRowIndex: number) {
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
        this.selectedIndex = 9;
    }
    public value2 = "";

    updateQueryRow(queryRowIndex: number) {
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
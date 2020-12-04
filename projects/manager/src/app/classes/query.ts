import { KeyValue } from '@angular/common';
import { ComparisonOperatorType, LogicalOperatorType, Query, QueryType } from 'classes/query';
import { PopupService } from '../services/popup.service';
import { QueryDropdownList, QueryService } from '../services/query.service';
import { EditableItemListComponent } from '../shared-components/item-lists/editable-item-list/editable-item-list.component';
import { ItemListComponent } from '../shared-components/item-lists/item-list/item-list.component';
import { QueryBuilderComponent } from '../shared-components/properties/query-builder/query-builder.component';
import { Item } from './item';
import { ListItem } from './list-item';
import { MenuOption } from './menu-option';
import { Searchable } from './searchable';




export interface IQueryRow {
    queryType: QueryType;
    otherQueryType?: QueryType;
    hasOperators: boolean;
    comparisonOperator: ComparisonOperatorType;
    logicalOperator: LogicalOperatorType;
    valueType: ValueType;
    doubleValue?: number;
    dateValue?: Date;
    stringValues?: Array<string>;
    listItems?: Array<ListItem>;
    editableListItems?: Array<ListItem>;
    dropdownValue?: any;
    whereDropdownSelectedIndex: number;
    dropdownList?: Array<KeyValue<any, any>>;
    valueDropdownSelectedIndex?: number;
    queryRowIndex?: number;
    queryDropdownList?: Array<QueryDropdownList>;
    itemType?: string;
    itemTypes?: string;
    subQueryRows?: Array<IQueryRow>;
    wholeNumberValue?: string;
    decimalValue?: string;
    stringDate?: string;
    getQueryRows?(queryRows: Array<IQueryRow>): void;
    setQuery?(queries: Array<Query>): void;
    setQueryRow?(queryRowIndex: number): void;
    setPrice?(price: string): void;
    setItemList?(stringValues: Array<string>, intValues?: Array<number>): void;
    setDate?(stringDate: string): void;
}

export enum ValueType {
    Dropdown,
    Price,
    EditableItemList,
    ItemList,
    Date
}



export class QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>) { }
    public queryType: QueryType;
    public comparisonOperator: ComparisonOperatorType = ComparisonOperatorType.Equal;
    public logicalOperator: LogicalOperatorType = LogicalOperatorType.And;
    public hasOperators: boolean;
    public valueType: ValueType;

    updateLogicalOperator(logicalOperator: LogicalOperatorType) {
        this.logicalOperator = logicalOperator;
        // Get the products
        this.queryBuilder.getProducts();
    }

    onDelete(queryRowIndex: number) {
        
        this.queryRows.splice(queryRowIndex, 1);

        // Get the products
        this.queryBuilder.getProducts();
    }

    setQuery(queries: Array<Query>) {
    }
}

export class QueryRowDropdownBase extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows);
        this.hasOperators = false;
        this.valueType = ValueType.Dropdown;
    }
    public queryDropdownList: Array<QueryDropdownList>;
    public valueDropdownSelectedIndex: number = 0;
    public dropdownList: Array<KeyValue<any, any>>;
    public dropdownValue: any;

    buildDropdown(queryRow: IQueryRow, queryDropdownList: Array<QueryDropdownList>) {
        // Create the first option in the dropdown list
        queryRow.dropdownList = [{ key: "None", value: null }];

        // Loop through all the items of the query list
        queryDropdownList.forEach(y => {

            // Add it to the dropdown list of this quryrow
            queryRow.dropdownList.push({
                key: y.name,
                value: y.id
            })
        })
        // Now that the dropdown list has been created, set the option that will be selected
        queryRow.valueDropdownSelectedIndex = queryRow.dropdownList.findIndex(y => y.value == queryRow.dropdownValue);
    }


    updateValue(newValue: number) {
        // Update the value and the selected index
        this.dropdownValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.dropdownValue);

        // Get the products
        this.queryBuilder.getProducts();
    }

    setQuery(queries: Array<Query>) {
        if (this.valueDropdownSelectedIndex != 0) {
            queries.push({ queryType: this.queryType, comparisonOperator: this.comparisonOperator, logicalOperator: this.logicalOperator, intValue: this.dropdownValue });
        }
    }
}


export class QueryRowDropdown extends QueryRowDropdownBase {
    initialize(queryType: QueryType, queryRowIndex: number, queryDropdownList: Array<QueryDropdownList>) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryDropdownList = queryDropdownList;

        // Build the dropdown for this new queryrow
        this.buildDropdown(this.queryRows[queryRowIndex], this.queryRows[queryRowIndex].queryDropdownList);
    }
}


export class QueryRowParentChildDropdown extends QueryRowDropdownBase {
    public otherQueryType: QueryType;

    updateUsedParentIds(parentQueryType: QueryType, usedParentIds: Array<number>, parentQueryRow: IQueryRow, parentList: Array<QueryDropdownList>) {
        // If we come across a queryrow where its type is parent
        if (parentQueryRow.queryType == parentQueryType) {

            // As long as the value of the parent queryrow is NOT null
            if (parentQueryRow.dropdownValue != null) {

                // Get the index of the parent from the parent list that corresponds with the 
                // value of the current parent queryrow and add that index to the used parent ids list
                usedParentIds.push(parentList.findIndex(y => y.id == parentQueryRow.dropdownValue));
            }
        }
    }


    buildChildDropdown(childQueryRow: IQueryRow, parentList: Array<QueryDropdownList>, usedParentIds: Array<number>) {
        // Create the first option in the child dropdown list
        childQueryRow.dropdownList = [{ key: "None", value: null }];

        // If NO parent is available yet to build the child dropdown list
        if (usedParentIds.length == 0) {

            // Loop through all the parents of the parents list
            parentList.forEach(y => {

                // Then loop through each child of that current parent
                y.children.forEach(z => {

                    // Add it to the dropdown list of the current child quryrow
                    childQueryRow.dropdownList.push({
                        key: z.name,
                        value: z.id
                    })
                })
            });

            // If a parent is available to build the child dropdown list 
        } else {

            // Loop through all the parent ids that have been used so far
            usedParentIds.forEach(y => {

                // Then loop through each child of that parent
                parentList[y].children.forEach(z => {

                    // Add it to the dropdown list of the current child quryrow
                    childQueryRow.dropdownList.push({
                        key: z.name,
                        value: z.id
                    })
                });
            })
        }

        // Get the index of the option in the dropdown list where the option's value matches the current child queryrow value
        let valueDropdownSelectedIndex = childQueryRow.dropdownList.findIndex(y => y.value == childQueryRow.dropdownValue);

        // If an option value in the dropdown list does NOT match the current child queryrow value, then assign the selected
        // index as zero (None). But if a match is found, assign the selected index the index of that dropdown option
        childQueryRow.valueDropdownSelectedIndex = valueDropdownSelectedIndex == -1 ? 0 : valueDropdownSelectedIndex;
    }
}


export class QueryRowParentDropdown extends QueryRowParentChildDropdown {
    initialize(parentQueryType: QueryType, childQueryType: QueryType, queryRowIndex: number, queryDropdownList: Array<QueryDropdownList>) {
        this.queryRows[queryRowIndex].queryType = parentQueryType;
        this.queryRows[queryRowIndex].otherQueryType = childQueryType;
        this.queryRows[queryRowIndex].queryDropdownList = queryDropdownList;

        this.buildDropdown(this.queryRows[queryRowIndex], this.queryRows[queryRowIndex].queryDropdownList);
    }


    updateValue(newValue: number) {
        // Update the value and the selected index
        this.dropdownValue = newValue != null ? newValue : null;
        this.valueDropdownSelectedIndex = this.dropdownList.findIndex(x => x.value == this.dropdownValue);

        // Rebuild all the child queryrow dropdowns
        let usedParentIds: Array<number> = [];
        this.queryRows.forEach(x => {
            // Update the list of parent ids that have been used so far
            this.updateUsedParentIds(this.queryType, usedParentIds, x, this.queryDropdownList);

            if (x.queryType == this.otherQueryType) {
                // And as long as the current child queryrow resides after the parent queryrow that was selected
                if (this.queryRows.indexOf(x) > this.queryRows.indexOf(this)) {
                    this.buildChildDropdown(x, this.queryDropdownList, usedParentIds);
                }
            }
        });

        // Get the products
        this.queryBuilder.getProducts();
    }
}



export class QueryRowChildDropdown extends QueryRowParentChildDropdown {
    initialize(parentQueryType: QueryType, childQueryType: QueryType, queryRowIndex: number, queryDropdownList: Array<QueryDropdownList>) {
        this.queryRows[queryRowIndex].queryType = childQueryType;
        this.queryRows[queryRowIndex].otherQueryType = parentQueryType;
        this.queryRows[queryRowIndex].queryDropdownList = queryDropdownList;

        // Update the list of parent ids that have been used so far
        let usedParentIds: Array<number> = [];
        this.queryRows.forEach(x => {
            this.updateUsedParentIds(this.queryRows[queryRowIndex].otherQueryType, usedParentIds, x, this.queryRows[queryRowIndex].queryDropdownList);
        })

        // Build the dropdown for this new child queryrow
        this.buildChildDropdown(this.queryRows[queryRowIndex], this.queryRows[queryRowIndex].queryDropdownList, usedParentIds);
    }
}




export class QueryRowDropdownWithOperator extends QueryRowDropdown {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows, queryService)
        this.hasOperators = true;
    }

    updateComparisonOperator(comparisonOperator: ComparisonOperatorType) {
        this.comparisonOperator = comparisonOperator;
        // Get the products
        this.queryBuilder.getProducts();
    }
}



export class QueryRowPrice extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows)
        this.hasOperators = true;
        this.valueType = ValueType.Price;
    }
    public wholeNumberValue: string = "";
    public decimalValue: string = "";
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
        decimalValue = decimalInputText.value.length == 0 ? 0 : parseInt(decimalInputText.value) * (decimalInputText.value.length == 1 ? 0.1 : 0.01);

        // Return the whole number and decimal value
        return wholeNumberValue + decimalValue;
    }


    setPrice(stringValue: string) {
        let wholeNumberValue: number = 0;
        let decimalValue: number = 0.0;
        let price = stringValue.split(".");


        this.wholeNumberValue = price[0];
        this.decimalValue = price[1] == null ? "" : price[1];;

        // Calculate the whole number and decimal values based on what is being passed in from the input text boxes
        wholeNumberValue = this.wholeNumberValue.length == 0 ? 0 : parseInt(this.wholeNumberValue);
        decimalValue = this.decimalValue.length == 0 ? 0 : parseInt(this.decimalValue) * (this.decimalValue.length == 1 ? 0.1 : 0.01);

        // Return the whole number and decimal value
        this.doubleValue = wholeNumberValue + decimalValue;
    }

    updateWholeNumberValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(wholeNumberInputText.value) ? wholeNumberInputText.value = wholeNumberInputText.value.replace(/[^0123456789]/ig, '') : null;

        // Update the whole number value
        this.doubleValue = this.getPrice(wholeNumberInputText, decimalInputText);
        // Get the products
        this.queryBuilder.getProducts();
    }

    updateDecimalValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(decimalInputText.value) ? decimalInputText.value = decimalInputText.value.replace(/[^0123456789]/ig, '') : null;

        // Update the decimal value
        this.doubleValue = this.getPrice(wholeNumberInputText, decimalInputText);
        // Get the products
        this.queryBuilder.getProducts();
    }

    updateComparisonOperator(comparisonOperator: ComparisonOperatorType) {
        this.comparisonOperator = comparisonOperator;
        // Get the products
        this.queryBuilder.getProducts();
    }

    onDecimalInputBlur(decimalInputText: HTMLInputElement) {
        let intValue = parseInt(decimalInputText.value);

        if (intValue < 10 && decimalInputText.value.length == 1) {
            decimalInputText.value = intValue + "0";
        }
    }

    setQuery(queries: Array<Query>) {
        // As long as the value for this queryrow has NOT been set to '0.00'
        if (this.doubleValue != 0 && this.doubleValue != null) {
            queries.push({ queryType: this.queryType, comparisonOperator: this.comparisonOperator, logicalOperator: this.logicalOperator, doubleValue: this.doubleValue });
        }
    }
}


export class QueryRowItemList extends QueryRow implements Searchable<ListItem> {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public popupService: PopupService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows)
        this.hasOperators = false;
        this.valueType = ValueType.ItemList;
    }
    public stringValues: Array<string> = [];
    public intValues: Array<number> = [];
    public listItems: Array<ListItem> = [];
    private itemList: ItemListComponent;
    public itemType: string;
    public itemTypes: string;

    public items: Array<Item>;
    public searchResults: Array<Item>;
    public apiUrl: string = 'api/Products';

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
            onDeleteItem: this.delete
        }
    }

    onListItemDelete() {
        this.itemList.deleteListItem();
    }

    openPopup(sourceElement: HTMLElement) {
        this.popupService.sourceElement = sourceElement;
        this.popupService.searchPopup.searchable = this;
        this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
    }


    setSearchItem(searchItem: ListItem) {
        // Add the item to the list
        this.listItems.unshift(searchItem);
        // Select the new list item
        this.itemList.setListItemSelection(0);

        this.stringValues = this.listItems.map(x => x.name);
        this.intValues = this.listItems.map(x => x.id);

        // Get the products
        this.queryBuilder.getProducts();
    }

    delete() {
        this.stringValues = this.listItems.map(x => x.name);
        // Get the products
        this.queryBuilder.getProducts();
    }

    setItemList(names: Array<string>, ids?: Array<number>) {
        this.listItems = [];

        for (let i = 0; i < names.length; i++) {
            this.listItems.push({ id: ids[i], name: names[i], selectType: null, selected: null });
        }

        this.intValues = this.listItems.map(x => x.id);
        this.stringValues = this.listItems.map(x => x.name);
    }

    setQuery(queries: Array<Query>) {
        // As long as the this queryrow list is NOT empty
        if (this.stringValues.length != 0) {
            queries.push({ queryType: this.queryType, comparisonOperator: this.comparisonOperator, logicalOperator: this.logicalOperator, intValues: this.intValues, stringValues: this.stringValues });
        }
    }
}


export class QueryRowEditableItemList extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows)
        this.hasOperators = false;
        this.valueType = ValueType.EditableItemList;
    }
    public stringValues: Array<string> = [];
    public editableListItems: Array<ListItem> = [];
    public editableItemList: EditableItemListComponent;
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
            onAddItem: this.add,
            // On Add Item
            onEditItem: this.edit,
            // On Delete Item
            onDeleteItem: this.delete
        }
    }

    onListItemAdd() {
        this.editableItemList.onListItemAdd();
    }

    onListItemEdit() {
        this.editableItemList.onListItemEdit();
    }

    onListItemDelete() {
        this.editableItemList.deleteListItem();
    }

    add(listItem: ListItem) {
        if (this.editableItemList.listItems[0].name.length > 0) {
            this.stringValues = this.editableListItems.map(x => x.name);
            // Get the products
            this.queryBuilder.getProducts();
        }
    }

    edit(listItem: ListItem) {
        this.stringValues = this.editableListItems.map(x => x.name);
        // Get the products
        this.queryBuilder.getProducts();
    }

    delete() {
        this.stringValues = this.editableListItems.map(x => x.name);
        // Get the products
        this.queryBuilder.getProducts();
    }


    setItemList(names: Array<string>) {
        this.editableListItems = [];

        for (let i = 0; i < names.length; i++) {
            this.editableListItems.push({ id: null, name: names[i], selectType: null, selected: null });
        }

        this.stringValues = this.editableListItems.map(x => x.name);
    }



    setQuery(queries: Array<Query>) {
        // As long as the this queryrow list is NOT empty
        if (this.stringValues.length != 0) {
            queries.push({ queryType: this.queryType, comparisonOperator: this.comparisonOperator, logicalOperator: this.logicalOperator, stringValues: this.stringValues });
        }
    }
}



export class QueryRowDate extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows)
        this.hasOperators = true;
        this.valueType = ValueType.Date;
    }
    public dateValue: Date;
    public stringDate: string;

    initialize(queryType: QueryType, queryRowIndex: number) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryRowIndex = queryRowIndex;
    }

    updateComparisonOperator(comparisonOperator: ComparisonOperatorType) {
        this.comparisonOperator = comparisonOperator;
        // Get the products
        this.queryBuilder.getProducts();
    }

    updateValue(inputText: HTMLInputElement) {
        this.dateValue = new Date(inputText.value);
        // Get the products
        this.queryBuilder.getProducts();
    }

    setDate(stringDate: string) {
        this.stringDate = stringDate;
        this.dateValue = new Date(stringDate);
    }

    setQuery(queries: Array<Query>) {
        // And as long as the value for this queryrow has NOT been set to null
        if (this.dateValue != null) {
            queries.push({ queryType: this.queryType, comparisonOperator: this.comparisonOperator, logicalOperator: this.logicalOperator, dateValue: this.dateValue });
        }
    }
}








// ===================================================( QUERY ROW NONE )===================================================\\
export class QueryRowNone extends QueryRow implements IQueryRow {
}


// ===================================================( CATEGORY QUERY ROW )===================================================\\
export class CategoryQueryRow extends QueryRowParentDropdown implements IQueryRow {
    setQueryRow(queryRowIndex: number) {
        this.initialize(QueryType.Category, QueryType.Niche, queryRowIndex, this.queryService.categories);
    }
}

// ===================================================( NICHE QUERY ROW )===================================================\\
export class NicheQueryRow extends QueryRowChildDropdown implements IQueryRow {
    setQueryRow(queryRowIndex: number) {
        this.initialize(QueryType.Category, QueryType.Niche, queryRowIndex, this.queryService.categories);
    }
}


// ===================================================( PRODUCT SUBGROUP QUERY ROW )===================================================\\
export class ProductSubgroupQueryRow extends QueryRowDropdown {
    setQueryRow(queryRowIndex: number) {
        this.initialize(QueryType.ProductSubgroup, queryRowIndex, this.queryService.subgroups);
    }
}


// ===================================================( FEATURED PRODUCTS QUERY ROW )===================================================\\
export class FeaturedProductsQueryRow extends QueryRowItemList implements IQueryRow {
    setQueryRow(queryRowIndex: number) {
        this.initialize(QueryType.FeaturedProducts, queryRowIndex, "Product", "Products");
    }
}


// ===================================================( CUSTOMER RELATED PRODUCTS QUERY ROW )===================================================\\
export class CustomerRelatedProductsQueryRow extends QueryRowDropdown {
    setQueryRow(queryRowIndex: number) {
        this.initialize(QueryType.CustomerRelatedProducts, queryRowIndex, this.queryService.customerRelatedProducts);
    }
}

// ===================================================( PRODUCT PRICE QUERY ROW )===================================================\\
export class ProductPriceQueryRow extends QueryRowPrice implements IQueryRow {
    setQueryRow(queryRowIndex: number) {
        this.initialize(QueryType.ProductPrice, queryRowIndex);
    }
}


// ===================================================( PRODUCT RATING QUERY ROW )===================================================\\
export class ProductRatingQueryRow extends QueryRowDropdownWithOperator implements IQueryRow {
    setQueryRow(queryRowIndex: number) {
        this.initialize(QueryType.ProductRating, queryRowIndex, this.queryService.productRating);
    }
}


// ===================================================( PRODUCT KEYWORDS QUERY ROW )===================================================\\
export class ProductKeywordsQueryRow extends QueryRowEditableItemList implements IQueryRow {
    setQueryRow(queryRowIndex: number) {
        this.initialize(QueryType.ProductKeywords, queryRowIndex, "Keyword", "Keywords");
    }
}


// ===================================================( PRODUCT CREATION DATE QUERY ROW )===================================================\\
export class ProductCreationDateQueryRow extends QueryRowDate implements IQueryRow {
    setQueryRow(queryRowIndex: number) {
        this.initialize(QueryType.ProductCreationDate, queryRowIndex)
    }
}


// ===================================================( SUB QUERY ROW )===================================================\\
export class SubQueryRow extends QueryRow implements IQueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows);
        this.queryType = QueryType.SubQuery;
    }
    public subQueryRows: Array<IQueryRow>;
    private subQueries: Array<Query>;

    setQuery(queries: Array<Query>) {
        queries.push({ queryType: this.queryType, comparisonOperator: ComparisonOperatorType.Equal, logicalOperator: this.logicalOperator, subQueries: [] });
        this.subQueries = queries[queries.length - 1].subQueries;
    }

    getQueryRows(queryRows: Array<IQueryRow>) {
        // Loop through all the queryrows of this sub query
        queryRows.forEach(x => {

            // Allow each queryrow to update the queries array accordingly
            x.setQuery(this.subQueries);

            // If we come across a subquery queryrow
            if (x.queryType == QueryType.SubQuery) {

                // Call this method on the subquery queryrow that will loop through all of its queryrows
                x.getQueryRows(x.subQueryRows);
            }
        })
    }
}
import { KeyValue } from '@angular/common';
import { DataService } from 'services/data.service';
import { QueryDropdownList, QueryService } from '../services/query.service';
import { EditableItemListComponent } from '../shared-components/item-lists/editable-item-list/editable-item-list.component';
import { ItemListComponent } from '../shared-components/item-lists/item-list/item-list.component';
import { QueryBuilderComponent } from '../shared-components/properties/query-builder/query-builder.component';
import { ListItem } from './list-item';
import { MenuOption } from './menu-option';


export interface Query {
    queryType: QueryType;
    comparisonOperator: ComparisonOperatorType;
    logicalOperator: LogicalOperatorType;
    intValue?: number;
    stringValues?: Array<string>;
    doubleValue?: number;
    dateValue?: Date;
    subQueries?: Query;
}

export interface IQueryRow {
    queryType: QueryType;
    otherQueryType?: QueryType;
    hasOperators: boolean;
    comparisonOperator: ComparisonOperatorType;
    valueType: ValueType;
    doubleValue?: number;
    dateValue?: Date;
    stringValues?: string;
    dropdownValue?: any;
    whereDropdownSelectedIndex: number;
    dropdownList?: Array<KeyValue<any, any>>;
    valueDropdownSelectedIndex?: number;
    queryRowIndex?: number;
    queryDropdownList?: Array<QueryDropdownList>;
    itemType?: string;
    itemTypes?: string;
    subQueryRows?: Array<IQueryRow>;
    getQueryRows?(queryRows: Array<IQueryRow>): void;
    setQuery?(): void;
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
    ProductCreationDate,
    SubQuery
}


export enum ComparisonOperatorType {
    Equal,
    NotEqual,
    GreaterThan,
    GreaterThanOrEqual,
    LessThan,
    LessThanOrEqual,
}


export enum LogicalOperatorType {
    And,
    Or
}



export class QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public dataService: DataService,
        public queryService: QueryService) { }
    public queryType: QueryType;
    public comparisonOperator: ComparisonOperatorType = ComparisonOperatorType.Equal;
    public logicalOperator: LogicalOperatorType = LogicalOperatorType.And;
    public hasOperators: boolean;
    public valueType: ValueType;

    onDelete(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
    }
}

export class QueryRowDropdownBase extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows, dataService, queryService);
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

    setQuery() {
        if (this.valueDropdownSelectedIndex != 0) {
            this.queryBuilder.queries.push({ queryType: this.queryType, comparisonOperator: ComparisonOperatorType.Equal, logicalOperator: this.logicalOperator, intValue: this.dropdownValue });
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

    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
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
        super.updateValue(newValue);

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
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows, dataService, queryService)
        this.hasOperators = true;
    }

    updateOperator(comparisonOperator: ComparisonOperatorType) {
        this.comparisonOperator = comparisonOperator;
    }

    setQuery() {
        if (this.valueDropdownSelectedIndex != 0) {
            this.queryBuilder.queries.push({ queryType: this.queryType, comparisonOperator: this.comparisonOperator, logicalOperator: this.logicalOperator, doubleValue: this.dropdownValue });
        }
    }
}



export class QueryRowPrice extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows, dataService, queryService)
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
    }

    updateDecimalValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(decimalInputText.value) ? decimalInputText.value = decimalInputText.value.replace(/[^0123456789]/ig, '') : null;

        // Update the decimal value
        this.doubleValue = this.getPrice(wholeNumberInputText, decimalInputText);
    }

    updateOperator(comparisonOperator: ComparisonOperatorType) {
        this.comparisonOperator = comparisonOperator;
    }

    onDecimalInputBlur(decimalInputText: HTMLInputElement) {
        let intValue = parseInt(decimalInputText.value);

        if (intValue < 10 && decimalInputText.value.length == 1) {
            decimalInputText.value = intValue + "0";
        }
    }

    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
    }
}


export class QueryRowItemList extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows, dataService, queryService)
        this.hasOperators = false;
        this.valueType = ValueType.ItemList;
    }
    public stringValues: string;
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

    onListItemDelete() {
        this.itemList.deleteListItem();
        this.stringValues = this.listItems.map(x => x.name).toString();
    }

    openPopup(sourceElement: HTMLElement) {
        console.log("open Popup")
    }

    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
    }
}


export class QueryRowEditableItemList extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows, dataService, queryService)
        this.hasOperators = false;
        this.valueType = ValueType.EditableItemList;
    }
    public stringValues: string;
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

    onListItemAdd() {
        this.editableItemList.onListItemAdd();
        if (this.editableItemList.listItems[0].name.length > 0) {
            this.stringValues = this.editableListItems.map(x => x.name).toString();
        }
    }

    onListItemEdit() {
        this.editableItemList.onListItemEdit();
        this.stringValues = this.editableListItems.map(x => x.name).toString();
    }

    onListItemDelete() {
        this.editableItemList.deleteListItem();
        this.stringValues = this.editableListItems.map(x => x.name).toString();
    }

    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
    }
}



export class QueryRowDate extends QueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows, dataService, queryService)
        this.hasOperators = true;
        this.valueType = ValueType.Date;
    }
    public dateValue: Date;

    initialize(queryType: QueryType, queryRowIndex: number) {
        this.queryRows[queryRowIndex].queryType = queryType;
        this.queryRows[queryRowIndex].queryRowIndex = queryRowIndex;
    }

    updateOperator(comparisonOperator: ComparisonOperatorType) {
        this.comparisonOperator = comparisonOperator;
    }

    updateValue(inputText: HTMLInputElement) {
        this.dateValue = new Date(inputText.value);
    }

    onDelete(queryRowIndex: number) {
        // Delete the queryrow
        super.onDelete(queryRowIndex);
    }
}








// ===================================================( QUERY ROW NONE )===================================================\\
export class QueryRowNone extends QueryRow implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new none queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new QueryRowNone(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));
    }
}


// ===================================================( CATEGORY QUERY ROW )===================================================\\
export class CategoryQueryRow extends QueryRowParentDropdown implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new category queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CategoryQueryRow(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));

        // Initialize the new category queryrow
        this.initialize(QueryType.Category, QueryType.Niche, queryRowIndex, this.queryService.categories);
    }
}

// ===================================================( NICHE QUERY ROW )===================================================\\
export class NicheQueryRow extends QueryRowChildDropdown implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new niche queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new NicheQueryRow(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));

        // Initialize the new niche queryrow
        this.initialize(QueryType.Category, QueryType.Niche, queryRowIndex, this.queryService.categories);
    }
}


// ===================================================( PRODUCT SUBGROUP QUERY ROW )===================================================\\
export class ProductSubgroupQueryRow extends QueryRowDropdown {
    newQueryRow(queryRowIndex: number) {
        // Create the new subgroup queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductSubgroupQueryRow(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));

        // Initialize the new subgroup queryrow
        this.initialize(QueryType.ProductSubgroup, queryRowIndex, this.queryService.subgroups);
    }
}


// ===================================================( FEATURED PRODUCTS QUERY ROW )===================================================\\
export class FeaturedProductsQueryRow extends QueryRowItemList implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new featured products queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new FeaturedProductsQueryRow(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));

        // Initialize the new featured products queryrow
        this.initialize(QueryType.FeaturedProducts, queryRowIndex, "Product", "Products")
    }
}


// ===================================================( CUSTOMER RELATED PRODUCTS QUERY ROW )===================================================\\
export class CustomerRelatedProductsQueryRow extends QueryRowDropdown {
    newQueryRow(queryRowIndex: number) {
        // Create the new customer related products queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CustomerRelatedProductsQueryRow(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));

        // Initialize the new customer related products queryrow
        this.initialize(QueryType.CustomerRelatedProducts, queryRowIndex, this.queryService.customerRelatedProducts);
    }
}

// ===================================================( PRODUCT PRICE QUERY ROW )===================================================\\
export class ProductPriceQueryRow extends QueryRowPrice implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new product price queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductPriceQueryRow(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));

        // Initialize the new product price queryrow
        this.initialize(QueryType.ProductPrice, queryRowIndex)
    }
}


// ===================================================( PRODUCT RATING QUERY ROW )===================================================\\
export class ProductRatingQueryRow extends QueryRowDropdownWithOperator implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new product rating queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductRatingQueryRow(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));

        // Initialize the new product rating queryrow
        this.initialize(QueryType.ProductRating, queryRowIndex, this.queryService.productRating);
    }
}


// ===================================================( PRODUCT KEYWORDS QUERY ROW )===================================================\\
export class ProductKeywordsQueryRow extends QueryRowEditableItemList implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new keywords queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductKeywordsQueryRow(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));

        // Initialize the new keywords queryrow
        this.initialize(QueryType.ProductKeywords, queryRowIndex, "Keyword", "Keywords")
    }
}


// ===================================================( PRODUCT CREATION DATE QUERY ROW )===================================================\\
export class ProductCreationDateQueryRow extends QueryRowDate implements IQueryRow {
    newQueryRow(queryRowIndex: number) {
        // Create the new product creation date queryrow
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductCreationDateQueryRow(this.whereDropdownSelectedIndex, this.queryBuilder, this.queryRows, this.dataService, this.queryService));

        // Initialize the new product creation date queryrow
        this.initialize(QueryType.ProductCreationDate, queryRowIndex)
    }
}


// ===================================================( SUB QUERY ROW )===================================================\\
export class SubQueryRow extends QueryRow implements IQueryRow {
    constructor(
        public whereDropdownSelectedIndex: number,
        public queryBuilder: QueryBuilderComponent,
        public queryRows: Array<IQueryRow>,
        public dataService: DataService,
        public queryService: QueryService) {
        super(whereDropdownSelectedIndex, queryBuilder, queryRows, dataService, queryService);
        this.queryType = QueryType.SubQuery;
    }
    public subQueryRows: Array<IQueryRow>;


    getQueryRows(queryRows: Array<IQueryRow>) {
        queryRows.forEach(x => {

            x.setQuery();

            if (x.queryType == QueryType.SubQuery) {
                x.getQueryRows(x.subQueryRows);
            }
        })
    }
}
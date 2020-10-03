import { KeyValue } from '@angular/common';
import { EditableItemListComponent } from '../shared-components/item-lists/editable-item-list/editable-item-list.component';
import { ItemListComponent } from '../shared-components/item-lists/item-list/item-list.component';
import { Category } from './category';
import { ListItem } from './list-item';
import { MenuOption } from './menu-option';

export interface QueryRow {
    whereType: WhereType;
    hasOperators: boolean;
    operatorType: OperatorType;
    valueType: ValueType;
    value: string;
    selectedIndex: number
}

export interface Query {
    where: WhereType;
    operator: OperatorType;
    value: string;
}

export enum ValueType {
    Dropdown,
    Text,
    EditableItemList,
    ItemList,
    Date
}



export enum WhereType {
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
    constructor(private queryRows: Array<QueryRow>) { }
    whereType = null;
    hasOperators = null;
    operatorType = null;
    valueType = null;
    value = null;
    selectedIndex = 0;

    updateQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new QueryRowNone(this.queryRows));
    }
}


// ===================================================( CATEGORY QUERY ROW )===================================================\\
export class CategoryQueryRow implements QueryRow {
    constructor(private queryRows: Array<QueryRow>, private categories: Array<Category>) { }
    whereType = WhereType.Category;
    hasOperators = false;
    operatorType = OperatorType.Equals;
    valueType = ValueType.Dropdown;
    value = this.getList()[0].value.toString();
    selectedIndex = 1;

    getList() {
        let categoryList: Array<KeyValue<any, any>> = this.categories.map(x => ({
            key: x.name,
            value: x.id
        }))
        return categoryList;
    }

    updateQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CategoryQueryRow(this.queryRows, this.categories));
    }

    updateValue(newValue: number) {
        this.value = newValue.toString();
    }
}


// ===================================================( NICHE QUERY ROW )===================================================\\
export class NicheQueryRow implements QueryRow {
    constructor(private queryRows: Array<QueryRow>) { }
    whereType = WhereType.Niche;
    hasOperators = false;
    operatorType = OperatorType.Equals;
    valueType = ValueType.Dropdown;
    value = this.getList()[0].value.toString();
    selectedIndex = 2;

    getList() {
        let nicheList: Array<KeyValue<any, any>> = [
            { key: "Niche1", value: 1 },
            { key: "Niche2", value: 2 },
            { key: "Niche3", value: 3 },
            { key: "Niche4", value: 4 },
            { key: "Niche5", value: 5 },
            { key: "Niche6", value: 6 }
        ];
        return nicheList;
    }

    updateQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new NicheQueryRow(this.queryRows));
    }

    updateValue(newValue: number) {
        this.value = newValue.toString();
    }
}




// ===================================================( PRODUCT SUBGROUP QUERY ROW )===================================================\\
export class ProductSubgroupQueryRow implements QueryRow {
    constructor(private queryRows: Array<QueryRow>) { }
    whereType = WhereType.ProductSubgroup;
    hasOperators = false;
    operatorType = OperatorType.Equals;
    valueType = ValueType.Dropdown;
    value = this.getList()[0].value.toString();
    selectedIndex = 3;

    getList() {
        let subgroupList: Array<KeyValue<any, any>> = [
            { key: "Subgroup1", value: 1 },
            { key: "Subgroup2", value: 2 },
            { key: "Subgroup3", value: 3 },
            { key: "Subgroup4", value: 4 },
            { key: "Subgroup5", value: 5 },
            { key: "Subgroup6", value: 6 }
        ];
        return subgroupList;
    }

    updateQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductSubgroupQueryRow(this.queryRows));
    }

    updateValue(newValue: number) {
        this.value = newValue.toString();
    }
}



// ===================================================( FEATURED PRODUCTS QUERY ROW )===================================================\\
export class FeaturedProductsQueryRow implements QueryRow {
    constructor(private queryRows: Array<QueryRow>) { }
    whereType = WhereType.FeaturedProducts;
    hasOperators = false;
    operatorType = OperatorType.Equals;
    valueType = ValueType.ItemList;
    value = "";
    selectedIndex = 4;
    itemList: ItemListComponent;
    listItems: Array<ListItem> = [];

    updateQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new FeaturedProductsQueryRow(this.queryRows));
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
        }
    }


    onListItemDelete() {
        this.itemList.deleteListItem();
        this.value = this.listItems.map(x => x.name).toString();
    }


    openPopup(sourceElement: HTMLElement) {
        console.log("open Popup")
    }
}




// ===================================================( CUSTOMER RELATED PRODUCTS QUERY ROW )===================================================\\
export class CustomerRelatedProductsQueryRow implements QueryRow {
    constructor(private queryRows: Array<QueryRow>) { }
    whereType = WhereType.CustomerRelatedProducts;
    hasOperators = false;
    operatorType = OperatorType.Equals;
    valueType = ValueType.Dropdown;
    value = this.getList()[0].value.toString();
    selectedIndex = 5;

    getList() {
        let relatedList: Array<KeyValue<any, any>> = [
            { key: "List Products", value: "List Products" },
            { key: "Purchased Products", value: "Purchased Products" },
            { key: "Browsed Products", value: "Browsed Products" }
        ];
        return relatedList;
    }

    updateQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new CustomerRelatedProductsQueryRow(this.queryRows));
    }

    updateValue(newValue: string) {
        this.value = newValue;
    }
}



// ===================================================( PRODUCT PRICE QUERY ROW )===================================================\\
export class ProductPriceQueryRow implements QueryRow {
    constructor(private queryRows: Array<QueryRow>) { }
    whereType = WhereType.ProductPrice;
    hasOperators = true;
    operatorType = OperatorType.Equals;
    valueType = ValueType.Text;
    value = "";
    selectedIndex = 6;

    updateQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductPriceQueryRow(this.queryRows));
    }

    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
    }

    updateWholeNumberValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(wholeNumberInputText.value) ? wholeNumberInputText.value = wholeNumberInputText.value.replace(/[^0123456789]/ig, '') : null;
        this.value = (wholeNumberInputText.value.length == 0 ? 0 : wholeNumberInputText.value) + "." + (decimalInputText.value.length == 0 ? "00" : decimalInputText.value);
    }

    updateDecimalValue(wholeNumberInputText: HTMLInputElement, decimalInputText: HTMLInputElement) {
        !(/^[0123456789]*$/i).test(decimalInputText.value) ? decimalInputText.value = decimalInputText.value.replace(/[^0123456789]/ig, '') : null;
        let intValue = parseInt(decimalInputText.value);
        this.value = wholeNumberInputText.value + "." + (intValue < 10 && decimalInputText.value.length == 1 ? "0" + decimalInputText.value : decimalInputText.value.length == 0 ? "00" : decimalInputText.value);
    }

    onDecimalInputBlur(decimalInputText: HTMLInputElement) {
        let intValue = parseInt(decimalInputText.value);

        if (intValue < 10) {
            decimalInputText.value = "0" + intValue;
        }
    }
}


// ===================================================( PRODUCT RATING QUERY ROW )===================================================\\
export class ProductRatingQueryRow implements QueryRow {
    constructor(private queryRows: Array<QueryRow>) { }
    whereType = WhereType.ProductRating;
    hasOperators = true;
    operatorType = OperatorType.Equals;
    valueType = ValueType.Dropdown;
    value = this.getList()[0].value.toString();
    selectedIndex = 7;

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
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductRatingQueryRow(this.queryRows));
    }


    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
    }

    updateValue(newValue: string) {
        this.value = newValue;
    }
}




// ===================================================( PRODUCT KEYWORDS QUERY ROW )===================================================\\
export class ProductKeywordsQueryRow implements QueryRow {
    constructor(private queryRows: Array<QueryRow>) { }
    whereType = WhereType.ProductKeywords;
    hasOperators = false;
    operatorType = OperatorType.Equals;
    valueType = ValueType.EditableItemList;
    value = "";
    selectedIndex = 8;
    editableItemList: EditableItemListComponent;
    editableListItems: Array<ListItem> = [];


    updateQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductKeywordsQueryRow(this.queryRows));
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
        }
    }


    onListItemEdit() {
        this.editableItemList.onListItemEdit();
        this.value = this.editableListItems.map(x => x.name).toString();
    }


    onListItemDelete() {
        this.editableItemList.deleteListItem();
        this.value = this.editableListItems.map(x => x.name).toString();
    }
}




// ===================================================( PRODUCT CREATION DATE QUERY ROW )===================================================\\
export class ProductCreationDateQueryRow implements QueryRow {
    constructor(private queryRows: Array<QueryRow>) { }
    whereType = WhereType.ProductCreationDate;
    hasOperators = true;
    operatorType = OperatorType.Equals;
    valueType = ValueType.Date;
    value = "";
    selectedIndex = 9;

    updateQueryRow(queryRowIndex: number) {
        this.queryRows.splice(queryRowIndex, 1);
        this.queryRows.splice(queryRowIndex, 0, new ProductCreationDateQueryRow(this.queryRows));
    }

    updateOperator(operatorType: OperatorType) {
        this.operatorType = operatorType;
    }

    updateValue(inputText: HTMLInputElement) {
        this.value = inputText.value;
    }
}
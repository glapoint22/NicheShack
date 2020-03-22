export class ProductContent {
    items: Array<any> = [];
    selectedItemTypeIndex: number;
    pricePoints: Array<any> = [];
    selectedPricePointIndex: number;
    lastFocusedPricePoint: HTMLTableElement;
    lastFocusedItemType: HTMLTableElement;
}
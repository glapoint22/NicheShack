export class HierarchyItem {
    public showChildren: boolean;
    public loadingChildren: boolean;
    public children: Array<HierarchyItem> = [];
    public parent: HierarchyItem;

    constructor(public id: string = null, public name: string = null, public type: HierarchyItemType = null) { }
}


export enum HierarchyItemType {
    Category,
    Niche,
    Product
}
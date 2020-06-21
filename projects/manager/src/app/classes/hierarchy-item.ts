import { Item } from './item';

export interface HierarchyItem extends Item {
    showChildren: boolean;
    loading: boolean;
    children: Array<HierarchyItem>;
    parent: HierarchyItem;
    type: number;
    childless: boolean;
    url: string;
    childrenUrl: string;
}


export enum NicheShackHierarchyItemType {
    Category,
    Niche,
    Product
}

export enum FilterHierarchyItemType {
    Filter,
    FilterOption
}
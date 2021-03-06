import { Item } from './item';
import { KeyValue } from '@angular/common';

export interface HierarchyItem extends Item {
    showChildren: boolean;
    children: Array<HierarchyItem>;
    parent: HierarchyItem;
    type: number;
    childless: boolean;
    url: string;
    childrenUrl: string;
    childrenParameters: Array<KeyValue<string, any>>;
    hierarchyId: string;
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

export enum KeywordHierarchyItemType {
    KeywordGroup,
    Keyword
}
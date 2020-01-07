export class HierarchyItem {
    id: any;
    name: string;
    type: string;
    showChildren: boolean;
    loadingChildren: boolean;
    children: Array<HierarchyItem>;
    parent: HierarchyItem;
}
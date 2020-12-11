import { RowData } from './row-data';
import { PageDataBase } from 'classes/page-data-base';
import { PageDisplayType } from './page-display-type';
import { Item } from './item';
import { ListItem } from './list-item';

export interface PageData extends PageDataBase {
    id: number;
    name: string;
    displayType: PageDisplayType;
    displayItems: Array<ListItem>;
    rows: Array<RowData>;
}
import { RowData } from './row-data';
import { PageDataBase } from 'classes/page-data-base';
import { PageDisplayType } from './page-display-type';
import { ListItem } from './list-item';

export interface PageData extends PageDataBase {
    id: number;
    name: string;
    displayType: PageDisplayType;
    referenceItems: Array<ListItem>;
    rows: Array<RowData>;
}
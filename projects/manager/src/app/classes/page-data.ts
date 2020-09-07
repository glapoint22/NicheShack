import { RowData } from './row-data';
import { PageDataBase } from 'classes/page-data-base';

export interface PageData extends PageDataBase {
    id: number;
    name: string;
    rows: Array<RowData>;
}
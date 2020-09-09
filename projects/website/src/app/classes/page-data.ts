import { PageDataBase } from 'classes/page-data-base';
import { RowData } from './row-data';

export interface PageData extends PageDataBase {
    rows: Array<RowData>;
}
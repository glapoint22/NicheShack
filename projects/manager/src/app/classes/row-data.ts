import { RowDataBase } from 'classes/row-data-base';
import { ColumnData } from './column-data';

export interface RowData extends RowDataBase {
    name: string;
    columns: Array<ColumnData>;
}
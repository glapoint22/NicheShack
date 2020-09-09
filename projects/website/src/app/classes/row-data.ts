import { RowDataBase } from 'classes/row-data-base';
import { ColumnData } from './column-data';

export interface RowData extends RowDataBase {
    columns: Array<ColumnData>;
}
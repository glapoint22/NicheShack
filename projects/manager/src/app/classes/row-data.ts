import { BreakpointData } from './breakpoint-data';
import { RowDataBase } from 'classes/row-data-base';

export interface RowData extends RowDataBase {
    name: string;
    breakpoints: Array<BreakpointData>;
}
import { BreakpointData } from './breakpoint-data';
import { ColumnDataBase } from 'classes/column-data-base';
import { WidgetData } from './widget-data';

export interface ColumnData extends ColumnDataBase {
    name: string;
    breakpoints: Array<BreakpointData>;
    widgetData: WidgetData;
}
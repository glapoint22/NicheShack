import { BreakpointData } from './breakpoint-data';
import { WidgetDataBase } from 'classes/widget-data-base';

export interface WidgetData extends WidgetDataBase {
    name: string;
    breakpoints: Array<BreakpointData>;
}
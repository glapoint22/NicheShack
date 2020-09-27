import { WidgetType } from './widget-type';
import { BreakpointData } from './breakpoint-data';

export interface WidgetDataBase {
    widgetType: WidgetType;
    width: number;
    height: number;
    horizontalAlignment: string;
    breakpoints: Array<BreakpointData>;
}
import { WidgetType } from './widget-type';
import { BreakpointData } from './breakpoint-data';

export interface WidgetDataBase {
    width: number;
    height: number;
    widgetType: WidgetType;
    horizontalAlignment: string;
    breakpoints: Array<BreakpointData>;
}
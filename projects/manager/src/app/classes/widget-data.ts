import { WidgetType } from './widget-type';
import { BreakpointData } from './breakpoint-data';

export interface WidgetData {
    name: string;
    width: number;
    height: number;
    breakpoints: Array<BreakpointData>;
    widgetType: WidgetType;
    horizontalAlignment: string;
}
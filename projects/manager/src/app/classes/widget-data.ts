import { WidgetType } from './widget-type';
import { BreakpointData } from './breakpoint-data';

export class WidgetData {
    public name: string;
    public width: number;
    public height: number;
    public breakpoints: Array<BreakpointData>;
    public widgetType: WidgetType;
    public horizontalAlignment: string;
}
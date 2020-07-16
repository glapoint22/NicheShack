import { BreakpointHorizontalAlignment, BreakpointType } from './breakpoint';
import { BreakpointObject } from './breakpoint-object';
import { Alignment } from './alignment';
import { WidgetData } from './widget-data';

export class HorizontalAlignment extends Alignment implements BreakpointObject {
    public value: BreakpointHorizontalAlignment = BreakpointHorizontalAlignment.Left;
    public defaultValue: string = BreakpointHorizontalAlignment.Left;
    public breakpointSet: boolean;
    public breakpointType: BreakpointType = BreakpointType.HorizontalAlignment;

    setClass(value: string, element: HTMLElement, screenSize?: string) {
        switch (value) {
            case BreakpointHorizontalAlignment.Left:
                this.applyClass(element, screenSize, 'horizontal-align-left');
                break;

            case BreakpointHorizontalAlignment.Center:
                this.applyClass(element, screenSize, 'horizontal-align-center');
                break;

            case BreakpointHorizontalAlignment.Right:
                this.applyClass(element, screenSize, 'horizontal-align-right');
                break;
        }
    }

    setData(value: string) {
        if (value) {
            this.value = value as BreakpointHorizontalAlignment;
        }
    }

    getData(widgetData: WidgetData) {
        if (this.value != this.defaultValue) widgetData.horizontalAlignment = this.value;
    }
}
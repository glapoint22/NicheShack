import { BreakpointObject } from './breakpoint-object';
import { Alignment } from './alignment';
import { HorizontalAlign } from 'classes/horizontal-align';
import { BreakpointType, Breakpoint } from './breakpoint';

export class HorizontalAlignment extends Alignment implements BreakpointObject {
    public value: HorizontalAlign = HorizontalAlign.Left;
    public defaultValue: string = HorizontalAlign.Left;
    public breakpointSet: boolean;
    public breakpointType: BreakpointType = BreakpointType.HorizontalAlignment;

    setClass(value: string, element: HTMLElement, screenSize?: string) {
        switch (value) {
            case HorizontalAlign.Left:
                this.applyClass(element, screenSize, 'horizontal-align-left');
                break;

            case HorizontalAlign.Center:
                this.applyClass(element, screenSize, 'horizontal-align-center');
                break;

            case HorizontalAlign.Right:
                this.applyClass(element, screenSize, 'horizontal-align-right');
                break;
        }
    }

    setData(value: string) {
        if (value) {
            this.value = value as HorizontalAlign;
        }
    }

    getData(breakpoints: Array<Breakpoint>): HorizontalAlign {
        let horizontalAlignment: HorizontalAlign;

        if (!breakpoints.some(x => x.breakpointObject == this) && this.value != this.defaultValue) {
            horizontalAlignment = this.value;
        }

        return horizontalAlignment;
    }
}
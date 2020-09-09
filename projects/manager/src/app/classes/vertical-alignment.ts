import { Breakpoint } from './breakpoint';
import { BreakpointObject } from './breakpoint-object';
import { Alignment } from './alignment';
import { VerticalAlign } from 'classes/vertical-align';
import { BreakpointType } from 'classes/breakpoint-type';

export class VerticalAlignment extends Alignment implements BreakpointObject {
    public value: VerticalAlign = VerticalAlign.Top;
    public defaultValue: VerticalAlign = VerticalAlign.Top;
    public breakpointSet: boolean;
    public breakpointType: BreakpointType = BreakpointType.VerticalAlignment;

    setClass(value: string, element: HTMLElement, screenSize?: string) {
        switch (value) {
            case VerticalAlign.Top:
                this.applyClass(element, screenSize, 'vertical-align-top');
                break;

            case VerticalAlign.Middle:
                this.applyClass(element, screenSize, 'vertical-align-middle');
                break;

            case VerticalAlign.Bottom:
                this.applyClass(element, screenSize, 'vertical-align-bottom');
                break;
        }
    }

    setData(value: string) {
        if (value) {
            this.value = value as VerticalAlign;
        }
    }


    getData(breakpoints: Array<Breakpoint>): VerticalAlign {
        let verticalAlignment: VerticalAlign;

        if (!breakpoints.some(x => x.breakpointObject == this) && this.value != this.defaultValue) {
            verticalAlignment = this.value;
        }

        return verticalAlignment;
    }
}
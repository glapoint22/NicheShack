import { BreakpointVerticalAlignment } from './breakpoint';
import { BreakpointObject } from './breakpoint-object';
import { Alignment } from './alignment';

export class VerticalAlignment extends Alignment implements BreakpointObject {
    public value: BreakpointVerticalAlignment = BreakpointVerticalAlignment.Top;
    public defaultValue: BreakpointVerticalAlignment = BreakpointVerticalAlignment.Top;
    public breakpointSet: boolean;

    setClass(value: string, element: HTMLElement, screenSize?: string) {
        switch (value) {
            case BreakpointVerticalAlignment.Top:
                this.applyClass(element, screenSize, 'vertical-align-top');
                break;

            case BreakpointVerticalAlignment.Middle:
                this.applyClass(element, screenSize, 'vertical-align-middle');
                break;

            case BreakpointVerticalAlignment.Bottom:
                this.applyClass(element, screenSize, 'vertical-align-bottom');
                break;
        }
    }

    load(value: string) {
        let key = Object.keys(BreakpointVerticalAlignment)[Object.values(BreakpointVerticalAlignment).findIndex(x => x == value)];
        this.value = BreakpointVerticalAlignment[key];
    }
}
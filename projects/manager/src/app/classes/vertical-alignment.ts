import { BreakpointVerticalAlignment } from './breakpoint';
import { BreakpointType } from './breakpoint-type';
import { Alignment } from './alignment';

export class VerticalAlignment extends Alignment implements BreakpointType{
    public value: string = BreakpointVerticalAlignment.Top;
    public defaultValue: string = BreakpointVerticalAlignment.Top;

    setClass(element: HTMLElement, screenSize?: string) {
        switch (this.value) {
            case BreakpointVerticalAlignment.Top:
                this.applyClass(element, screenSize, 'vertical-align-top');
                break;

            case BreakpointVerticalAlignment.Middle:
                this.applyClass(element, screenSize, 'vertical-align-center');
                break;

            case BreakpointVerticalAlignment.Bottom:
                this.applyClass(element, screenSize, 'vertical-align-bottom');
                break;
        }
    }
}
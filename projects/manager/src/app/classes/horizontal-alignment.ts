import { BreakpointHorizontalAlignment } from './breakpoint';
import { BreakpointObject } from './breakpoint-object';
import { Alignment } from './alignment';

export class HorizontalAlignment extends Alignment implements BreakpointObject {
    public value: string = BreakpointHorizontalAlignment.Left;
    public defaultValue: string = BreakpointHorizontalAlignment.Left;
    public breakpointSet: boolean;

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
}
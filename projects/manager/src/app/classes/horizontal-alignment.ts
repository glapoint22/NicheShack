import { BreakpointHorizontalAlignment } from './breakpoint';
import { BreakpointType } from './breakpoint-type';
import { Alignment } from './alignment';

export class HorizontalAlignment extends Alignment implements BreakpointType {
    public value: string = BreakpointHorizontalAlignment.Left;
    public defaultValue: string = BreakpointHorizontalAlignment.Left;

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
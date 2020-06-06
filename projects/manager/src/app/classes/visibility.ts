import { BreakpointObject } from './breakpoint-object';
import { BreakpointVisibility, BreakpointType } from './breakpoint';

export class Visibility implements BreakpointObject {
    public value: string = BreakpointVisibility.Visible;
    public defaultValue: string = BreakpointVisibility.Visible;
    public breakpointSet: boolean;
    public breakpointType: BreakpointType = BreakpointType.Visibility;

    setClass(value:string, element: HTMLElement, screenSize?: string) {
        let className: string;

        if (value == BreakpointVisibility.Visible) {
            className = 'show';
        } else {
            className = 'hide';
        }

        element.classList.add(className + (screenSize ? '-' + screenSize : ''));
    }
}
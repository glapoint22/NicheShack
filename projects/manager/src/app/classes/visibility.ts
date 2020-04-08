import { BreakpointType } from './breakpoint-type';
import { BreakpointVisibility } from './breakpoint';

export class Visibility implements BreakpointType {
    public value: string = BreakpointVisibility.Visible;
    public defaultValue: string = BreakpointVisibility.Visible;

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
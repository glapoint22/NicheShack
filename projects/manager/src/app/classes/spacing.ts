import { BreakpointObject } from './breakpoint-object';
import { BreakpointSpacing } from './breakpoint';

export class Spacing implements BreakpointObject {
    public value: string = BreakpointSpacing._0px;
    public defaultValue: string = BreakpointSpacing._0px;
    public position: string;
    public breakpointSet: boolean;

    constructor(public element?: HTMLElement) { }


    setClass(value: string, element: HTMLElement, screenSize?: string) {
        let className = 'padding-' + this.position + '-' + value.substr(0, value.length - 2);

        element.classList.add(className + (screenSize ? '-' + screenSize : ''));
    }
}
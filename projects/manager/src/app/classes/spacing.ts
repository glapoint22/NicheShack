import { BreakpointType } from './breakpoint-type';
import { BreakpointSpacing } from './breakpoint';

export class Spacing implements BreakpointType {
    public value: string = BreakpointSpacing._0px;
    public defaultValue: string = BreakpointSpacing._0px;
    public position: string;

    constructor(public element?: HTMLElement) { }


    setClass(value: string, element: HTMLElement, screenSize?: string) {
        let className = 'padding-' + this.position + '-' + value.substr(0, this.value.length - 2);

        element.classList.add(className + (screenSize ? '-' + screenSize : ''));
    }
}
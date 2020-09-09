import { BreakpointType } from 'classes/breakpoint-type';

export interface BreakpointObject {
    value: any;
    defaultValue: any;
    breakpointSet: boolean;
    breakpointType: BreakpointType;

    setClass(value: any, element: HTMLElement, screenSize?: string): void;
}
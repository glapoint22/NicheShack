export interface BreakpointObject {
    value: any;
    defaultValue: any;
    breakpointSet: boolean;

    setClass(value: any, element: HTMLElement, screenSize?: string): void;
}
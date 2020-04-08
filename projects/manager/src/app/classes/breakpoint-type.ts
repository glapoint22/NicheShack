export interface BreakpointType {
    value: any;
    defaultValue: any;

    setClass(element: HTMLElement, screenSize?: string);
}
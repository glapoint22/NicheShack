export interface BreakpointType {
    value: any;
    defaultValue: any;
    breakpointSet: boolean;

    setClass(value: any, element: HTMLElement, screenSize?: string): void;
}
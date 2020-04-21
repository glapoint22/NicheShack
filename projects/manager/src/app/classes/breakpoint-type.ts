export interface BreakpointType {
    value: any;
    defaultValue: any;

    setClass(value: any, element: HTMLElement, screenSize?: string): void;
}
import { BreakpointType } from 'classes/breakpoint-type';

export interface BreakpointData {
    breakpointType: BreakpointType;
    screenSize: string;
    value: any;
}
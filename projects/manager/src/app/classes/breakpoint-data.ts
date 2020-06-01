import { BreakpointType } from './breakpoint';

export interface BreakpointData {
    breakpointType: BreakpointType;
    screenSize: string;
    value: any;
}
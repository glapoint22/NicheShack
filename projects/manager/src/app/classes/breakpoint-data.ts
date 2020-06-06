import { BreakpointType } from './breakpoint';

export class BreakpointData {
    constructor(public breakpointType: BreakpointType, public screenSize: string, public value: any) { }
}
import { Spacing } from './spacing';
import { BreakpointObject } from './breakpoint-object';
import { BreakpointType } from './breakpoint';

export class PaddingTop extends Spacing implements BreakpointObject {
    public breakpointType: BreakpointType = BreakpointType.PaddingTop;

    constructor() {
        super();
        this.position = 'Top';
    }
}
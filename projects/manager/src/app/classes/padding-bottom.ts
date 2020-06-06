import { Spacing } from './spacing';
import { BreakpointObject } from './breakpoint-object';
import { BreakpointType } from './breakpoint';

export class PaddingBottom extends Spacing implements BreakpointObject {
    public breakpointType: BreakpointType = BreakpointType.PaddingBottom;

    constructor() {
        super();
        this.position = 'Bottom';
    }
}
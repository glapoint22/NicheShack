import { Spacing } from './spacing';
import { BreakpointType } from './breakpoint';
import { BreakpointObject } from './breakpoint-object';

export class PaddingRight extends Spacing implements BreakpointObject {
    public breakpointType: BreakpointType = BreakpointType.PaddingRight;

    constructor() {
        super();
        this.position = 'Right';
    }
}
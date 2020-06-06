import { Spacing } from './spacing';
import { BreakpointObject } from './breakpoint-object';
import { BreakpointType } from './breakpoint';

export class PaddingLeft extends Spacing implements BreakpointObject {
    public breakpointType: BreakpointType = BreakpointType.PaddingLeft;

    constructor() {
        super();
        this.position = 'Left';
    }
}
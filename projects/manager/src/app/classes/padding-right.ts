import { Spacing } from './spacing';
import { BreakpointObject } from './breakpoint-object';
import { BreakpointType } from 'classes/breakpoint-type';

export class PaddingRight extends Spacing implements BreakpointObject {
    public breakpointType: BreakpointType = BreakpointType.PaddingRight;

    constructor() {
        super();
        this.position = 'Right';
    }
}
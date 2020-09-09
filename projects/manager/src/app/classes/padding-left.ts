import { Spacing } from './spacing';
import { BreakpointObject } from './breakpoint-object';
import { BreakpointType } from 'classes/breakpoint-type';

export class PaddingLeft extends Spacing implements BreakpointObject {
    public breakpointType: BreakpointType = BreakpointType.PaddingLeft;

    constructor() {
        super();
        this.position = 'Left';
    }
}
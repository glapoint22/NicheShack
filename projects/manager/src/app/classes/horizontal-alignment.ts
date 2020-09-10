import { BreakpointObject } from './breakpoint-object';
import { HorizontalAlign } from 'classes/horizontal-align';
import { Breakpoint } from './breakpoint';
import { HorizontalAlignmentBase } from 'classes/horizontal-alignment-base';

export class HorizontalAlignment extends HorizontalAlignmentBase implements BreakpointObject {
    public value: HorizontalAlign = HorizontalAlign.Left;
    public defaultValue: string = HorizontalAlign.Left;
    public breakpointSet: boolean;

    setData(value: string) {
        if (value) {
            this.value = value as HorizontalAlign;
        }
    }

    getData(breakpoints: Array<Breakpoint>): HorizontalAlign {
        let horizontalAlignment: HorizontalAlign;

        if (!breakpoints.some(x => x.breakpointObject == this) && this.value != this.defaultValue) {
            horizontalAlignment = this.value;
        }

        return horizontalAlignment;
    }
}
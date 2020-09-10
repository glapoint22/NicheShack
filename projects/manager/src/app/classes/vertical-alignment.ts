import { Breakpoint } from './breakpoint';
import { BreakpointObject } from './breakpoint-object';
import { VerticalAlign } from 'classes/vertical-align';
import { VerticalAlignmentBase } from 'classes/vertical-alignment-base';

export class VerticalAlignment extends VerticalAlignmentBase implements BreakpointObject {
    public value: VerticalAlign = VerticalAlign.Top;
    public defaultValue: VerticalAlign = VerticalAlign.Top;
    public breakpointSet: boolean;

    setData(value: string) {
        if (value) {
            this.value = value as VerticalAlign;
        }
    }


    getData(breakpoints: Array<Breakpoint>): VerticalAlign {
        let verticalAlignment: VerticalAlign;

        if (!breakpoints.some(x => x.breakpointObject == this) && this.value != this.defaultValue) {
            verticalAlignment = this.value;
        }

        return verticalAlignment;
    }
}
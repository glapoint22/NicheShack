import { PaddingData } from '../../../../../classes/padding-data';
import { BreakpointSpacing, Breakpoint } from './breakpoint';
import { PaddingBase } from 'classes/padding-base';
import { Spacing } from './spacing';

export class Padding extends PaddingBase {
    public constrain: boolean = true;
    public top: Spacing = new Spacing();
    public right: Spacing = new Spacing();
    public bottom: Spacing = new Spacing();
    public left: Spacing = new Spacing();


    setData(paddingData: PaddingData) {
        if (paddingData) {
            this.constrain = paddingData.constrain;
            if (paddingData.top) this.top.value = paddingData.top;
            if (paddingData.right) this.right.value = paddingData.right;
            if (paddingData.bottom) this.bottom.value = paddingData.bottom;
            if (paddingData.left) this.left.value = paddingData.left;
        }
    }


    getData(breakpoints: Array<Breakpoint>): PaddingData {
        let top = this.top.value != BreakpointSpacing._0px && !breakpoints.some(x => x.breakpointObject == this.top) ? this.top.value : null;
        let right = this.right.value != BreakpointSpacing._0px && !breakpoints.some(x => x.breakpointObject == this.right) ? this.right.value : null;
        let bottom = this.bottom.value != BreakpointSpacing._0px && !breakpoints.some(x => x.breakpointObject == this.bottom) ? this.bottom.value : null;
        let left = this.left.value != BreakpointSpacing._0px && !breakpoints.some(x => x.breakpointObject == this.left) ? this.left.value : null;

        if (!top && !right && !bottom && !left) return null;

        return {
            constrain: this.constrain,
            top: top,
            right: right,
            bottom: bottom,
            left: left
        }
    }

    getValues(): PaddingData {
        return {
            constrain: false,
            top: this.top.value,
            right: this.right.value,
            bottom: this.bottom.value,
            left: this.left.value
        }
    }
}
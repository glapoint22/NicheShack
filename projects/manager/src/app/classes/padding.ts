import { BreakpointsPaddingComponent } from './breakpoints-padding-component';
import { PaddingData } from './padding-data';
import { PaddingTop } from './padding-top';
import { PaddingRight } from './padding-right';
import { PaddingBottom } from './padding-bottom';
import { PaddingLeft } from './padding-left';
import { BreakpointSpacing, Breakpoint } from './breakpoint';

export class Padding {
    public constrain: boolean = true;
    public top: PaddingTop = new PaddingTop();
    public right: PaddingRight = new PaddingRight();
    public bottom: PaddingBottom = new PaddingBottom();
    public left: PaddingLeft = new PaddingLeft();

    setPaddingComponent(paddingComponent: BreakpointsPaddingComponent) {
        paddingComponent['paddingTop'] = this.top;
        paddingComponent['paddingRight'] = this.right;
        paddingComponent['paddingBottom'] = this.bottom;
        paddingComponent['paddingLeft'] = this.left;
    }

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
}
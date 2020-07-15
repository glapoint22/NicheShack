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


    getData(paddingData: PaddingData, breakpoints: Array<Breakpoint>) {
        if (this.constrain) paddingData.constrain = this.constrain;

        // Top
        if (this.top.value != BreakpointSpacing._0px && !breakpoints.some(x => x.breakpointObject == this.top)) {
            paddingData.top = this.top.value;
        }


        // Right
        if (this.right.value != BreakpointSpacing._0px && !breakpoints.some(x => x.breakpointObject == this.right)) {
            paddingData.right = this.right.value;
        }



        // Bottom
        if (this.bottom.value != BreakpointSpacing._0px && !breakpoints.some(x => x.breakpointObject == this.bottom)) {
            paddingData.bottom = this.bottom.value;
        }


        // Left
        if (this.left.value != BreakpointSpacing._0px && !breakpoints.some(x => x.breakpointObject == this.left)) {
            paddingData.left = this.left.value;
        }
    }
}
import { BreakpointsPaddingComponent } from './breakpoints-padding-component';
import { PaddingData } from './padding-data';
import { PaddingTop } from './padding-top';
import { PaddingRight } from './padding-right';
import { PaddingBottom } from './padding-bottom';
import { PaddingLeft } from './padding-left';

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

    load(paddingData: PaddingData) {
        if (paddingData) {
            this.constrain = paddingData.constrain;
            this.top.value = paddingData.top ? paddingData.top : this.top.defaultValue;
            this.right.value = paddingData.right ? paddingData.right : this.right.defaultValue;
            this.bottom.value = paddingData.bottom ? paddingData.bottom : this.bottom.defaultValue;
            this.left.value = paddingData.left ? paddingData.left : this.left.defaultValue;
        }
    }
}
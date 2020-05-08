import { PaddingTop } from './padding-top';
import { PaddingRight } from './padding-right';
import { PaddingBottom } from './padding-bottom';
import { PaddingLeft } from './padding-left';

export class Padding {
    constrain: boolean = true;
    top: PaddingTop = new PaddingTop();
    right: PaddingRight = new PaddingRight();
    bottom: PaddingBottom = new PaddingBottom();
    left: PaddingLeft = new PaddingLeft();
}
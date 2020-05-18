import { PaddingTop } from './padding-top';
import { PaddingRight } from './padding-right';
import { PaddingBottom } from './padding-bottom';
import { PaddingLeft } from './padding-left';

export class Padding {
    constrain: boolean = true;

    constructor(public top: PaddingTop, public right: PaddingRight, public bottom: PaddingBottom, public left: PaddingLeft) { }
}
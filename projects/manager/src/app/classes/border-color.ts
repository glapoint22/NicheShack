import { BorderColorBase } from 'classes/border-color-base';

export class BorderColor extends BorderColorBase {
    getStyle() {
        return '\n\tborder-color: ' + this.value.toRGBString() + ';';
    }
}
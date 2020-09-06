import { Color } from '../../../../../classes/color';
import { TextColorBase } from 'classes/text-color-base';

export class TextColor extends TextColorBase {
    applyStyle(element: HTMLElement) {
        element.style.color = this.value.toRGBString();
    }

    getStyle() {
        return '\n\tcolor: ' + this.value.toRGBString() + ';';
    }
}
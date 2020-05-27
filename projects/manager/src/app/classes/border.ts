import { BorderData } from './border-data';
import { Color } from './color';
import { Enableable } from './enableable';

export class Border extends BorderData implements Enableable {

    constructor(public color: Color = new Color(190, 190, 190, 1)) { super(); }

    applyStyle(element: HTMLElement) {
        if (this.enable) {
            element.style.borderColor = this.color.toRGBString();
            element.style.borderWidth = this.width + 'px';
            element.style.borderStyle = this.style;
        }
    }

    getStyle() {
        if (!this.enable) return '';
        return '\n\tborder: ' + this.width + 'px ' + this.style + ' ' + this.color.toRGBString() + ';';
    }

    getColorStyle() {
        return '\n\tborder-color: ' + this.color.toRGBString() + ';';
    }

    load(borderData: BorderData) {
        if (borderData) {
            this.enable = borderData.enable;
            this.width = borderData.width;
            this.style = borderData.style;
            this.color = Color.hexToRGB(borderData.hexColor);
        }

    }
}
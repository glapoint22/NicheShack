import { Color } from './color';
import { Enableable } from './enableable';

export class Border implements Enableable {
    enable: boolean;
    width: number = 1;
    style: string = 'solid';

    constructor(public color: Color = new Color(190, 190, 190, 1)) { }

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
}
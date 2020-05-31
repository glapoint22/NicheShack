import { BorderData } from './border-data';
import { Color } from './color';
import { Enableable } from './enableable';

export class Border implements Enableable {
    public enable: boolean;
    public width: number = 1;
    public style: string = 'solid';

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


    load(borderData: BorderData) {
        if (borderData) {
            this.enable = borderData.enable;
            if (borderData.width) this.width = borderData.width;
            if (borderData.style) this.style = borderData.style;
            if (borderData.color) this.color = Color.hexToRGB(borderData.color);
        }
    }
}
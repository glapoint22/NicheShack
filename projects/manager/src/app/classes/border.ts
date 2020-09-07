import { Enableable } from './enableable';
import { BorderBase } from 'classes/border-base';
import { BorderData } from 'classes/border-data';

export class Border extends BorderBase implements Enableable {
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


    

    getData(): BorderData {
        let borderData: BorderData;

        if (this.enable) {
            borderData = {
                enable: this.enable,
                width: this.width,
                style: this.style != 'solid' ? this.style : null,
                color: !this.color.isEqual(this.defaultColor) ? this.color.toHex() : null
            }
        }

        return borderData;
    }
}
import { Color } from '../../../../../classes/color';
import { Enableable } from './enableable';
import { ShadowData } from '../../../../../classes/shadow-data';
import { ShadowBase } from 'classes/shadow-base';

export class Shadow extends ShadowBase implements Enableable {
    applyStyle(element: HTMLElement) {
        if (this.enable) {
            element.style.boxShadow = this.x + 'px ' + this.y + 'px ' + this.blur + 'px ' + this.size + 'px ' + this.color.toRGBString();
        }
    }

    getStyle() {
        if (!this.enable) return '';
        return '\n\tbox-shadow: ' + this.x + 'px ' + this.y + 'px ' + this.blur + 'px ' + this.size + 'px ' + this.color.toRGBString() + ';';
    }

    


    getData(): ShadowData {
        let shadow: ShadowData;

        if (this.enable) {
            shadow = {
                enable: this.enable,
                x: this.x != this.default ? this.x : 0,
                y: this.y != this.default ? this.y : 0,
                blur: this.blur != this.default ? this.blur : 0,
                size: this.size != this.default ? this.size : 0,
                color: !this.color.isEqual(new Color(0, 0, 0, 0.75)) ? this.color.toHex() : null
            }
        }
        
        return shadow;
    }
}
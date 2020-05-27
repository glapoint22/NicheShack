import { Color } from './color';
import { Enableable } from './enableable';
import { ShadowData } from './shadow-data';

export class Shadow extends ShadowData implements Enableable {
    color: Color = new Color(0, 0, 0, 0.75);

    applyStyle(element: HTMLElement) {
        if (this.enable) {
            element.style.boxShadow = this.x + 'px ' + this.y + 'px ' + this.blur + 'px ' + this.size + 'px ' + this.color.toRGBString();
        }
    }

    getStyle() {
        if (!this.enable) return '';
        return '\n\tbox-shadow: ' + this.x + 'px ' + this.y + 'px ' + this.blur + 'px ' + this.size + 'px ' + this.color.toRGBString() + ';';
    }

    load(shadowData: ShadowData) {
        if (shadowData) {
            this.enable = shadowData.enable;
            this.x = shadowData.x;
            this.y = shadowData.y;
            this.blur = shadowData.blur;
            this.size = shadowData.size;
            this.color = Color.hexToRGB(shadowData.hexColor);
        }

    }
}
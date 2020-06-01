import { Color } from './color';
import { Enableable } from './enableable';
import { ShadowData } from './shadow-data';

export class Shadow implements Enableable {
    public enable: boolean;
    public x: number = 5;
    public y: number = 5;
    public blur: number = 5;
    public size: number = 5;
    public color: Color = new Color(0, 0, 0, 0.75);

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
            if (shadowData.x) this.x = shadowData.x;
            if (shadowData.y) this.y = shadowData.y;
            if (shadowData.blur) this.blur = shadowData.blur;
            if (shadowData.size) this.size = shadowData.size;
            if (shadowData.color) this.color = Color.hexToRGB(shadowData.color);
        }
    }
}
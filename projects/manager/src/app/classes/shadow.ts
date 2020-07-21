import { Color } from './color';
import { Enableable } from './enableable';
import { ShadowData } from './shadow-data';

export class Shadow implements Enableable {
    private default: number = 5;
    public enable: boolean;
    public x: number = this.default;
    public y: number = this.default;
    public blur: number = this.default;
    public size: number = this.default;
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

    setData(shadowData: ShadowData) {
        if (shadowData) {
            this.enable = shadowData.enable;
            if (shadowData.x) this.x = shadowData.x;
            if (shadowData.y) this.y = shadowData.y;
            if (shadowData.blur) this.blur = shadowData.blur;
            if (shadowData.size) this.size = shadowData.size;
            if (shadowData.color) this.color = Color.hexToRGB(shadowData.color);
        }
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
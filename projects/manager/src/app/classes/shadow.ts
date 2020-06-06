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


    save(shadowData: ShadowData) {
        if (this.enable) {
            shadowData.enable = this.enable;
            if (this.x != this.default) shadowData.x = this.x;
            if (this.y != this.default) shadowData.y = this.y;
            if (this.blur != this.default) shadowData.blur = this.blur;
            if (this.size != this.default) shadowData.size = this.size;
            if (!this.color.isEqual(new Color(0, 0, 0, 0.75))) shadowData.color = this.color.toHex();
        }
    }
}
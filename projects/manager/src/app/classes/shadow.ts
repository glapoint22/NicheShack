import { Color } from './color';
import { Enableable } from './enableable';

export class Shadow implements Enableable {
    enable: boolean;
    x: number = 5;
    y: number = 5;
    blur: number = 5;
    size: number = 5;
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
}
import { Color } from './color';

export class TextColor {
    constructor(public value: Color = new Color(128, 128, 128, 1)) { }

    applyStyle(element: HTMLElement) {
        element.style.color = this.value.toRGBString();
    }

    getStyle() {
        return '\n\tcolor: ' + this.value.toRGBString() + ';';
    }

    setData(color: string) {
        if (color) this.value = Color.hexToRGB(color);
    }
}
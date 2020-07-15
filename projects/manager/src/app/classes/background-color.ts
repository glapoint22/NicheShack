import { Color } from './color';

export class BackgroundColor {
    constructor(public value: Color = new Color(128, 128, 128, 1)) { }

    applyStyle(element: HTMLElement) {
        element.style.backgroundColor = this.value.toRGBString();
    }

    getStyle() {
        return '\n\tbackground-color: ' + this.value.toRGBString() + ';';
    }

    setData(color: string) {
        if (color) this.value = Color.hexToRGB(color);
    }
}
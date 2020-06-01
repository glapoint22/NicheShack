import { Color } from './color';

export class BackgroundColor {
    constructor(public value: Color = new Color(128, 128, 128, 1)) { }

    getStyle() {
        return '\n\tbackground-color: ' + this.value.toRGBString() + ';';
    }

    load(color: string) {
        if (color) this.value = Color.hexToRGB(color);
    }
}
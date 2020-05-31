import { Color } from './color';

export class TextColor {
    constructor(public value: Color = new Color(128, 128, 128, 1)) { }

    getStyle() {
        return '\n\tcolor: ' + this.value.toRGBString() + ';';
    }

    load(color: string) {
        if (color) this.value = Color.hexToRGB(color);
    }
}
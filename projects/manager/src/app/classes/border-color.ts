import { Color } from './color';

export class BorderColor {
    constructor(public value: Color = new Color(128, 128, 128, 1)) { }

    getStyle() {
        return '\n\tborder-color: ' + this.value.toRGBString() + ';';
    }

    setData(color: string) {
        if (color) this.value = Color.hexToRGB(color);
    }
}
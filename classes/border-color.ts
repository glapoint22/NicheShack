import { Color } from './color';

export class BorderColor {
    public value: Color = new Color();

    constructor(color: Color) { 
        this.value.copy(color);
    }

    setData(color: string) {
        if (color) this.value = Color.hexToRGB(color);
    }

    getStyle() {
        return '\n\tborder-color: ' + this.value.toRGBString() + ';';
    }
}
import { Color } from './color';

export class BackgroundColorBase {
    public value: Color = new Color();

    constructor(color: Color) { 
        this.value.copy(color);
    }

    setData(color: string) {
        if (color) this.value = Color.hexToRGB(color);
    }

    getStyle() {
        return '\n\tbackground-color: ' + this.value.toRGBString() + ';';
    }
}
import { Color } from './color';

export class TextColorBase {
    public value: Color = new Color();

    constructor(color: Color) { 
        this.value.copy(color);
    }

    setData(color: string) {
        if (color) this.value = Color.hexToRGB(color);
    }


    getStyle() {
        return '\n\tcolor: ' + this.value.toRGBString() + ';';
    }
}
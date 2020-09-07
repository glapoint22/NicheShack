import { Color } from './color';

export class BackgroundColorBase {
    constructor(public value: Color = new Color(128, 128, 128, 1)) { }

    setData(color: string) {
        if (color) this.value = Color.hexToRGB(color);
    }
}
import { ColorStyle } from './color-style';
import { Color } from './color';

export class FontColor extends ColorStyle {

    constructor(contentDocument: HTMLDocument) {
        super(contentDocument);

        this.style = 'color';
        this.defaultColor = new Color(0, 0, 0, 1);
    }
}
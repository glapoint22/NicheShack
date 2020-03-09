import { ColorStyle } from './color-style';
import { Color } from './color';

export class FontColor extends ColorStyle {

    constructor(contentDocument: HTMLDocument, defaultColor: Color) {
        super(contentDocument);

        this.style = 'color';
        this.defaultColor = defaultColor;
    }
}
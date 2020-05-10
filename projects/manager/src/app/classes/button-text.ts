import { Color } from './color';
import { Font } from './font';
import { FontSize } from './font-size';

export class ButtonText {
    caption: string = 'Button';
    font: Font = new Font();
    fontSize: FontSize = new FontSize();
    fontWeight: string = 'normal';
    fontStyle: string = 'normal';
    textDecoration: string = 'none';

    constructor(public color: Color = new Color(200, 200, 200, 1)) {
        this.font.selectedIndex = 0;
        this.font.styleValue = this.font.options[this.font.selectedIndex].value;

        this.fontSize.selectedIndex = 7;
        this.fontSize.styleValue = this.fontSize.options[this.fontSize.selectedIndex].value;
    }

    getStyle() {
        return '\n\tfont-family: ' + this.font.styleValue + ';' +
            '\n\tfont-size: ' + this.fontSize.styleValue + ';' +
            '\n\tfont-weight: ' + this.fontWeight + ';' +
            '\n\tfont-style: ' + this.fontStyle + ';' +
            '\n\ttext-decoration: ' + this.textDecoration + ';' +
            '\n\tcolor: ' + this.color.toRGBString() + ';';
    }

    getColorStyle() {
        return '\n\tcolor: ' + this.color.toRGBString() + ';';
    }
}
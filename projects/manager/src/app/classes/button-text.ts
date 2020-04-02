import { Color } from './color';

export class ButtonText {
    caption: string = 'Button';
    fontFamily: string = 'Arial, Helvetica, sans-serif';
    fontSize: number = 15;
    fontWeight: string = 'normal';
    fontStyle: string = 'normal';
    color: Color = new Color(200, 200, 200, 1);
    hoverColor: Color = new Color(255, 255, 255, 1);

    applyStyle(element: HTMLElement) {
        element.style.fontFamily = this.fontFamily;
        element.style.fontSize = this.fontSize + 'px';
        element.style.fontWeight = this.fontWeight;
        element.style.fontStyle = this.fontStyle;
        element.style.color = this.color.toRGBString();
    }

    getStyle() {
        return '\n\tfont-family: ' + this.fontFamily + ';' +
            '\n\tfont-size: ' + this.fontSize + 'px;' +
            '\n\tfont-weight: ' + this.fontWeight + ';' +
            '\n\tfont-style: ' + this.fontStyle + ';' +
            '\n\tcolor: ' + this.color.toRGBString() + ';';
    }

    getHoverStyle() {
        return '\n\tcolor: ' + this.hoverColor.toRGBString() + ';';
    }
}
import { Color } from './color';

export class FillColor {
    apply: boolean;
    color: Color = new Color(128, 128, 128, 1);
    hoverColor: Color = new Color(150, 150, 150, 1);

    applyColor(element: HTMLElement) {
        element.style.background = this.color.toRGBString();
    }

    getStyle() {
        return '\n\tbackground: ' + this.color.toRGBString() + ';';
    }

    getHoverStyle() {
        return '\n\tbackground: ' + this.hoverColor.toRGBString() + ';';
    }
}
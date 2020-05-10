import { Color } from './color';
import { Enableable } from './enableable';

export class FillColor implements Enableable {
    enable: boolean;

    constructor(public color: Color = new Color(128, 128, 128, 1)) { }

    applyColor(element: HTMLElement) {
        element.style.background = this.color.toRGBString();
    }

    getStyle() {
        return '\n\tbackground: ' + this.color.toRGBString() + ';';
    }
}
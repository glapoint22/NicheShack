import { BackgroundColorBase } from 'classes/background-color-base';

export class BackgroundColor extends BackgroundColorBase {
    applyStyle(element: HTMLElement) {
        element.style.backgroundColor = this.value.toRGBString();
    }

    getStyle() {
        return '\n\tbackground-color: ' + this.value.toRGBString() + ';';
    }
}
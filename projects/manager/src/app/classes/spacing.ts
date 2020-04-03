export class Spacing {
    top: number = 0;
    right: number = 0;
    bottom: number = 0;
    left: number = 0;
    style: string;

    applyStyle(element: HTMLElement) {
        if (this.top > 0) {
            element.style[this.style + 'Top'] = this.top + 'px';
        }

        if (this.right > 0) {
            element.style[this.style + 'Right'] = this.right + 'px';
        }

        if (this.bottom > 0) {
            element.style[this.style + 'Bottom'] = this.bottom + 'px';
        }

        if (this.left > 0) {
            element.style[this.style + 'Left'] = this.left + 'px';
        }
    }
}
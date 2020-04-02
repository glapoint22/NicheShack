export class Corners {
    constrainCorners: boolean = true;
    topLeft: number = 0;
    topRight: number = 0;
    bottomLeft: number = 0;
    bottomRight: number = 0;

    applyStyle(element: HTMLElement) {
        if (this.topLeft > 0) {
            element.style.borderTopLeftRadius = this.topLeft + 'px';
        }

        if (this.topRight > 0) {
            element.style.borderTopRightRadius = this.topRight + 'px';
        }

        if (this.bottomRight > 0) {
            element.style.borderBottomRightRadius = this.bottomRight + 'px';
        }

        if (this.bottomLeft > 0) {
            element.style.borderBottomLeftRadius = this.bottomLeft + 'px';
        }
    }

    getStyle() {
        let style: string = '';

        if (this.topLeft > 0) {
            style += '\n\tborder-top-left-radius: ' + this.topLeft + 'px;';
        }

        if (this.topRight > 0) {
            style += '\n\tborder-top-right-radius: ' + this.topRight + 'px;';
        }

        if (this.bottomRight > 0) {
            style += '\n\tborder-bottom-right-radius: ' + this.bottomRight + 'px;';
        }

        if (this.bottomLeft > 0) {
            style += '\n\tborder-bottom-left-radius: ' + this.bottomLeft + 'px;';
        }

        return style;
    }
}
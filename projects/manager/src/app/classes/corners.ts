import { CornersData } from './corners-data';

export class Corners {
    public constrain: boolean = true;
    public topLeft: number = 0;
    public topRight: number = 0;
    public bottomLeft: number = 0;
    public bottomRight: number = 0;

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

    setData(cornersData: CornersData) {
        if (cornersData) {
            this.constrain = cornersData.constrain;
            if (cornersData.topLeft) this.topLeft = cornersData.topLeft;
            if (cornersData.topRight) this.topRight = cornersData.topRight;
            if (cornersData.bottomLeft) this.bottomLeft = cornersData.bottomLeft;
            if (cornersData.bottomRight) this.bottomRight = cornersData.bottomRight;
        }
    }


    getData(): CornersData {
        let corners: CornersData

        if (this.topLeft > 0 || this.topRight > 0 || this.bottomRight > 0 || this.bottomLeft > 0) {
            corners = {
                constrain: this.constrain,
                topLeft: this.topLeft,
                topRight: this.topRight,
                bottomRight: this.bottomRight,
                bottomLeft: this.bottomLeft
            }
        }

        return corners;
    }
}
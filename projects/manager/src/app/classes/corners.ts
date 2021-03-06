import { CornersData } from '../../../../../classes/corners-data';
import { CornersBase } from 'classes/corners-base';

export class Corners extends CornersBase{
    public constrain: boolean = true;

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

    



    setData(cornersData: CornersData) {
        if (cornersData) {
            this.constrain = cornersData.constrain;
            super.setData(cornersData);
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
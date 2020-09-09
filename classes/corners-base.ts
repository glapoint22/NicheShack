import { CornersData } from './corners-data';

export class CornersBase {
    public topLeft: number = 0;
    public topRight: number = 0;
    public bottomLeft: number = 0;
    public bottomRight: number = 0;


    setData(cornersData: CornersData) {
        if (cornersData) {
            if (cornersData.topLeft) this.topLeft = cornersData.topLeft;
            if (cornersData.topRight) this.topRight = cornersData.topRight;
            if (cornersData.bottomLeft) this.bottomLeft = cornersData.bottomLeft;
            if (cornersData.bottomRight) this.bottomRight = cornersData.bottomRight;
        }
    }
}
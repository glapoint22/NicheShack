import { PaddingData } from 'classes/padding-data';

export class Padding {
    public top: string;
    public right: string;
    public bottom: string;
    public left: string;

    setData(paddingData: PaddingData) {
        if (paddingData) {
            if (paddingData.top) this.top = paddingData.top;
            if (paddingData.right) this.right = paddingData.right;
            if (paddingData.bottom) this.bottom = paddingData.bottom;
            if (paddingData.left) this.left = paddingData.left;
        }
    }
}
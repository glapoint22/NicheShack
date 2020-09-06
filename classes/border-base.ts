import { Color } from './color';
import { BorderData } from './border-data';

export class BorderBase {
    public enable: boolean;
    public width: number = 1;
    public style: string = 'solid';
    public defaultColor: Color = new Color(190, 190, 190, 1);
    public color: Color = this.defaultColor;


    setData(borderData: BorderData) {
        if (borderData) {
            this.enable = borderData.enable;
            if (borderData.width) this.width = borderData.width;
            if (borderData.style) this.style = borderData.style;
            if (borderData.color) this.color = Color.hexToRGB(borderData.color);
        }
    }
}
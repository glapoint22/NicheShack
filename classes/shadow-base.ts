import { Color } from './color';
import { ShadowData } from './shadow-data';

export class ShadowBase {
    public default: number = 5;
    public enable: boolean;
    public x: number = this.default;
    public y: number = this.default;
    public blur: number = this.default;
    public size: number = this.default;
    public color: Color = new Color(0, 0, 0, 0.75);


    setData(shadowData: ShadowData) {
        if (shadowData) {
            this.enable = shadowData.enable;
            if (shadowData.x) this.x = shadowData.x;
            if (shadowData.y) this.y = shadowData.y;
            if (shadowData.blur) this.blur = shadowData.blur;
            if (shadowData.size) this.size = shadowData.size;
            if (shadowData.color) this.color = Color.hexToRGB(shadowData.color);
        }
    }
}
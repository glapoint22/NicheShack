import { Color } from './color';
import { BackgroundData } from './background-data';
import { BackgroundImageBase } from './background-image-base';

export class BackgroundBase {
    public color: Color = new Color(0, 0, 0, 0);
    public enable: boolean;

    setData(backgroundData: BackgroundData) {
        if (backgroundData) {
            // Enable
            this.enable = backgroundData.enable;

            // Background color
            if (backgroundData.color) this.color = Color.hexToRGB(backgroundData.color);
        }
    }
}
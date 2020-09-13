import { Color } from './color';
import { BackgroundData } from './background-data';
import { BackgroundImageBase } from './background-image-base';

export class BackgroundBase {
    public color: Color = new Color(0, 0, 0, 0);
    public enable: boolean;
    public image: BackgroundImageBase = new BackgroundImageBase();

    setData(backgroundData: BackgroundData) {
        if (backgroundData) {
            // Enable
            this.enable = backgroundData.enable;

            // Background color
            if (backgroundData.color) this.color = Color.hexToRGB(backgroundData.color);
            

            // Background image
            if (backgroundData.image) this.image.setData(backgroundData.image);
        }
    }

    getStyle() {
        return '\n\tbackground-color: ' + this.color.toRGBString() + ';' +
            (this.image && this.image.url ? '\n\tbackground-image: url("images/' + this.image.url + '");' : '') +
            (this.image && this.image.position ? '\n\tbackground-position: ' + this.image.position + ';' : '') +
            (this.image && this.image.repeat ? '\n\tbackground-repeat: ' + this.image.repeat + ';' : '') +
            (this.image && this.image.attachment ? '\n\tbackground-attachment: ' + this.image.attachment + ';' : '');
    }
}
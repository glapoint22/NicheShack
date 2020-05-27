import { BackgroundData } from './background-data';
import { Color } from './color';
import { Enableable } from './enableable';

export class Background extends BackgroundData implements Enableable {
    public color: Color = new Color(0, 0, 0, 0);


    applyStyles(element: HTMLElement) {
        // Background Color
        element.style.backgroundColor = this.color.toRGBString();

        // Background Image
        if (this.image && this.image.url) {
            element.style.backgroundImage = 'url("images/' + this.image.url + '")';
        }

        // Background Position
        if (this.image && this.image.position) {
            element.style.backgroundPosition = this.image.position;
        }

        // Background Repeat
        if (this.image && this.image.repeat) {
            element.style.backgroundRepeat = this.image.repeat;
        }

        // Background Attachment
        if (this.image && this.image.attachment) {
            element.style.backgroundAttachment = this.image.attachment;
        }
    }

    getStyle() {
        return '\n\tbackground-color: ' + this.color.toRGBString() + ';' +
            (this.image && this.image.url ? '\n\tbackground-image: url("images/' + this.image.url + '");' : '') +
            (this.image && this.image.position ? '\n\tbackground-position: ' + this.image.position + ';' : '') +
            (this.image && this.image.repeat ? '\n\tbackground-repeat: ' + this.image.repeat + ';' : '') +
            (this.image && this.image.attachment ? '\n\tbackground-attachment: ' + this.image.attachment + ';' : '');
    }

    load(backgroundData: BackgroundData) {
        if (backgroundData) {
            this.enable = backgroundData.enable;
            if (backgroundData.hexColor)
                this.color = Color.hexToRGB(backgroundData.hexColor);
            this.image = backgroundData.image;
        }

    }
}
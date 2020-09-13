import { Enableable } from './enableable';
import { BackgroundBase } from 'classes/background-base';
import { BackgroundData } from 'classes/background-data';

export class Background extends BackgroundBase implements Enableable {

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

    



    getData(): BackgroundData {
        let backgroundData: BackgroundData;

        if (this.color.r > 0 ||
            this.color.g > 0 ||
            this.color.b > 0 ||
            this.color.a > 0 ||
            this.image.url) {

            backgroundData = {
                enable: this.enable,
                color: this.color.r > 0 ||
                    this.color.g > 0 ||
                    this.color.b > 0 ||
                    this.color.a > 0 ? this.color.toHex() : null,
                image: this.image.url ? {
                    id: this.image.id,
                    name: this.image.name,
                    url: this.image.url,
                    position: this.image.position,
                    repeat: this.image.repeat,
                    attachment: this.image.attachment
                } : null
            }
        }

        return backgroundData;
    }
}
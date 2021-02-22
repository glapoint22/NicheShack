import { Enableable } from './enableable';
import { BackgroundBase } from 'classes/background-base';
import { BackgroundData } from 'classes/background-data';
import { Color } from 'classes/color';

export class Background extends BackgroundBase implements Enableable {
    public enable: boolean;

    constructor() {
        super();
        this.color = new Color(222, 222, 222, 1);
    }


    setData(backgroundData: BackgroundData) {
        if (backgroundData) {
            super.setData(backgroundData);
            this.enable = backgroundData.enable;
        }
    }


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

        if (this.enable) {
            backgroundData = {
                enable: this.enable,
                color: this.color.toHex(),
                image: this.image.url ? {
                    id: this.image.id,
                    name: null,
                    url: null,
                    position: this.image.position,
                    repeat: this.image.repeat,
                    attachment: this.image.attachment
                } : null
            }
        }

        return backgroundData;
    }
}
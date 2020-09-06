import { BackgroundImageBase } from 'classes/background-image-base';
import { BackgroundImageData } from 'classes/background-image-data';

export class BackgroundImage extends BackgroundImageBase {
    getData(): BackgroundImageData {
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            position: this.position,
            repeat: this.repeat,
            attachment: this.attachment,
        }
    }
}
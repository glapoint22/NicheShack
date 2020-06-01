import { Image } from './image';
import { BackgroundImageData } from './background-image-data';

export class BackgroundImage extends Image {
    public position: string;
    public repeat: string;
    public attachment: string;

    load(backgroundImageData: BackgroundImageData) {
        if (backgroundImageData) {
            this.position = backgroundImageData.position;
            this.repeat = backgroundImageData.repeat;
            this.attachment = backgroundImageData.attachment;

            super.load({
                url: backgroundImageData.url,
                title: backgroundImageData.title
            })
        }
    }
}
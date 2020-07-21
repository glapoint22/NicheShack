import { Image } from './image';
import { BackgroundImageData } from './background-image-data';

export class BackgroundImage extends Image {
    public position: string;
    public repeat: string;
    public attachment: string;

    setData(backgroundImageData: BackgroundImageData) {
        if (backgroundImageData) {
            this.position = backgroundImageData.position;
            this.repeat = backgroundImageData.repeat;
            this.attachment = backgroundImageData.attachment;

            super.setData(backgroundImageData);
        }
    }



    getData(): BackgroundImageData {
        let image = super.getData();

        return {
            id: image.id,
            name: image.name,
            url: image.url,
            position: this.position,
            repeat: this.repeat,
            attachment: this.attachment,
        }
    }
}
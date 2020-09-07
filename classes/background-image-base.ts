import { BackgroundImageData } from './background-image-data';
import { ImageBase } from './Image-base';

export class BackgroundImageBase extends ImageBase {
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
}
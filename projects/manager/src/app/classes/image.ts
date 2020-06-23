import { ImageData } from './image-data';
import { Media } from './media';

export class Image implements Media {
    public id: string;
    public name: string;
    public url: string;

    load(imageData: ImageData) {
        if (imageData) {
            this.url = imageData.url;
            this.name = imageData.name;
        }
    }

    save(imageData: ImageData) {
        if (this.url) imageData.url = this.url;
        if (this.name) imageData.name = this.name;
    }
}
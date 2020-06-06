import { ImageData } from './image-data';

export class Image {
    title: string;
    url: string;

    load(imageData: ImageData) {
        if (imageData) {
            this.url = imageData.url;
            this.title = imageData.title;
        }
    }

    save(imageData: ImageData) {
        if (this.url) imageData.url = this.url;
        if (this.title) imageData.title = this.title;
    }
}
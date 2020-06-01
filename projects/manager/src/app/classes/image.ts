import { ImageData } from './image-data';

export class Image {
    title: string;
    url: string;

    load(imageData: ImageData) {
        if(imageData) {
            this.url = imageData.url;
            this.title = imageData.title;
        }
    }
}
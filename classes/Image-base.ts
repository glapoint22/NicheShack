import { ImageData } from './image-data';

export class ImageBase {
    public id: number;
    public name: string;
    public url: string;

    setData(imageData: ImageData) {
        if (imageData) {
            this.url = imageData.url;
            this.name = imageData.name;
        }
    }
}
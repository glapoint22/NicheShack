import { ImageData } from './image-data';
import { Media } from './media';

export class Image implements Media {
    public id: number;
    public name: string;
    public url: string;

    setData(imageData: ImageData) {
        if (imageData) {
            this.url = imageData.url;
            this.name = imageData.name;
        }
    }

    getData(): ImageData {
        return {
            id: this.id,
            name: this.name,
            url: this.url
        }
    }
}
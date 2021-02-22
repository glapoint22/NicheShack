import { Media } from './media';
import { ImageBase } from 'classes/Image-base';
import { ImageData } from 'classes/image-data';

export class Image extends ImageBase implements Media {
    getData(): ImageData {
        return {
            id: this.id,
            name: null,
            url: null
        }
    }
}
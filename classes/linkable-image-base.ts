import { LinkableImageData } from './linkable-image-data';
import { ImageBase } from 'classes/Image-base';
import { LinkBase } from 'classes/link-base';

export class LinkableImageBase {
    image: ImageBase = new ImageBase();
    link: LinkBase = new LinkBase();

    constructor(linkableImageData?: LinkableImageData) {
        if (linkableImageData) {
            this.image.setData(linkableImageData.image);
            this.link.setData(linkableImageData.link);
        }
    }
}
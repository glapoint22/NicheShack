import { LinkableImageData } from './linkable-image-data';
import { ImageBase } from 'classes/Image-base';
import { LinkBase } from 'classes/link-base';

export class LinkableImage {
    image: ImageBase = new ImageBase();
    link: LinkBase = new LinkBase();

    constructor(carouselBannerData?: LinkableImageData) {
        if (carouselBannerData) {
            this.image.setData(carouselBannerData.image);
            this.link.setData(carouselBannerData.link);
        }
    }
}
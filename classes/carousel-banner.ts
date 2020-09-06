import { CarouselBannerData } from './carousel-banner-data';
import { ImageBase } from 'classes/Image-base';
import { LinkBase } from 'classes/link-base';

export class CarouselBanner {
    image: ImageBase = new ImageBase();
    link: LinkBase = new LinkBase();

    constructor(carouselBannerData?: CarouselBannerData) {
        if (carouselBannerData) {
            this.image.setData(carouselBannerData.image);
            this.link.setData(carouselBannerData.link);
        }
    }
}
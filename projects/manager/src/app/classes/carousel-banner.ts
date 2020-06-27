import { Image } from './image';
import { Link } from './link';
import { CarouselBannerData } from './carousel-banner-data';

export class CarouselBanner {
    image: Image = new Image();
    link: Link = new Link();

    constructor(carouselBannerData?: CarouselBannerData) {
        if (carouselBannerData) {
            this.image.load(carouselBannerData.image);
            this.link.load(carouselBannerData.link);
        }
    }
}
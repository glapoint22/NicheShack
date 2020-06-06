import { WidgetData } from './widget-data';
import { CarouselBannerData } from './carousel-banner-data';

export class CarouselWidgetData extends WidgetData {
    banners: Array<CarouselBannerData>;
}
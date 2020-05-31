import { WidgetData } from './widget-data';
import { CarouselBannerData } from './carousel-banner-data';

export interface CarouselWidgetData extends WidgetData {
    banners: Array<CarouselBannerData>;
}
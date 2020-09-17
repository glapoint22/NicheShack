import { CarouselBannerData } from './carousel-banner-data';
import { WidgetDataBase } from './widget-data-base';

export interface CarouselWidgetDataBase extends WidgetDataBase {
    banners: Array<CarouselBannerData>;
}
import { LinkableImageData } from './linkable-image-data';
import { WidgetDataBase } from './widget-data-base';

export interface CarouselWidgetDataBase extends WidgetDataBase {
    banners: Array<LinkableImageData>;
}
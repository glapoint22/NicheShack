import { WidgetData } from './widget-data';
import { ProductGroupType } from './product-group-type';
import { Product } from './product';
import { CaptionData } from './caption-data';

export interface ProductGroupWidgetData extends WidgetData {
    caption: CaptionData;
    productGroupType: ProductGroupType;
    featuredProducts: Array<Product>;
}
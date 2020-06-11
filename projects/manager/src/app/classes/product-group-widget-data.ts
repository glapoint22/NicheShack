import { WidgetData } from './widget-data';
import { ProductGroupType } from './product-group-type';
import { Product } from './product';
import { CaptionData } from './caption-data';

export class ProductGroupWidgetData extends WidgetData {
    caption: CaptionData = new CaptionData();
    productGroupType: ProductGroupType;
    featuredProducts: Array<Product> = [];
}
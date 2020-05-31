import { WidgetData } from './widget-data';
import { ProductGroupType } from './product-group-type';
import { Product } from './product';

export interface ProductGroupWidgetData extends WidgetData {
    caption: string;
    productGroupType: ProductGroupType;
    featuredProducts: Array<Product>;
}
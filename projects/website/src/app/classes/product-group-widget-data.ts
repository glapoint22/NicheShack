import { Product } from 'classes/product';
import { ProductGroupWidgetDataBase } from 'classes/product-group-widget-data-base';

export interface ProductGroupWidgetData extends ProductGroupWidgetDataBase {
    featuredProducts: Array<Product>;
}
import { ProductGroupWidgetDataBase } from 'classes/product-group-widget-data-base';
import { Product } from '../interfaces/product';

export interface ProductGroupWidgetData extends ProductGroupWidgetDataBase {
    featuredProducts: Array<Product>;
}
import { WidgetData } from './widget-data';
import { Product } from './product';
import { ProductGroupWidgetDataBase } from 'classes/product-group-widget-data-base';

export interface ProductGroupWidgetData extends WidgetData, ProductGroupWidgetDataBase {
    featuredProducts: Array<Product>;
}
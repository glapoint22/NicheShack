import { WidgetData } from './widget-data';
import { Product } from './product';
import { ProductGroupWidgetDataBase } from 'classes/product-group-widget-data-base';
import { Item } from './item';

export interface ProductGroupWidgetData extends WidgetData, ProductGroupWidgetDataBase {
    featuredProducts: Array<Item>;
}
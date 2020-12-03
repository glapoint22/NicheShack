import { WidgetData } from './widget-data';
import { ShopWidgetDataBase } from 'classes/shop-widget-data-base';
import { ShopType } from './shop-type';

export interface ShopWidgetData extends WidgetData, ShopWidgetDataBase {
    shopType: ShopType;
 }
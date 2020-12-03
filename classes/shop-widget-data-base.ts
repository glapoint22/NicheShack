import { CaptionData } from './caption-data';
import { ShopItem } from './shop-item';

export interface ShopWidgetDataBase {
    caption: CaptionData;
    textColor: string;
    items: Array<ShopItem>;
}
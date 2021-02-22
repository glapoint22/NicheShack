import { CaptionData } from './caption-data';
import { ShopItemData } from './shop-item-data';

export interface ShopWidgetDataBase {
    caption: CaptionData;
    textColor: string;
    items: Array<ShopItemData>;
}
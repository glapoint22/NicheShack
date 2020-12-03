import { ImageBase } from './Image-base';
import { LinkBase } from './link-base';

export class ShopItem {
    name: string = '';
    icon: ImageBase = new ImageBase();
    link: LinkBase = new LinkBase();

    constructor(shopItem?: ShopItem) {
        if (shopItem) {
            this.icon.setData(shopItem.icon);
            this.link.setData(shopItem.link);
            this.name = shopItem.name;
        }
    }
}
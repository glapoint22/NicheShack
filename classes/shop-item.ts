import { Link } from 'projects/manager/src/app/classes/link';
import { ImageBase } from './Image-base';

export class ShopItem {
    id: number;
    name: string = '';
    icon: ImageBase = new ImageBase();
    link: Link = new Link();

    constructor(shopItem?: ShopItem) {
        if (shopItem) {
            this.id = shopItem.id;
            this.icon.setData(shopItem.icon);
            this.link.setData(shopItem.link);
            this.name = shopItem.name;
        }
    }
}
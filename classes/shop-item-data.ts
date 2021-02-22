import { ImageData } from "./image-data";
import { LinkData } from "./link-data";

export interface ShopItemData {
    id: number;
    name?: string;
    icon?: ImageData;
    link: LinkData;
}
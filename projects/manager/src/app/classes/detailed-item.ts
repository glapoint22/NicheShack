import { Item } from './item';
import { ImageData } from 'classes/image-data';

export interface DetailedItem extends Item {
    icon: ImageData;
    urlName?: string;
}
import { Item } from './item';
import { ImageData } from './image-data';

export interface Category extends Item {
    icon: ImageData;
}
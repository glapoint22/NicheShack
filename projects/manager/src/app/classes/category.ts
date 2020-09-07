import { Item } from './item';
import { ImageData } from 'classes/image-data';

export interface Category extends Item {
    icon: ImageData;
}
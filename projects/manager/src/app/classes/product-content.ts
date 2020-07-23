import { Image } from './image';

export interface ProductContent {
    id: string;
    name: string;
    icon: Image;
    priceIndices: Array<boolean>;
}
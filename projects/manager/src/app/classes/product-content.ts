import { Image } from './image';

export interface ProductContent {
    id: string;
    title: string;
    icon: Image;
    priceIndices: Array<boolean>;
}
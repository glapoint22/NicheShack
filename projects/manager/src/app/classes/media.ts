import { SafeUrl } from '@angular/platform-browser';
import { Image } from './image';

export interface Media {
    id: string;
    image: Image;
    type: ProductMediaType;
    url?: string;
    safeUrl?: SafeUrl;
}

export enum ProductMediaType {
    Image,
    BackgroundImage,
    BannerImage,
    CategoryImage,
    ProductImage,
    Icon,
    Video
}
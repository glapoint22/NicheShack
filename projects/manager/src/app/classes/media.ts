import { SafeUrl } from '@angular/platform-browser';
import { Image } from './image';

export interface Media {
    id: string;
    image: Image;
    type: MediaType;
    url?: string;
    safeUrl?: SafeUrl;
}

export enum MediaType {
    Image,
    BackgroundImage,
    BannerImage,
    CategoryImage,
    ProductImage,
    Icon,
    Video
}
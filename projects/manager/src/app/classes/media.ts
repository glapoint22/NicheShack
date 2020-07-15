import { SafeUrl } from '@angular/platform-browser';

export interface Media {
    id: string;
    name: string;
    url: string;
    thumbnail?: string;
    safeUrl?: SafeUrl;
    type?: MediaType;
}

export enum MediaType {
    Image,
    BackgroundImage,
    BannerImage,
    CategoryImage,
    ProductImage,
    Icon,
    Video,
    Search,
    ProductMediaImage
}
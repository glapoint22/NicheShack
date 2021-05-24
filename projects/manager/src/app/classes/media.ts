import { SafeUrl } from '@angular/platform-browser';

export interface Media {
    id: number;
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
    NicheImage,
    ProductImage,
    ProductMediaImage,
    ProductPriceImage,
    Video,
    Search
}
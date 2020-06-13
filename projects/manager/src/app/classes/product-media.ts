import { SafeUrl } from '@angular/platform-browser';

export interface ProductMedia {
    thumbnail: string;
    type: ProductMediaType;
    url?: string;
    safeUrl?: SafeUrl;
}

export enum ProductMediaType {
    Video,
    Image
}
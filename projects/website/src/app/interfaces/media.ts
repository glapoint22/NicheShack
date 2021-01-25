import { SafeUrl } from '@angular/platform-browser';

export interface Media {
    name: string;
    thumbnail: string;
    type: number;
    url: string;
    safeUrl: SafeUrl;
}


export enum MediaType {
    Image = 6,
    Video = 8,
}
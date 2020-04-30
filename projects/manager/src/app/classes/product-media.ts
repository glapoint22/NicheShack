export interface ProductMedia {
    thumbnail: string;
    type: ProductMediaType;
    url?: string;
}

export enum ProductMediaType {
    Video,
    Image
}
import { ProductContent } from './product-content';
import { ProductPricePoint } from './product-price-point';
import { SafeHtml } from '@angular/platform-browser';
import { Item } from './item';
import { ProductMedia } from './product-media';
import { ImageData } from 'classes/image-data';

export interface Product {
    id: number;
    vendor: Item;
    hoplink: string;
    name: string;
    rating: number;
    totalReviews: number;
    description: string;
    content: Array<ProductContent>;
    pricePoints: Array<ProductPricePoint>;
    image: ImageData;
    media: Array<ProductMedia>;
    minPrice: number;
    maxPrice: number;
    keywords: Array<Item>;
    safeDescription?: SafeHtml;
    selectedMedia?: ProductMedia;
}
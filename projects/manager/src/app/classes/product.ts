import { ProductContent } from './product-content';
import { ProductPricePoint } from './product-price-point';
import { Media } from './media';
import { SafeHtml } from '@angular/platform-browser';
import { Item } from './item';
import { ImageData } from './image-data';

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
    media: Array<Media>;
    minPrice: number;
    maxPrice: number;
    keywords: Array<Item>;
    safeDescription?: SafeHtml;
    selectedMedia?: Media;
}
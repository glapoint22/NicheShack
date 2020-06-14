import { Image } from './image';
import { ProductContent } from './product-content';
import { ProductPricePoint } from './product-price-point';
import { Media } from './media';
import { SafeHtml } from '@angular/platform-browser';

export class Product {
    id: string;
    hoplink: string;
    name: string;
    image: Image;
    rating: number;
    totalReviews: number;
    description: string;
    content: Array<ProductContent> = [];
    pricePoints: Array<ProductPricePoint> = [];
    media: Array<Media> = [];
    safeDescription?: SafeHtml;
}
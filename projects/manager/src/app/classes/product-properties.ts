import { productFilter } from './product-filter';
import { ProductPricePoint } from './product-price-point';
import { ProductContent } from './product-content';
import { ProductMedia } from './product-media';
import { Image } from './image';

export class ProductProperties {
    image: Image;
    rating: number;
    totalReviews: number;
    hoplink: string;
    description: string;
    filters: Array<productFilter> = [];
    content: Array<ProductContent> = [];
    pricePoints: Array<ProductPricePoint> = [];
    media: Array<ProductMedia> = [];
    keywords: Array<string> = [];
}
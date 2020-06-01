import { productFilter } from './product-filter';
import { ProductPricePoint } from './product-price-point';
import { ProductContent } from './product-content';
import { ProductMedia } from './product-media';
import { ImageData } from './image-data';

export class ProductProperties {
    image: ImageData;
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
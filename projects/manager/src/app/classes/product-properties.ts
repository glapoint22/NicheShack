import { productFilter } from './product-filter';
import { ProductPricePoint } from './product-price-point';
import { ProductContent } from './product-content';
import { ProductMedia } from './product-media';

export class ProductProperties {
    image: string;
    rating: number;
    totalReviews: number;
    hoplink: string;
    description: string;
    filters: Array<productFilter>;
    content: Array<ProductContent>;
    pricePoints: Array<ProductPricePoint>;
    media: Array<ProductMedia>;
    keywords: Array<string>;
}
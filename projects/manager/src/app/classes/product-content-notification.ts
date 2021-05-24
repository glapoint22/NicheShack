import { GeneralNotification } from './general-notification';
import { ProductContent } from './product-content';
// import { ProductPricePoint } from './product-price-point';

export interface ProductContentNotification extends GeneralNotification {
    content: ProductContent[];
    // pricePoints: ProductPricePoint[];
    minPrice: number;
    maxPrice: number;
}
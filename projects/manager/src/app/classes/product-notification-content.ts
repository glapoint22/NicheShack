import { ProductNotification } from './product-notification';
import { ProductContent } from './product-content';
import { ProductPricePoint } from './product-price-point';

export interface ProductNotificationContent extends ProductNotification {
    content: ProductContent[];
    pricePoints: ProductPricePoint[];
}
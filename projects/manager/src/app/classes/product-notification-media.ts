import { ProductNotification } from './product-notification';
import { ProductMedia } from './product-media';

export interface ProductNotificationMedia extends ProductNotification {
    media: ProductMedia[];
}
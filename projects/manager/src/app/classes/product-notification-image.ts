import { ProductNotification } from './product-notification';
import { Image } from './image';

export interface ProductNotificationImage extends ProductNotification {
    image: Image;
}
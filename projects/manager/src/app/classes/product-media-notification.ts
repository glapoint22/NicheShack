import { GeneralNotification } from './general-notification';
import { ProductMedia } from './product-media';

export interface ProductMediaNotification extends GeneralNotification {
    media: ProductMedia[];
}
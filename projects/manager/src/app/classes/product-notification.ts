import { Notification } from './notification';

export interface ProductNotification extends Notification {
    productThumbnail: string;
    productName: string;
}
import { Notification } from './notification';

export interface GeneralNotification extends Notification {
    productThumbnail: string;
    productName: string;
    productId: number;
    vendorId: number;
    hoplink: string;
}
import { Notification } from './notification';

export interface GeneralNotification extends Notification {
    productThumbnail: string;
    productName: string;
    vendorId: number;
    hoplink: string;
}
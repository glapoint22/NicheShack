import { NotificationText } from './notification-text';
import { NotificationType } from './notification-type';

export interface Notification {
    productId: number;
    name: string;
    customerText: NotificationText;
    notes: NotificationText;
    type: NotificationType;
}
import { NotificationText } from './notification-text';

export interface Notification {
    name: string;
    customerText: NotificationText;
    notes: NotificationText;
}
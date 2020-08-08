import { ListItem } from './list-item';
import { NotificationType } from './notification-type';

export interface NotificationListItem extends ListItem {
    productId: number;
    name: string;
    listIcon: string;
    type: NotificationType;
    state: number;
}
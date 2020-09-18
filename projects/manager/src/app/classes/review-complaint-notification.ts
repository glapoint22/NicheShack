import { GeneralNotification } from './general-notification';
import { NotificationText } from './notification-text';

export interface ReviewComplaintNotification extends GeneralNotification {
    isChecked: boolean[];
    review: NotificationText;
}
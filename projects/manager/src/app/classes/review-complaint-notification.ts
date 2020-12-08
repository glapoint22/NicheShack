import { GeneralNotification } from './general-notification';
import { ReviewNotificationText } from './review-notification-text';

export interface ReviewComplaintNotification extends GeneralNotification {
    isChecked: boolean[];
    review: ReviewNotificationText;
}
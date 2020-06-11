import { GeneralNotification } from './general-notification';

export interface ReviewComplaintNotification extends GeneralNotification {
    isChecked: boolean[];
}
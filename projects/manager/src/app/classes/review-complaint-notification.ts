import { ProductNotification } from './product-notification';

export interface ReviewComplaintNotification extends ProductNotification {
    isChecked: boolean[];
}
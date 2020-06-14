import { GeneralNotification } from './general-notification';
import { Media } from './media';

export interface ProductMediaNotification extends GeneralNotification {
    media: Media[];
}
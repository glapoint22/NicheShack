import { GeneralNotification } from './general-notification';
import { Image } from './image';

export interface ProductImageNotification extends GeneralNotification {
    image: Image;
}
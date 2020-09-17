import { Notification } from './notification';

    
export interface MessageNotification extends Notification {
    messengerName: string;
    email: string;
}
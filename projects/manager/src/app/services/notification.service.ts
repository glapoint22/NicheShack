import { Injectable } from '@angular/core';
import { MessageNotification } from '../classes/message-notification';
import { GeneralNotification } from '../classes/general-notification';
import { ReviewComplaintNotification } from '../classes/review-complaint-notification';
import { ProductDescriptionNotification } from '../classes/product-description-notification';
import { ProductImageNotification } from '../classes/product-image-notification';
import { ProductContentNotification } from '../classes/product-content-notification';
import { ProductMediaNotification } from '../classes/product-media-notification';
import { NotificationTab } from '../classes/notification-tab';
import { NotificationListItem } from '../classes/notification-list-item';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public selectedNotificationsTab: NotificationTab;
  public newNotifications: Array<NotificationListItem> = [];
  public pendingNotifications: Array<NotificationListItem> = [];
  public archiveNotifications: Array<NotificationListItem> = [];
  public messageNotification: MessageNotification;
  public generalNotification: GeneralNotification;
  public reviewComplaintNotification: ReviewComplaintNotification
  public productDescriptionNotification: ProductDescriptionNotification;
  public productImageNotification: ProductImageNotification;
  public productMediaNotification: ProductMediaNotification
  public productContentNotification: ProductContentNotification;
  public notificationIds: Array<number>;


  // -----------------------------( GET NEW NOTIFICATIONS COUNT )------------------------------ \\
  getNewNotificationsCount() {
    let count: number = 0;

    this.newNotifications.forEach(x => {
      count += x.count;
    })

    return count;
  }


  // -----------------------------( GET PENDING NOTIFICATIONS COUNT )------------------------------ \\
  getPendingNotificationsCount() {
    let count: number = 0;

    this.pendingNotifications.forEach(x => {
      count += x.count;
    })

    return count;
  }
}
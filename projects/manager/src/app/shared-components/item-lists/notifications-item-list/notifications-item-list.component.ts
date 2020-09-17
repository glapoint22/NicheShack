import { Component, Input } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MenuService } from '../../../services/menu.service';
import { NotificationService } from '../../../services/notification.service';
import { PopupService } from '../../../services/popup.service';
import { NotificationListItem } from '../../../classes/notification-list-item';
import { GeneralNotification } from '../../../classes/general-notification';
import { ProductDescriptionNotification } from '../../../classes/product-description-notification';
import { ProductImageNotification } from '../../../classes/product-image-notification';
import { ProductMediaNotification } from '../../../classes/product-media-notification';
import { ProductContentNotification } from '../../../classes/product-content-notification';
import { ReviewComplaintNotification } from '../../../classes/review-complaint-notification';
import { PromptService } from '../../../services/prompt.service';
import { DataService } from 'services/data.service';
import { NotificationType } from '../../../classes/notification-type';
import { Notification } from '../../../classes/notification';
import { Observable, Subscriber } from 'rxjs';
import { MessageNotification } from '../../../classes/message-notification';

@Component({
  selector: 'notifications-item-list',
  templateUrl: './notifications-item-list.component.html',
  styleUrls: ['./notifications-item-list.component.scss', '../media-item-list/media-item-list.component.scss']
})
export class NotificationsItemListComponent extends ItemListComponent {
  public selectType = SelectType;
  public notificationImageList: Array<string>;
  @Input() listItems: Array<NotificationListItem>;



  constructor(menuService: MenuService,
    promptService: PromptService,
    popupService: PopupService,
    private notificationService: NotificationService,
    private dataService: DataService
  ) {
    super(menuService, promptService, popupService)
  }





  // -----------------------------( ON LIST ITEM CLICK )------------------------------ \\
  onListItemClick(listItem: NotificationListItem) {
    this.dataService.post('api/Notifications/Ids',
      {
        type: listItem.type,
        state: listItem.state,
        productId: listItem.productId
      }
    ).subscribe((notificationIds: Array<number>) => {
      this.notificationService.notificationIds = notificationIds;

      // Message
      if (listItem.type == NotificationType.Message) {
        this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: notificationIds[0] }])
          .subscribe((notification: MessageNotification) => {
            this.notificationService.messageNotification = notification;
            this.popupService.messageNotificationPopup.show = true;
          });
      }

      // General Notification
      if (listItem.type == NotificationType.ProductNameOther
        || listItem.type == NotificationType.ProductReportedAsIllegal
        || listItem.type == NotificationType.ProductReportedAsHavingAdultContent
        || listItem.type == NotificationType.OffensiveProductOther
        || listItem.type == NotificationType.ProductInactive
        || listItem.type == NotificationType.ProductSiteNoLongerInService
        || listItem.type == NotificationType.MissingProductOther) {


        this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: notificationIds[0] }])
          .subscribe((notification: GeneralNotification) => {
            this.notificationService.generalNotification = notification;
            this.popupService.generalNotificationPopup.show = true;
          });
      }

      // Review Complaint Notification
      if (listItem.type == NotificationType.ReviewComplaint) {
        this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: notificationIds[0] }])
          .subscribe((notification: ReviewComplaintNotification) => {
            this.notificationService.reviewComplaintNotification = notification;
            this.popupService.reviewComplaintNotificationPopup.show = true;
          });
      }

      // Product Description Notification
      if (listItem.type == NotificationType.ProductNameDoesNotMatchWithProductDescription
        || listItem.type == NotificationType.ProductDescriptionIncorrect
        || listItem.type == NotificationType.ProductDescriptionTooVague
        || listItem.type == NotificationType.ProductDescriptionMisleading
        || listItem.type == NotificationType.ProductDescriptionOther) {

        this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: notificationIds[0] }])
          .subscribe((notification: ProductDescriptionNotification) => {
            this.notificationService.productDescriptionNotification = notification;
            this.popupService.productDescriptionNotificationPopup.show = true;
          });
      }

      // Product Image Notification
      if (listItem.type == NotificationType.ProductNameDoesNotMatchWithProductImage) {

        this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: notificationIds[0] }])
          .subscribe((notification: ProductImageNotification) => {
            this.notificationService.productImageNotification = notification;
            this.popupService.productImageNotificationPopup.show = true;
          });
      }

      // Product Media Notification
      if (listItem.type == NotificationType.VideosAndImagesAreDifferentFromProduct
        || listItem.type == NotificationType.NotEnoughVideosAndImages
        || listItem.type == NotificationType.VideosAndImagesNotClear
        || listItem.type == NotificationType.VideosAndImagesMisleading
        || listItem.type == NotificationType.VideosAndImagesOther) {

        this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: notificationIds[0] }])
          .subscribe((notification: ProductMediaNotification) => {
            this.notificationService.productMediaNotification = notification;
            this.popupService.productMediaNotificationPopup.show = true;
          });
      }

      // Product Content Notification
      if (listItem.type == NotificationType.ProductPriceTooHigh
        || listItem.type == NotificationType.ProductPriceNotCorrect
        || listItem.type == NotificationType.ProductPriceOther) {

        this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: notificationIds[0] }])
          .subscribe((notification: ProductContentNotification) => {
            this.notificationService.productContentNotification = notification;
            this.popupService.productContentNotificationPopup.show = true;
          });
      }
    });


    // Close the notification list popup
    this.popupService.notificationListPopup.show = false;
  }
}
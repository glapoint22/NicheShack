import { Component, OnChanges, Input } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MenuService } from '../../../services/menu.service';
import { NotificationService } from '../../../services/notification.service';
import { PopupService } from '../../../services/popup.service';
import { NotificationType, NotificationTab, Notification } from '../../../classes/notification';
import { GeneralNotification } from '../../../classes/general-notification';
import { ProductDescriptionNotification } from '../../../classes/product-description-notification';
import { ProductImageNotification } from '../../../classes/product-image-notification';
import { ProductMediaNotification } from '../../../classes/product-media-notification';
import { ProductContentNotification } from '../../../classes/product-content-notification';
import { ReviewComplaintNotification } from '../../../classes/review-complaint-notification';

@Component({
  selector: 'notifications-item-list',
  templateUrl: './notifications-item-list.component.html',
  styleUrls: ['./notifications-item-list.component.scss', '../media-item-list/media-item-list.component.scss']
})
export class NotificationsItemListComponent extends ItemListComponent implements OnChanges {
  constructor(menuService: MenuService, private notificationService: NotificationService, public popupService: PopupService) { super(menuService) }
  public selectType = SelectType;
  public notificationImageList: Array<string>;
  @Input() list: Array<Notification>;


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    if (this.list) {

      // Set the notification image
      this.notificationImageList = this.list.map(x => {
        // If the notification is a message
        if (x.name == NotificationType.Message) {
          return 'message.png';

          // If the notification is a review complaint
        } else if (x.name == NotificationType.ReviewComplaint) {
          return 'review-complaint.png';

          // For all other notifications
        } else {
          return (x as GeneralNotification).productThumbnail
        }
      });


      // Set the notification name
      this.listItems = this.list.map(x => ({
        id: x.id,
        name: x.name,
        selected: false,
        selectType: null
      }));
    }
  }


  // -----------------------------( ON LIST ITEM CLICK )------------------------------ \\
  onListItemClick(i: number) {
    let notificationArray: Notification[];

    // Set the notification array based on which notification tab is selected
    switch (this.notificationService.selectedNotificationsTab) {
      case NotificationTab.NewNotifications: {
        notificationArray = this.notificationService.newNotifications;
        break;
      }
      case NotificationTab.PendingNotifications: {
        notificationArray = this.notificationService.pendingNotifications;
        break;
      }
      case NotificationTab.ArchiveNotifications: {
        notificationArray = this.notificationService.archiveNotifications;
        break;
      }
    }


    // Message
    if (notificationArray[i].name == NotificationType.Message) {
      this.popupService.messageNotificationPopup.show = true;
      this.notificationService.messageNotification = notificationArray[i];
    }

    // General Notification
    if (notificationArray[i].name == NotificationType.ProductNameOther
      || notificationArray[i].name == NotificationType.ProductReportedAsIllegal
      || notificationArray[i].name == NotificationType.ProductReportedAsHavingAdultContent
      || notificationArray[i].name == NotificationType.OffensiveProductOther
      || notificationArray[i].name == NotificationType.ProductInactive
      || notificationArray[i].name == NotificationType.ProductSiteNoLongerInService
      || notificationArray[i].name == NotificationType.MissingProductOther) {
      this.popupService.generalNotificationPopup.show = true;
      this.notificationService.generalNotification = notificationArray[i] as GeneralNotification;
    }

    // Review Complaint Notification
    if (notificationArray[i].name == NotificationType.ReviewComplaint) {
      this.popupService.reviewComplaintNotificationPopup.show = true;
      this.notificationService.reviewComplaintNotification = notificationArray[i] as ReviewComplaintNotification;
    }

    // Product Description Notification
    if (notificationArray[i].name == NotificationType.ProductNameDoesNotMatchWithProductDescription
      || notificationArray[i].name == NotificationType.ProductDescriptionIncorrect
      || notificationArray[i].name == NotificationType.ProductDescriptionTooVague
      || notificationArray[i].name == NotificationType.ProductDescriptionMisleading
      || notificationArray[i].name == NotificationType.ProductDescriptionOther) {
      this.popupService.productDescriptionNotificationPopup.show = true;
      this.notificationService.productDescriptionNotification = notificationArray[i] as ProductDescriptionNotification;
    }

    // Product Image Notification
    if (notificationArray[i].name == NotificationType.ProductNameDoesNotMatchWithProductImage) {
      this.popupService.productImageNotificationPopup.show = true;
      this.notificationService.productImageNotification = notificationArray[i] as ProductImageNotification;
    }

    // Product Media Notification
    if (notificationArray[i].name == NotificationType.VideosAndImagesAreDifferentFromProduct
      || notificationArray[i].name == NotificationType.NotEnoughVideosAndImages
      || notificationArray[i].name == NotificationType.VideosAndImagesNotClear
      || notificationArray[i].name == NotificationType.VideosAndImagesMisleading
      || notificationArray[i].name == NotificationType.VideosAndImagesOther) {
      this.popupService.productMediaNotificationPopup.show = true;
      this.notificationService.productMediaNotification = notificationArray[i] as ProductMediaNotification;
    }

    // Product Content Notification
    if (notificationArray[i].name == NotificationType.ProductPriceTooHigh
      || notificationArray[i].name == NotificationType.ProductPriceNotCorrect
      || notificationArray[i].name == NotificationType.ProductPriceOther) {
      this.popupService.productContentNotificationPopup.show = true;
      this.notificationService.productContentNotification = notificationArray[i] as ProductContentNotification;
    }
    this.popupService.notificationListPopup.show = false;
  }
}
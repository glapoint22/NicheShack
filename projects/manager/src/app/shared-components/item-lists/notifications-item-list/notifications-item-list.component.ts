import { Component, OnChanges } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MenuService } from '../../../services/menu.service';
import { NotificationService } from '../../../services/notification.service';
import { PopupService } from '../../../services/popup.service';
import { NotificationType } from '../../../classes/notification';
import { ProductNotification } from '../../../classes/product-notification';
import { ProductNotificationDescription } from '../../../classes/product-notification-description';
import { ProductNotificationImage } from '../../../classes/product-notification-image';
import { ProductNotificationMedia } from '../../../classes/product-notification-media';
import { ProductNotificationContent } from '../../../classes/product-notification-content';
import { ReviewComplaintNotification } from '../../../classes/review-complaint-notification';

@Component({
  selector: 'notifications-item-list',
  templateUrl: './notifications-item-list.component.html',
  styleUrls: ['./notifications-item-list.component.scss', '../media-item-list/media-item-list.component.scss']
})
export class NotificationsItemListComponent extends ItemListComponent implements OnChanges {


  constructor(menuService: MenuService, private notificationService: NotificationService, public popupService: PopupService) {

    super(menuService)
  }

  public selectType: typeof SelectType = SelectType;
  public notificationImageList: Array<string>;


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {

    if (this.list) {


      let notificationDescriptionList: Array<string> = this.notificationService.convertNotificationTypeToDescription(this.list);

      this.notificationImageList = this.notificationService.getNotificationImageList(this.list);


      this.listItems = notificationDescriptionList.map(x => ({
        name: x,
        selected: false,
        selectType: null
      }));




    }


  }


  onListItemClick(i: number) {

    // Message
    if (this.notificationService.notifications[i].type == NotificationType.Message) {
      this.popupService.messageNotificationPopup.show = true;
      this.notificationService.messageNotification = this.notificationService.notifications[i];
    }

    // Review Complaint
    if (this.notificationService.notifications[i].type == NotificationType.ReviewComplaint) {
      this.popupService.reviewComplaintNotificationPopup.show = true;
      this.notificationService.reviewComplaintNotification = this.notificationService.notifications[i] as ReviewComplaintNotification;
    }

    // Product Notification
    if (this.notificationService.notifications[i].type == NotificationType.ProductNameOther
      || this.notificationService.notifications[i].type == NotificationType.ProductReportedAsIllegal
      || this.notificationService.notifications[i].type == NotificationType.ProductReportedAsHavingAdultContent
      || this.notificationService.notifications[i].type == NotificationType.OffensiveProductOther
      || this.notificationService.notifications[i].type == NotificationType.ProductInactive
      || this.notificationService.notifications[i].type == NotificationType.ProductSiteNoLongerInService
      || this.notificationService.notifications[i].type == NotificationType.MissingProductOther) {
      this.popupService.productReportOtherPopup.show = true;
      this.notificationService.productNotification = this.notificationService.notifications[i] as ProductNotification;
    }

    // Product Notification Description
    if (this.notificationService.notifications[i].type == NotificationType.ProductNameDoesNotMatchWithProductDescription
      || this.notificationService.notifications[i].type == NotificationType.ProductDescriptionIncorrect
      || this.notificationService.notifications[i].type == NotificationType.ProductDescriptionTooVague
      || this.notificationService.notifications[i].type == NotificationType.ProductDescriptionMisleading
      || this.notificationService.notifications[i].type == NotificationType.ProductDescriptionOther) {
      this.popupService.productReportDescriptionPopup.show = true;
      this.notificationService.productNotificationDescription = this.notificationService.notifications[i] as ProductNotificationDescription;
    }

    // Product Notification Image
    if (this.notificationService.notifications[i].type == NotificationType.ProductNameDoesNotMatchWithProductImage) {
      this.popupService.productReportImagePopup.show = true;
      this.notificationService.productNotificationImage = this.notificationService.notifications[i] as ProductNotificationImage;
    }

    // Product Notification Media
    if (this.notificationService.notifications[i].type == NotificationType.VideosAndImagesAreDifferentFromProduct
      || this.notificationService.notifications[i].type == NotificationType.NotEnoughVideosAndImages
      || this.notificationService.notifications[i].type == NotificationType.VideosAndImagesNotClear
      || this.notificationService.notifications[i].type == NotificationType.VideosAndImagesMisleading
      || this.notificationService.notifications[i].type == NotificationType.VideosAndImagesOther) {
      this.popupService.productReportMediaPopup.show = true;
      this.notificationService.productNotificationMedia = this.notificationService.notifications[i] as ProductNotificationMedia;
    }

    // Product Notification Content
    if (this.notificationService.notifications[i].type == NotificationType.ProductPriceTooHigh
      || this.notificationService.notifications[i].type == NotificationType.ProductPriceNotCorrect
      || this.notificationService.notifications[i].type == NotificationType.ProductPriceOther) {
      this.popupService.productReportContentPopup.show = true;
      this.notificationService.productNotificationContent = this.notificationService.notifications[i] as ProductNotificationContent;
    }

    this.popupService.notificationsPopup.show = false;
  }














}
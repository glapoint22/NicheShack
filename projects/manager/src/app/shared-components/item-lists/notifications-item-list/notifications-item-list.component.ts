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

  public selectType = SelectType;
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
    if (this.notificationService.newNotifications[i].type == NotificationType.Message) {
      this.popupService.messageNotificationPopup.show = true;
      this.notificationService.messageNotification = this.notificationService.newNotifications[i];
    }

    // Review Complaint
    if (this.notificationService.newNotifications[i].type == NotificationType.ReviewComplaint) {
      this.popupService.reviewComplaintNotificationPopup.show = true;
      this.notificationService.reviewComplaintNotification = this.notificationService.newNotifications[i] as ReviewComplaintNotification;
    }

    // Product Notification
    if (this.notificationService.newNotifications[i].type == NotificationType.ProductNameOther
      || this.notificationService.newNotifications[i].type == NotificationType.ProductReportedAsIllegal
      || this.notificationService.newNotifications[i].type == NotificationType.ProductReportedAsHavingAdultContent
      || this.notificationService.newNotifications[i].type == NotificationType.OffensiveProductOther
      || this.notificationService.newNotifications[i].type == NotificationType.ProductInactive
      || this.notificationService.newNotifications[i].type == NotificationType.ProductSiteNoLongerInService
      || this.notificationService.newNotifications[i].type == NotificationType.MissingProductOther) {
      this.popupService.productReportOtherPopup.show = true;
      this.notificationService.productNotification = this.notificationService.newNotifications[i] as ProductNotification;
    }

    // Product Notification Description
    if (this.notificationService.newNotifications[i].type == NotificationType.ProductNameDoesNotMatchWithProductDescription
      || this.notificationService.newNotifications[i].type == NotificationType.ProductDescriptionIncorrect
      || this.notificationService.newNotifications[i].type == NotificationType.ProductDescriptionTooVague
      || this.notificationService.newNotifications[i].type == NotificationType.ProductDescriptionMisleading
      || this.notificationService.newNotifications[i].type == NotificationType.ProductDescriptionOther) {
      this.popupService.productReportDescriptionPopup.show = true;
      this.notificationService.productNotificationDescription = this.notificationService.newNotifications[i] as ProductNotificationDescription;
    }

    // Product Notification Image
    if (this.notificationService.newNotifications[i].type == NotificationType.ProductNameDoesNotMatchWithProductImage) {
      this.popupService.productReportImagePopup.show = true;
      this.notificationService.productNotificationImage = this.notificationService.newNotifications[i] as ProductNotificationImage;
    }

    // Product Notification Media
    if (this.notificationService.newNotifications[i].type == NotificationType.VideosAndImagesAreDifferentFromProduct
      || this.notificationService.newNotifications[i].type == NotificationType.NotEnoughVideosAndImages
      || this.notificationService.newNotifications[i].type == NotificationType.VideosAndImagesNotClear
      || this.notificationService.newNotifications[i].type == NotificationType.VideosAndImagesMisleading
      || this.notificationService.newNotifications[i].type == NotificationType.VideosAndImagesOther) {
      this.popupService.productReportMediaPopup.show = true;
      this.notificationService.productNotificationMedia = this.notificationService.newNotifications[i] as ProductNotificationMedia;
    }

    // Product Notification Content
    if (this.notificationService.newNotifications[i].type == NotificationType.ProductPriceTooHigh
      || this.notificationService.newNotifications[i].type == NotificationType.ProductPriceNotCorrect
      || this.notificationService.newNotifications[i].type == NotificationType.ProductPriceOther) {
      this.popupService.productReportContentPopup.show = true;
      this.notificationService.productNotificationContent = this.notificationService.newNotifications[i] as ProductNotificationContent;
    }

    this.popupService.notificationsPopup.show = false;
  }














}
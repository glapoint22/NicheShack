import { Component, OnChanges } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MenuService } from '../../../services/menu.service';
import { NotificationService } from '../../../services/notification.service';
import { PopupService } from '../../../services/popup.service';
import { NotificationType } from '../../../classes/notification';
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

    // General Notification
    if (this.notificationService.newNotifications[i].type == NotificationType.ProductNameOther
      || this.notificationService.newNotifications[i].type == NotificationType.ProductReportedAsIllegal
      || this.notificationService.newNotifications[i].type == NotificationType.ProductReportedAsHavingAdultContent
      || this.notificationService.newNotifications[i].type == NotificationType.OffensiveProductOther
      || this.notificationService.newNotifications[i].type == NotificationType.ProductInactive
      || this.notificationService.newNotifications[i].type == NotificationType.ProductSiteNoLongerInService
      || this.notificationService.newNotifications[i].type == NotificationType.MissingProductOther) {
      this.popupService.generalNotificationPopup.show = true;
      this.notificationService.generalNotification = this.notificationService.newNotifications[i] as GeneralNotification;
    }

    // Review Complaint Notification
    if (this.notificationService.newNotifications[i].type == NotificationType.ReviewComplaint) {
      this.popupService.reviewComplaintNotificationPopup.show = true;
      this.notificationService.reviewComplaintNotification = this.notificationService.newNotifications[i] as ReviewComplaintNotification;
    }

    // Product Description Notification
    if (this.notificationService.newNotifications[i].type == NotificationType.ProductNameDoesNotMatchWithProductDescription
      || this.notificationService.newNotifications[i].type == NotificationType.ProductDescriptionIncorrect
      || this.notificationService.newNotifications[i].type == NotificationType.ProductDescriptionTooVague
      || this.notificationService.newNotifications[i].type == NotificationType.ProductDescriptionMisleading
      || this.notificationService.newNotifications[i].type == NotificationType.ProductDescriptionOther) {
      this.popupService.productDescriptionNotificationPopup.show = true;
      this.notificationService.productDescriptionNotification = this.notificationService.newNotifications[i] as ProductDescriptionNotification;
    }

    // Product Image Notification
    if (this.notificationService.newNotifications[i].type == NotificationType.ProductNameDoesNotMatchWithProductImage) {
      this.popupService.productImageNotificationPopup.show = true;
      this.notificationService.productImageNotification = this.notificationService.newNotifications[i] as ProductImageNotification;
    }

    // Product Media Notification
    if (this.notificationService.newNotifications[i].type == NotificationType.VideosAndImagesAreDifferentFromProduct
      || this.notificationService.newNotifications[i].type == NotificationType.NotEnoughVideosAndImages
      || this.notificationService.newNotifications[i].type == NotificationType.VideosAndImagesNotClear
      || this.notificationService.newNotifications[i].type == NotificationType.VideosAndImagesMisleading
      || this.notificationService.newNotifications[i].type == NotificationType.VideosAndImagesOther) {
      this.popupService.productMediaNotificationPopup.show = true;
      this.notificationService.productMediaNotification = this.notificationService.newNotifications[i] as ProductMediaNotification;
    }

    // Product Content Notification
    if (this.notificationService.newNotifications[i].type == NotificationType.ProductPriceTooHigh
      || this.notificationService.newNotifications[i].type == NotificationType.ProductPriceNotCorrect
      || this.notificationService.newNotifications[i].type == NotificationType.ProductPriceOther) {
      this.popupService.productContentNotificationPopup.show = true;
      this.notificationService.productContentNotification = this.notificationService.newNotifications[i] as ProductContentNotification;
    }
    this.popupService.notificationListPopup.show = false;
  }














}
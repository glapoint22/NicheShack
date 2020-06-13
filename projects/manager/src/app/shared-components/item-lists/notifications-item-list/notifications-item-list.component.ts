import { Component, OnChanges } from '@angular/core';
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
    let notificationArray: Notification[];
    

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
    if (notificationArray[i].type == NotificationType.Message) {
      this.popupService.messageNotificationPopup.show = true;
      this.notificationService.messageNotification = notificationArray[i];
    }

    // General Notification
    if (notificationArray[i].type == NotificationType.ProductNameOther
      || notificationArray[i].type == NotificationType.ProductReportedAsIllegal
      || notificationArray[i].type == NotificationType.ProductReportedAsHavingAdultContent
      || notificationArray[i].type == NotificationType.OffensiveProductOther
      || notificationArray[i].type == NotificationType.ProductInactive
      || notificationArray[i].type == NotificationType.ProductSiteNoLongerInService
      || notificationArray[i].type == NotificationType.MissingProductOther) {
      this.popupService.generalNotificationPopup.show = true;
      this.notificationService.generalNotification = notificationArray[i] as GeneralNotification;
    }

    // Review Complaint Notification
    if (notificationArray[i].type == NotificationType.ReviewComplaint) {
      this.popupService.reviewComplaintNotificationPopup.show = true;
      this.notificationService.reviewComplaintNotification = notificationArray[i] as ReviewComplaintNotification;
    }

    // Product Description Notification
    if (notificationArray[i].type == NotificationType.ProductNameDoesNotMatchWithProductDescription
      || notificationArray[i].type == NotificationType.ProductDescriptionIncorrect
      || notificationArray[i].type == NotificationType.ProductDescriptionTooVague
      || notificationArray[i].type == NotificationType.ProductDescriptionMisleading
      || notificationArray[i].type == NotificationType.ProductDescriptionOther) {
      this.popupService.productDescriptionNotificationPopup.show = true;
      this.notificationService.productDescriptionNotification = notificationArray[i] as ProductDescriptionNotification;
    }

    // Product Image Notification
    if (notificationArray[i].type == NotificationType.ProductNameDoesNotMatchWithProductImage) {
      this.popupService.productImageNotificationPopup.show = true;
      this.notificationService.productImageNotification = notificationArray[i] as ProductImageNotification;
    }

    // Product Media Notification
    if (notificationArray[i].type == NotificationType.VideosAndImagesAreDifferentFromProduct
      || notificationArray[i].type == NotificationType.NotEnoughVideosAndImages
      || notificationArray[i].type == NotificationType.VideosAndImagesNotClear
      || notificationArray[i].type == NotificationType.VideosAndImagesMisleading
      || notificationArray[i].type == NotificationType.VideosAndImagesOther) {
      this.popupService.productMediaNotificationPopup.show = true;
      this.notificationService.productMediaNotification = notificationArray[i] as ProductMediaNotification;
    }

    // Product Content Notification
    if (notificationArray[i].type == NotificationType.ProductPriceTooHigh
      || notificationArray[i].type == NotificationType.ProductPriceNotCorrect
      || notificationArray[i].type == NotificationType.ProductPriceOther) {
      this.popupService.productContentNotificationPopup.show = true;
      this.notificationService.productContentNotification = notificationArray[i] as ProductContentNotification;
    }
    this.popupService.notificationListPopup.show = false;
  }














}
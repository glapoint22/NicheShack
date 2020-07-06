import { Component, Input } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MenuService } from '../../../services/menu.service';
import { NotificationService } from '../../../services/notification.service';
import { PopupService } from '../../../services/popup.service';
import { NotificationType, Notification } from '../../../classes/notification';
import { GeneralNotification } from '../../../classes/general-notification';
import { ProductDescriptionNotification } from '../../../classes/product-description-notification';
import { ProductImageNotification } from '../../../classes/product-image-notification';
import { ProductMediaNotification } from '../../../classes/product-media-notification';
import { ProductContentNotification } from '../../../classes/product-content-notification';
import { ReviewComplaintNotification } from '../../../classes/review-complaint-notification';
import { PromptService } from '../../../services/prompt.service';

@Component({
  selector: 'notifications-item-list',
  templateUrl: './notifications-item-list.component.html',
  styleUrls: ['./notifications-item-list.component.scss', '../media-item-list/media-item-list.component.scss']
})
export class NotificationsItemListComponent extends ItemListComponent {
  constructor(menuService: MenuService,
              promptService: PromptService,
              popupService: PopupService,
              private notificationService: NotificationService) { 
                super(menuService, promptService, popupService) 
              }
  public selectType = SelectType;
  public notificationImageList: Array<string>;
  @Input() listItems: Array<Notification>;


  // -----------------------------( ON LIST ITEM CLICK )------------------------------ \\
  onListItemClick(listItem: Notification) {
    // Message
    if (listItem.name == NotificationType.Message) {
      this.popupService.messageNotificationPopup.show = true;
      this.notificationService.messageNotification = listItem;
    }

    // General Notification
    if (listItem.name == NotificationType.ProductNameOther
      || listItem.name == NotificationType.ProductReportedAsIllegal
      || listItem.name == NotificationType.ProductReportedAsHavingAdultContent
      || listItem.name == NotificationType.OffensiveProductOther
      || listItem.name == NotificationType.ProductInactive
      || listItem.name == NotificationType.ProductSiteNoLongerInService
      || listItem.name == NotificationType.MissingProductOther) {
      this.popupService.generalNotificationPopup.show = true;
      this.notificationService.generalNotification = listItem as GeneralNotification;
    }

    // Review Complaint Notification
    if (listItem.name == NotificationType.ReviewComplaint) {
      this.popupService.reviewComplaintNotificationPopup.show = true;
      this.notificationService.reviewComplaintNotification = listItem as ReviewComplaintNotification;
    }

    // Product Description Notification
    if (listItem.name == NotificationType.ProductNameDoesNotMatchWithProductDescription
      || listItem.name == NotificationType.ProductDescriptionIncorrect
      || listItem.name == NotificationType.ProductDescriptionTooVague
      || listItem.name == NotificationType.ProductDescriptionMisleading
      || listItem.name == NotificationType.ProductDescriptionOther) {
      this.popupService.productDescriptionNotificationPopup.show = true;
      this.notificationService.productDescriptionNotification = listItem as ProductDescriptionNotification;
    }

    // Product Image Notification
    if (listItem.name == NotificationType.ProductNameDoesNotMatchWithProductImage) {
      this.popupService.productImageNotificationPopup.show = true;
      this.notificationService.productImageNotification = listItem as ProductImageNotification;
    }

    // Product Media Notification
    if (listItem.name == NotificationType.VideosAndImagesAreDifferentFromProduct
      || listItem.name == NotificationType.NotEnoughVideosAndImages
      || listItem.name == NotificationType.VideosAndImagesNotClear
      || listItem.name == NotificationType.VideosAndImagesMisleading
      || listItem.name == NotificationType.VideosAndImagesOther) {
      this.popupService.productMediaNotificationPopup.show = true;
      this.notificationService.productMediaNotification = listItem as ProductMediaNotification;
    }

    // Product Content Notification
    if (listItem.name == NotificationType.ProductPriceTooHigh
      || listItem.name == NotificationType.ProductPriceNotCorrect
      || listItem.name == NotificationType.ProductPriceOther) {
      this.popupService.productContentNotificationPopup.show = true;
      this.notificationService.productContentNotification = listItem as ProductContentNotification;
    }
    this.popupService.notificationListPopup.show = false;
  }
}
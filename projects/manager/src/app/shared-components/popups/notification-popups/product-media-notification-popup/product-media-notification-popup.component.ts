import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { NotificationListItem } from 'projects/manager/src/app/classes/notification-list-item';
import { ProductMediaNotification } from 'projects/manager/src/app/classes/product-media-notification';

@Component({
  selector: 'product-media-notification-popup',
  templateUrl: './product-media-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-media-notification-popup.component.scss']
})
export class ProductMediaNotificationPopupComponent extends GeneralNotificationPopupComponent {
  public mediaType = MediaType;
  public currentIndex: number = 0;

  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.productMediaNotificationPopup = this;
  }


  // --------------------------------( ON PAGINATOR CLICK )-------------------------------- \\
  onPaginatorClick(index: number) {
    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: ProductMediaNotification) => {
        this.notificationService.productMediaNotification = notification;
      });
  }


  // -----------------------------( ON IMAGE ICON CLICK )------------------------------ \\
  onImageIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.ProductImage;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.notificationService.productMediaNotification.media[this.currentIndex];
  }


  // -----------------------------( ON VIDEO ICON CLICK )------------------------------ \\
  onVideoIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.Video;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.media = this.notificationService.productMediaNotification.media[this.currentIndex];
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.notificationService.productMediaNotification.media[this.currentIndex];
  }

  
  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: NotificationListItem) {
    // switch (notification.name) {

    //   case NotificationType.VideosAndImagesAreDifferentFromProduct: {
        
    //     break;
    //   }
    //   case NotificationType.NotEnoughVideosAndImages: {
        
    //     break;
    //   }
    //   case NotificationType.VideosAndImagesNotClear: {
        
    //     break;
    //   }
    //   case NotificationType.VideosAndImagesMisleading: {
        
    //     break;
    //   }
    //   case NotificationType.VideosAndImagesOther: {
        
    //     break;
    //   }
    // }
  }



  // -----------------------------( VIEW VENDOR INFO )------------------------------ \\
  viewVendorInfo() {
    super.viewVendorInfo(this.notificationService.productMediaNotification.vendorId);
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage() {
    super.goToProductPage(this.notificationService.productMediaNotification.productId);
  }


  // --------------------------------( GO TO VENDOR PRODUCT PAGE )-------------------------------- \\
  goToVendorProductPage() {
    super.goToVendorProductPage(this.notificationService.productMediaNotification.hoplink);
  }

}
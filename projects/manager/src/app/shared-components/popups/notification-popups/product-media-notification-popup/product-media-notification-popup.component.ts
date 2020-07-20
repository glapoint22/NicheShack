import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { Notification, NotificationType } from 'projects/manager/src/app/classes/notification';
import { MediaType } from 'projects/manager/src/app/classes/media';

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


  // --------------------------------( SET POPUP )-------------------------------- \\
  setPopup() {
    this.paginatorIndex = this.notificationService.productMediaNotification.customerText.length - 1;
  }


  // --------------------------------( SET PAGE )-------------------------------- \\
  setPage() {
    this.paginator.setPage(this.notificationService.productMediaNotification.customerText.length);
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
  onSubmit(notification: Notification) {
    switch (notification.name) {

      case NotificationType.VideosAndImagesAreDifferentFromProduct: {
        
        break;
      }
      case NotificationType.NotEnoughVideosAndImages: {
        
        break;
      }
      case NotificationType.VideosAndImagesNotClear: {
        
        break;
      }
      case NotificationType.VideosAndImagesMisleading: {
        
        break;
      }
      case NotificationType.VideosAndImagesOther: {
        
        break;
      }
    }
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
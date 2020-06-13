import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { Notification, NotificationType } from 'projects/manager/src/app/classes/notification';

@Component({
  selector: 'product-media-notification-popup',
  templateUrl: './product-media-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-media-notification-popup.component.scss']
})
export class ProductMediaNotificationPopupComponent extends GeneralNotificationPopupComponent {
  public currentIndex: number = 0;

  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.productMediaNotificationPopup = this;
  }


  // --------------------------------( SET POPUP )-------------------------------- \\
  setPopup() {
    this.paginatorIndex = this.notificationService.productMediaNotification.customerText.length - 1;
  }

  
  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification) {
    switch (notification.type) {

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
}
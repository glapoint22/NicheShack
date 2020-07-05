import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { Notification, NotificationType } from 'projects/manager/src/app/classes/notification';

@Component({
  selector: 'product-description-notification-popup',
  templateUrl: './product-description-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-description-notification-popup.component.scss']
})
export class ProductDescriptionNotificationPopupComponent extends GeneralNotificationPopupComponent {

  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.productDescriptionNotificationPopup = this;
  }


  // --------------------------------( SET POPUP )-------------------------------- \\
  setPopup() {
    this.paginatorIndex = this.notificationService.productDescriptionNotification.customerText.length - 1;
  }


  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification) {
    switch (notification.name) {

      case NotificationType.ProductNameDoesNotMatchWithProductDescription: {
        
        break;
      }
      case NotificationType.ProductDescriptionIncorrect: {
        
        break;
      }
      case NotificationType.ProductDescriptionTooVague: {
        
        break;
      }
      case NotificationType.ProductDescriptionMisleading: {
        
        break;
      }
      case NotificationType.ProductDescriptionOther: {
        
        break;
      }
    }
  }


  // -----------------------------( VIEW VENDOR INFO )------------------------------ \\
  viewVendorInfo() {
    super.viewVendorInfo(this.notificationService.productDescriptionNotification.vendorId);
  }

}
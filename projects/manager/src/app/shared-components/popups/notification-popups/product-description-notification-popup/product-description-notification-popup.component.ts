import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { ProductDescriptionNotification } from 'projects/manager/src/app/classes/product-description-notification';
import { Notification } from 'projects/manager/src/app/classes/notification';
import { NotificationType } from 'projects/manager/src/app/classes/notification-type';
import { NotificationText } from 'projects/manager/src/app/classes/notification-text';

@Component({
  selector: 'product-description-notification-popup',
  templateUrl: './product-description-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss']
})
export class ProductDescriptionNotificationPopupComponent extends GeneralNotificationPopupComponent {

  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.productDescriptionNotificationPopup = this;
  }


  // --------------------------------( ON PAGINATOR CLICK )-------------------------------- \\
  onPaginatorClick(index: number) {
    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: ProductDescriptionNotification) => {
        this.notificationService.productDescriptionNotification = notification;
      });
  }


  // -----------------------------( VIEW VENDOR INFO )------------------------------ \\
  viewVendorInfo() {
    super.viewVendorInfo(this.notificationService.productDescriptionNotification.vendorId);
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage() {
    super.goToProductPage(this.notificationService.productDescriptionNotification.productId);
  }


  // --------------------------------( GO TO VENDOR PRODUCT PAGE )-------------------------------- \\
  goToVendorProductPage() {
    super.goToVendorProductPage(this.notificationService.productDescriptionNotification.hoplink);
  }


  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification, htmlNotes: HTMLElement, notes: NotificationText) {
    super.onSubmit(notification, htmlNotes, notes);

    switch (notification.type) {
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
}
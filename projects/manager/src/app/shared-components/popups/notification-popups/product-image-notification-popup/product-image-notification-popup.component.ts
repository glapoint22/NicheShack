import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { NotificationListItem } from 'projects/manager/src/app/classes/notification-list-item';
import { ProductImageNotification } from 'projects/manager/src/app/classes/product-image-notification';
import { GeneralNotification } from 'projects/manager/src/app/classes/general-notification';
import { Notification } from 'projects/manager/src/app/classes/notification';
import { NotificationText } from 'projects/manager/src/app/classes/notification-text';

@Component({
  selector: 'product-image-notification-popup',
  templateUrl: './product-image-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-image-notification-popup.component.scss']
})
export class ProductImageNotificationPopupComponent extends GeneralNotificationPopupComponent {

  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.productImageNotificationPopup = this;
  }


// --------------------------------( ON PAGINATOR CLICK )-------------------------------- \\
  onPaginatorClick(index: number) {
    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: ProductImageNotification) => {
        this.notificationService.productImageNotification = notification;
      });
  }


  // -----------------------------( VIEW VENDOR INFO )------------------------------ \\
  viewVendorInfo() {
    super.viewVendorInfo(this.notificationService.productImageNotification.vendorId);
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage() {
    super.goToProductPage(this.notificationService.productImageNotification.productId);
  }


  // --------------------------------( GO TO VENDOR PRODUCT PAGE )-------------------------------- \\
  goToVendorProductPage() {
    super.goToVendorProductPage(this.notificationService.productImageNotification.hoplink);
  }


  // -----------------------------(ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification, htmlNotes: HTMLElement, notes: NotificationText) {
    super.onSubmit(notification, htmlNotes, notes);

  }
}
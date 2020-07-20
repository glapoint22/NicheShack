import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { Notification } from 'projects/manager/src/app/classes/notification';

@Component({
  selector: 'review-complaint-notification-popup',
  templateUrl: './review-complaint-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './review-complaint-notification-popup.component.scss']
})
export class ReviewComplaintNotificationPopupComponent extends GeneralNotificationPopupComponent {

  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.reviewComplaintNotificationPopup = this;
  }


  // --------------------------------( SET POPUP )-------------------------------- \\
  setPopup() {
    this.paginatorIndex = this.notificationService.reviewComplaintNotification.customerText.length - 1;
  }


  // --------------------------------( SET PAGE )-------------------------------- \\
  setPage() {
    this.paginator.setPage(this.notificationService.reviewComplaintNotification.customerText.length);
  }


  // -----------------------------(ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification) {

  }
}
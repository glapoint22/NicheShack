import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { ReviewComplaintNotification } from 'projects/manager/src/app/classes/review-complaint-notification';
import { Notification } from 'projects/manager/src/app/classes/notification';
import { NotificationText } from 'projects/manager/src/app/classes/notification-text';

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


  // --------------------------------( ON COUNTER CLICK )-------------------------------- \\
  onCounterClick(index: number) {
    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: ReviewComplaintNotification) => {
        this.notificationService.reviewComplaintNotification = notification;
      });
  }


  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification, htmlNotes: HTMLElement, notes: NotificationText) {
    super.onSubmit(notification, htmlNotes, notes);

    this.dataService.put('api/ProductReviews', { id: this.notificationService.reviewComplaintNotification.review.reviewId })
    .subscribe();
  }
}
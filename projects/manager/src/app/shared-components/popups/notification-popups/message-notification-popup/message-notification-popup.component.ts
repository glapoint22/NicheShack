import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { Notification, NotificationTab } from 'projects/manager/src/app/classes/notification';

@Component({
  selector: 'message-notification-popup',
  templateUrl: './message-notification-popup.component.html',
  styleUrls: ['./message-notification-popup.component.scss', '../../popup/popup.component.scss']
})
export class MessageNotificationPopupComponent extends PopupComponent implements OnInit {
  public paginatorIndex: number;
  public notificationTab = NotificationTab;
  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, public notificationService: NotificationService) { super(popupService, cover, menuService) }

  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.preventNoShow = true;
    this.initializePopup()
  }


  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.messageNotificationPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    this.cover.showNormalCover = true;
    super.onPopupShow(popup, arrow);
    this.setPopup(); 
  }


  // --------------------------------( SET POPUP )-------------------------------- \\
  setPopup() {
    this.paginatorIndex = this.notificationService.messageNotification.customerText.length - 1;
  }


  // --------------------------------( SET NOTIFICATION )-------------------------------- \\
  setNotification(notification: Notification, destinationArray: Notification[]){
    this.show = false;
    let notificationIndex: number;
    let startingArray: Notification[];
    
    // Check to see which notification tab we are currently on
    switch (this.notificationService.selectedNotificationsTab) {
      case NotificationTab.NewNotifications: {
        startingArray = this.notificationService.newNotifications;
        break;
      }
      case NotificationTab.PendingNotifications: {
        startingArray = this.notificationService.pendingNotifications;
        break;
      }
      case NotificationTab.ArchiveNotifications: {
        startingArray = this.notificationService.archiveNotifications;
        break;
      }
    }
    // As long as we're not sending a notification to a tab that it already resides in
    if(startingArray != destinationArray) {
      notificationIndex = startingArray.indexOf(notification);
      startingArray.splice(notificationIndex, 1);
      destinationArray.unshift(notification);
    }
  }


  // --------------------------------( SEND NOTIFICATION TO PENDING )-------------------------------- \\
  sendNotificationToPending(notification: Notification) {
    this.cover.showNormalCover = false;
    this.setNotification(notification, this.notificationService.pendingNotifications);
  }


  // --------------------------------( ARCHIVE NOTIFICATION )-------------------------------- \\
  archiveNotification(notification: Notification) {
    this.cover.showNormalCover = false;
    this.setNotification(notification, this.notificationService.archiveNotifications);
  }

  
  // -----------------------------( ON CLOSE )------------------------------ \\
  onClose(notification: Notification) {
    if(this.notificationService.selectedNotificationsTab == NotificationTab.ArchiveNotifications) {
      this.archiveNotification(notification);
    }else {
      this.sendNotificationToPending(notification);
    }
  }


  // -----------------------------( ON RIGHT BUTTON CLICK )------------------------------ \\
  onRightButtonClick(notification: Notification) {
    this.archiveNotification(notification);
    this.onSubmit(notification);
  }


  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification) {

  }
}
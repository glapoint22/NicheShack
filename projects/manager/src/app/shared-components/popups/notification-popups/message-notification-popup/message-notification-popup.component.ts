import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { PaginatorComponent } from '../../../paginator/paginator.component';
import { DataService } from 'services/data.service';
import { NotificationTab } from 'projects/manager/src/app/classes/notification-tab';
import { NotificationListItem } from 'projects/manager/src/app/classes/notification-list-item';
import { Notification } from 'projects/manager/src/app/classes/notification';

@Component({
  selector: 'message-notification-popup',
  templateUrl: './message-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', './message-notification-popup.component.scss']
})
export class MessageNotificationPopupComponent extends PopupComponent implements OnInit {
  @ViewChild('paginator', { static: false }) paginator: PaginatorComponent;
  public paginatorIndex: number;
  public notificationTab = NotificationTab;



  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, dropdownMenuService: DropdownMenuService, dataService: DataService, public notificationService: NotificationService) { super(popupService, cover, menuService, dropdownMenuService, dataService) }

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
    super.onPopupShow(popup, arrow);
    this.setPopup();

    window.setTimeout(() => {
      this.cover.showNormalCover = true;
      this.setPage();
    })
  }



  // --------------------------------( SET PAGE )-------------------------------- \\
  setPage() {
    // this.paginator.setPage(this.notificationService.messageNotification.customerText.length);
  }


  // --------------------------------( SET POPUP )-------------------------------- \\
  setPopup() {
    // this.paginatorIndex = this.notificationService.messageNotification.customerText.length - 1;
  }



  // --------------------------------( ON PAGINATOR CLICK )-------------------------------- \\
  onPaginatorClick(index: number) {
    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: Notification) => {
        this.notificationService.messageNotification = notification;
      });
  }


  // --------------------------------( SET NOTIFICATION )-------------------------------- \\
  setNotification(notification: NotificationListItem, destinationArray: NotificationListItem[]) {
    this.show = false;
    let notificationIndex: number;
    let startingArray: NotificationListItem[];

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
    if (startingArray != destinationArray) {
      notificationIndex = startingArray.indexOf(notification);
      startingArray.splice(notificationIndex, 1);
      destinationArray.unshift(notification);
    }
  }


  // --------------------------------( SEND NOTIFICATION TO PENDING )-------------------------------- \\
  sendNotificationToPending(notification: NotificationListItem) {
    this.cover.showNormalCover = false;
    this.setNotification(notification, this.notificationService.pendingNotifications);
  }


  // --------------------------------( ARCHIVE NOTIFICATION )-------------------------------- \\
  archiveNotification(notification: NotificationListItem) {
    this.cover.showNormalCover = false;
    this.setNotification(notification, this.notificationService.archiveNotifications);
  }


  // -----------------------------( ON CLOSE )------------------------------ \\
  onClose(notification: NotificationListItem) {
    if (this.notificationService.selectedNotificationsTab == NotificationTab.ArchiveNotifications) {
      this.archiveNotification(notification);
    } else {
      this.sendNotificationToPending(notification);
    }
  }


  // -----------------------------( ON RIGHT BUTTON CLICK )------------------------------ \\
  onRightButtonClick(notification: NotificationListItem) {
    this.archiveNotification(notification);
    this.onSubmit(notification);
  }


  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: NotificationListItem) {

  }
}
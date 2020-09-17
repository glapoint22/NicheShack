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
import { GeneralNotification } from 'projects/manager/src/app/classes/general-notification';
import { NotificationText } from 'projects/manager/src/app/classes/notification-text';
import { MessageNotification } from 'projects/manager/src/app/classes/message-notification';

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
    this.paginatorIndex = 0;

    window.setTimeout(() => {
      this.cover.showNormalCover = true;
    })
  }


  // --------------------------------( ON PAGINATOR CLICK )-------------------------------- \\
  onPaginatorClick(index: number) {
    this.paginatorIndex = index;

    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: MessageNotification) => {
        this.notificationService.messageNotification = notification;
      });
  }


  // --------------------------------( RELOCATE NOTIFICATION )-------------------------------- \\
  relocateNotification(notification: Notification, destinationArray: NotificationListItem[]) {
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

      // Update
      this.dataService.put('api/Notifications/State', {
        id: this.notificationService.notificationIds[this.paginatorIndex],
        destinationState: destinationArray == this.notificationService.pendingNotifications ? 1 : 2
      }).subscribe();

      // Get the index of the notification that is being relocated
      notificationIndex = startingArray.findIndex(x => x.productId == notification.productId && x.type == notification.type);


      startingArray[notificationIndex].count--;


      let index: number = destinationArray.findIndex(x => x.productId == notification.productId && x.type == notification.type)

      if (index == -1) {

        let alita: NotificationListItem = {
          id: null,
          selectType: null,
          selected: null,
          productId: startingArray[notificationIndex].productId,
          name: startingArray[notificationIndex].name,
          listIcon: startingArray[notificationIndex].listIcon,
          type: startingArray[notificationIndex].type,
          state: destinationArray == this.notificationService.pendingNotifications ? 1 : 2,
          count: 1
        }

        destinationArray.unshift(alita);
      }else {
        destinationArray[index].count++;
      }


      if(startingArray[notificationIndex].count == 0) {
        startingArray.splice(notificationIndex, 1);
      }
    }
  }


  // --------------------------------( SEND NOTIFICATION TO PENDING )-------------------------------- \\
  sendNotificationToPending(notification: Notification) {
    this.cover.showNormalCover = false;
    this.relocateNotification(notification, this.notificationService.pendingNotifications);
  }


  // --------------------------------( ARCHIVE NOTIFICATION )-------------------------------- \\
  archiveNotification(notification: Notification) {
    this.cover.showNormalCover = false;
    this.relocateNotification(notification, this.notificationService.archiveNotifications);
  }


  // -----------------------------( ON CLOSE )------------------------------ \\
  onClose(notification: Notification) {
    if (this.notificationService.selectedNotificationsTab == NotificationTab.ArchiveNotifications) {
      this.archiveNotification(notification);
    } else {
      this.sendNotificationToPending(notification);
    }
  }


  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification, htmlNotes: HTMLElement, notes: NotificationText) {
    let notesText = htmlNotes.textContent.trim();

    // If a record in the database for notes has NOT yet been created
    if (notes == null) {
      // As long as some notes have actually been written in the text area
      if (notesText.length > 0) {
        // Create a new record in the database with the new notes written in the text area
        this.dataService.post('api/Notifications/NewNote', {
          notificationId: this.notificationService.notificationIds[this.paginatorIndex],
          notificationNote: htmlNotes.textContent
        }).subscribe();
      }

      // If a record in the database for notes has already been created
    } else {

      // Update the record in the database with the updated notes
      this.dataService.put('api/Notifications/UpdateNote', {
        notificationId: this.notificationService.notificationIds[this.paginatorIndex],
        notificationNote: htmlNotes.textContent
      }).subscribe();
    }

    // Send the notification to archive
    this.archiveNotification(notification);
  }
}
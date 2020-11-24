import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { DataService } from 'services/data.service';
import { NotificationTab } from 'projects/manager/src/app/classes/notification-tab';
import { NotificationListItem } from 'projects/manager/src/app/classes/notification-list-item';
import { Notification } from 'projects/manager/src/app/classes/notification';
import { NotificationText } from 'projects/manager/src/app/classes/notification-text';
import { MessageNotification } from 'projects/manager/src/app/classes/message-notification';
import { CounterComponent } from '../../../counter/counter.component';

@Component({
  selector: 'message-notification-popup',
  templateUrl: './message-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', './message-notification-popup.component.scss']
})
export class MessageNotificationPopupComponent extends PopupComponent implements OnInit {
  @ViewChild('counter', { static: false }) counter: CounterComponent;
  public counterIndex: number;
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
    this.counterIndex = 0;

    window.setTimeout(() => {
      this.cover.showNormalCover = true;
    })
  }


  // --------------------------------( ON COUNTER CLICK )-------------------------------- \\
  onCounterClick(index: number) {
    this.counterIndex = index;

    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: MessageNotification) => {
        this.notificationService.messageNotification = notification;
      });
  }


  // --------------------------------( RELOCATE NOTIFICATION )-------------------------------- \\
  relocateNotification(notification: Notification, destinationArray: NotificationListItem[]) {
    this.show = false;
    let startNotificationIndex: number;
    let destinationNotificationIndex: number;
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
        id: this.notificationService.notificationIds[this.counterIndex],
        destinationState: destinationArray == this.notificationService.pendingNotifications ? 1 : 2
      }).subscribe();

      // Get the index of the notification that is being relocated
      startNotificationIndex = startingArray.findIndex(x => x.productId == notification.productId && x.type == notification.type);
      // Then take the notification that belongs to the index we just found and decrease its count value by one
      startingArray[startNotificationIndex].count--;
      // Get the index of the notification in the destination array that is identical to the notification that is being relocated
      destinationNotificationIndex = destinationArray.findIndex(x => x.productId == notification.productId && x.type == notification.type)

      
      // If there is NOT a notification in the destination array that is identical to the notification that is being relocated
      if (destinationNotificationIndex == -1) {

        // Create a new notification with properties that match the properties of the notification that is being relocated
        let newNotification: NotificationListItem = {
          id: null,
          selectType: null,
          selected: null,
          productId: startingArray[startNotificationIndex].productId,
          name: startingArray[startNotificationIndex].name,
          listIcon: startingArray[startNotificationIndex].listIcon,
          type: startingArray[startNotificationIndex].type,
          state: destinationArray == this.notificationService.pendingNotifications ? 1 : 2,
          count: 1
        }
        // Then add that new notification to the destination array
        destinationArray.unshift(newNotification);

        // But if there is already a notification in the destination array that is identical to the notification that is being relocated
      } else {

        // Increase the count value of the notification in the destination array by one
        destinationArray[destinationNotificationIndex].count++;
      }

      // If the count value of the starting notification reaches zero
      if (startingArray[startNotificationIndex].count == 0) {
        // Remove that notification from the starting array
        startingArray.splice(startNotificationIndex, 1);
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
          notificationId: this.notificationService.notificationIds[this.counterIndex],
          notificationNote: htmlNotes.textContent
        }).subscribe();
      }

      // If a record in the database for notes has already been created
    } else {

      // Update the record in the database with the updated notes
      this.dataService.put('api/Notifications/UpdateNote', {
        notificationId: this.notificationService.notificationIds[this.counterIndex],
        notificationNote: htmlNotes.textContent
      }).subscribe();
    }

    // Send the notification to archive
    this.archiveNotification(notification);
  }
}
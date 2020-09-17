import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { DataService } from 'services/data.service';
import { NotificationTab } from 'projects/manager/src/app/classes/notification-tab';
import { NotificationListItem } from 'projects/manager/src/app/classes/notification-list-item';

@Component({
  selector: 'notification-list-popup',
  templateUrl: './notification-list-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', './notification-list-popup.component.scss']
})
export class NotificationListPopupComponent extends PopupComponent implements OnInit {
  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, dropdownMenuService: DropdownMenuService, dataService: DataService, public notificationService: NotificationService) { super(popupService, cover, menuService, dropdownMenuService, dataService) }
  public notificationTab = NotificationTab;

  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.notificationListPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.notificationService.selectedNotificationsTab = NotificationTab.NewNotifications;
  }


  // -----------------------------( LOAD ARCHIVE )------------------------------ \\
  loadArchive() {
    this.notificationService.selectedNotificationsTab = this.notificationTab.ArchiveNotifications;

    if (this.notificationService.archiveNotifications.length == 0) {
      this.dataService.get('api/Notifications/Archive')
        .subscribe((notifications: Array<NotificationListItem>) => {
          this.notificationService.archiveNotifications = notifications;
        });
    }
  }
}

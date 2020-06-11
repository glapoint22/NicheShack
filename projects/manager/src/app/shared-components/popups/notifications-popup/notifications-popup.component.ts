import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { NotificationService } from '../../../services/notification.service';
import { NotificationTab } from '../../../classes/notification';

@Component({
  selector: 'notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss', '../popup/popup.component.scss']
})
export class NotificationsPopupComponent extends PopupComponent implements OnInit {
  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, public notificationService: NotificationService) { super(popupService, cover, menuService) }
  public selectedTab: NotificationTab;
  public notificationTab = NotificationTab;

  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.notificationsPopup = this;

  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.selectedTab = NotificationTab.NewNotifications;




  }
}
import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';

@Component({
  selector: 'message-notification-popup',
  templateUrl: './message-notification-popup.component.html',
  styleUrls: ['./message-notification-popup.component.scss', '../../popup/popup.component.scss', '../../product-report-popups/product-report-popup.component.scss']
})
export class MessageNotificationPopupComponent extends PopupComponent implements OnInit {
  public paginatorIndex: number;
  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, public notificationService: NotificationService) { super(popupService, cover, menuService) }
  
  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.messageNotificationPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.paginatorIndex = this.notificationService.message.customerText.length - 1;
  }
}
import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss', '../popup/popup.component.scss']
})
export class NotificationsPopupComponent extends PopupComponent implements OnInit {
  public mediaList = [];

  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, public notificationService: NotificationService) { super(popupService, cover, menuService) }

  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.notificationsPopup = this;
    this.preventNoShow = true;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);





  }



}
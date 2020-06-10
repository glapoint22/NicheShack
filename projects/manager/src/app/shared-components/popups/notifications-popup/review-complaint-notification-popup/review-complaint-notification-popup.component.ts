import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../../popup/popup.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';

@Component({
  selector: 'review-complaint-notification-popup',
  templateUrl: './review-complaint-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../../product-report-popups/product-report-popup.component.scss', './review-complaint-notification-popup.component.scss']
})
export class ReviewComplaintNotificationPopupComponent extends PopupComponent implements OnInit {
  public paginatorIndex: number;
  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, public notificationService: NotificationService) { super(popupService, cover, menuService) }
  
  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.preventNoShow = true;
    this.popupService.reviewComplaintNotificationPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.paginatorIndex = this.notificationService.reviewComplaintNotification.customerText.length - 1;
  }
}

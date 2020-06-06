import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { ProductNotification } from '../../../classes/product-notification';
import { NotificationType } from '../../../classes/notification';

@Component({
  selector: 'notifications-popup',
  templateUrl: './notifications-popup.component.html',
  styleUrls: ['./notifications-popup.component.scss', '../popup/popup.component.scss']
})
export class NotificationsPopupComponent extends PopupComponent implements OnInit {
  public mediaList = [];



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
import { Component, OnInit } from '@angular/core';
import { ProductReportPopupComponent } from '../product-report-popup.component';
import { NotificationType } from 'projects/manager/src/app/classes/notification';

@Component({
  selector: 'product-report-other-popup',
  templateUrl: './product-report-other-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../../product-report-popups/product-report-popup.component.scss', './product-report-other-popup.component.scss']
})
export class ProductReportOtherPopupComponent extends ProductReportPopupComponent implements OnInit{
  public notificationType = NotificationType;
  
  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.productReportOtherPopup = this;
    super.ngOnInit();
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.paginatorIndex = this.notificationService.productNotification.customerText.length - 1;
  }



  onDismissButtonClick() {
    this.show = false;
    let notificationIndex = this.notificationService.newNotifications.indexOf(this.notificationService.productNotification);


    this.notificationService.newNotifications.splice(notificationIndex, 1);

    this.notificationService.archiveNotifications.unshift(this.notificationService.productNotification);

    
  }
}
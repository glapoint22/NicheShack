import { Component, OnInit } from '@angular/core';
import { ProductReportPopupComponent } from '../product-report-popup.component';

@Component({
  selector: 'product-report-image-popup',
  templateUrl: './product-report-image-popup.component.html',
  styleUrls: ['./product-report-image-popup.component.scss', '../../popup/popup.component.scss', '../../product-report-popups/product-report-popup.component.scss']
})
export class ProductReportImagePopupComponent extends ProductReportPopupComponent implements OnInit {

  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.popupService.productReportImagePopup = this;
    super.ngOnInit();
  }

  
  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.paginatorIndex = this.notificationService.productNotificationImage.customerText.length - 1;
  }
}
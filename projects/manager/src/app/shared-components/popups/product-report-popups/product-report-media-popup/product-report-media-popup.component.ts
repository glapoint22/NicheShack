import { Component, OnInit } from '@angular/core';
import { ProductReportPopupComponent } from '../product-report-popup.component';

@Component({
  selector: 'product-report-media-popup',
  templateUrl: './product-report-media-popup.component.html',
  styleUrls: ['./product-report-media-popup.component.scss', '../../popup/popup.component.scss', '../../product-report-popups/product-report-popup.component.scss']
})
export class ProductReportMediaPopupComponent extends ProductReportPopupComponent implements OnInit {
  public currentIndex: number = 0;

  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.popupService.productReportMediaPopup = this;
    super.ngOnInit();
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.paginatorIndex = this.notificationService.productNotificationMedia.customerText.length - 1;
  }
}
import { Component, OnInit } from '@angular/core';
import { ProductReportPopupComponent } from '../product-report-popup.component';

@Component({
  selector: 'product-report-description-popup',
  templateUrl: './product-report-description-popup.component.html',
  styleUrls: ['./product-report-description-popup.component.scss', '../../popup/popup.component.scss', '../../product-report-popups/product-report-popup.component.scss']
})
export class ProductReportDescriptionPopupComponent extends ProductReportPopupComponent implements OnInit {

  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.popupService.productReportDescriptionPopup = this;
    super.ngOnInit();
  }

  
  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    this.paginatorIndex = this.notificationService.productNotificationDescription.customerText.length - 1;
  }
}
import { Component, OnInit } from '@angular/core';
import { ProductReportPopupComponent } from '../product-report-popup.component';

@Component({
  selector: 'product-report-other-popup',
  templateUrl: './product-report-other-popup.component.html',
  styleUrls: ['./product-report-other-popup.component.scss', '../../popup/popup.component.scss', '../../product-report-popups/product-report-popup.component.scss']
})
export class ProductReportOtherPopupComponent extends ProductReportPopupComponent implements OnInit{


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.productReportOtherPopup = this;
  }
}
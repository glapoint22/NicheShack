import { Component, OnInit } from '@angular/core';
import { ProductReportPopupComponent } from '../product-report-popup.component';

@Component({
  selector: 'product-report-content-popup',
  templateUrl: './product-report-content-popup.component.html',
  styleUrls: ['./product-report-content-popup.component.scss', '../../popup/popup.component.scss', '../../product-report-popups/product-report-popup.component.scss']
})
export class ProductReportContentPopupComponent extends ProductReportPopupComponent implements OnInit {
  public checkList = [];
  public contentIndex: number = 0;
  public pricePointList: Array<string>;

  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.popupService.productReportContentPopup = this;
    super.ngOnInit();
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    let priceIndices: Array<Array<number>>;
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    this.paginatorIndex = this.notificationService.productNotificationContent.customerText.length - 1;
    
    // Map the content's price indices into a stand alone array
    if (this.notificationService.productNotificationContent.content) {
      priceIndices = this.notificationService.productNotificationContent.content.map(x => (x.priceIndices));
    }

    // Combine all the price point properties into one string
    if (this.notificationService.productNotificationContent.pricePoints) {
      this.pricePointList = this.notificationService.productNotificationContent.pricePoints.map(x => (
        // Text Before
        ((x.textBefore.length == 0 ? "" : x.textBefore) + " " +
          // Price
          (formatter.format(parseFloat(x.wholeNumber + "." + x.decimal))) +
          // Text After
          (x.textAfter.length == 0 ? '' : " " + x.textAfter)).trim()));
    }

    // Convert the price indices into boolean values
    if (this.notificationService.productNotificationContent.content && this.notificationService.productNotificationContent.pricePoints) {
      for (let i = 0; i < priceIndices.length; i++) {
        this.checkList[i] = [];

        for (let j = 0; j < this.notificationService.productNotificationContent.pricePoints.length; j++) {
          this.checkList[i].push(priceIndices[i].indexOf(j) != -1 ? true : false)
        }
      }
    }
  }


   // -----------------------------( NG ON CHANGES )------------------------------ \\
   ngOnChanges() {
    
  }


  // -----------------------------( ADD PRICE POINT )------------------------------ \\
  addPricePoint(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
  }


  // -----------------------------( EDIT PRICE POINT )------------------------------ \\
  editPricePoint(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
  }
}
import { Component, ViewChild, ElementRef } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'product-report-popup',
  templateUrl: './product-report-popup.component.html',
  styleUrls: ['./product-report-popup.component.scss']
})
export class ProductReportPopupComponent extends PopupComponent{
  @ViewChild('ellipsis', { static: false }) ellipsis: ElementRef;


  // --------------------------------( SHOW CONTEXT MENU )-------------------------------- \\
  showContextMenu() {
    // Build the menu
    this.menuService.buildMenu(this, this.ellipsis.nativeElement.getBoundingClientRect().right - 20, this.ellipsis.nativeElement.getBoundingClientRect().top + 22,
      this.menuService.option("Go To Product Page", null, false, this.goToProductPage),
      this.menuService.divider(),
      this.menuService.option("Go To Vendor Product Page", null, false, this.goToVendorProductPage),
      this.menuService.option("View Vendor Info", null, false, this.viewVendorInfo),
      this.menuService.option("Contact Vendor", null, true, this.contactVendor),
      this.menuService.divider(),
      this.menuService.option("Close", null, false, this.close)
    );
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage() {

  }


  // --------------------------------( GO TO VENDOR PRODUCT PAGE )-------------------------------- \\
  goToVendorProductPage() {

  }


  // --------------------------------( VIEW VENDOR INFO )-------------------------------- \\
  viewVendorInfo() {

  }


  // --------------------------------( CONTACT VENDOR )-------------------------------- \\
  contactVendor() {

  }


  // --------------------------------( CONTACT VENDOR )-------------------------------- \\
  close() {

  }
}
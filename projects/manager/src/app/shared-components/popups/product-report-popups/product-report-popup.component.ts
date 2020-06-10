import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'product-report-popup',
  templateUrl: './product-report-popup.component.html',
  styleUrls: ['./product-report-popup.component.scss']
})
export class ProductReportPopupComponent extends PopupComponent implements OnInit {
  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, public notificationService: NotificationService) { super(popupService, cover, menuService) }
  public paginatorIndex: number;
  @ViewChild('ellipsis', { static: false }) ellipsis: ElementRef;


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    // this.preventNoShow = true;
  }


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
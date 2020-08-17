import { Component, ViewChild, ElementRef } from '@angular/core';
import { MessageNotificationPopupComponent } from '../message-notification-popup/message-notification-popup.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { Vendor } from 'projects/manager/src/app/classes/vendor';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { MenuDivider } from 'projects/manager/src/app/classes/menu-divider';
import { DataService } from 'services/data.service';
import { NotificationType } from 'projects/manager/src/app/classes/notification-type';
import { NotificationTab } from 'projects/manager/src/app/classes/notification-tab';
import { NotificationListItem } from 'projects/manager/src/app/classes/notification-list-item';
import { GeneralNotification } from 'projects/manager/src/app/classes/general-notification';
import { Product } from 'projects/manager/src/app/classes/product';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { Notification } from 'projects/manager/src/app/classes/notification';

@Component({
  selector: 'general-notification-popup',
  templateUrl: './general-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './general-notification-popup.component.scss']
})
export class GeneralNotificationPopupComponent extends MessageNotificationPopupComponent {
  public notificationType = NotificationType;
  @ViewChild('ellipsis', { static: false }) ellipsis: ElementRef;
  public product: Product;


  constructor(
    popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    dataService: DataService,
    notificationService: NotificationService,
    private loadingService: LoadingService,
    private formService: FormService,
    public productService: ProductService
  ) { super(popupService, cover, menuService, dropdownMenuService, dataService, notificationService) }


  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.generalNotificationPopup = this;
  }


  // --------------------------------( ON PAGINATOR CLICK )-------------------------------- \\
  onPaginatorClick(index: number) {
    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: GeneralNotification) => {
        this.notificationService.generalNotification = notification;
      });
  }


  // --------------------------------( SHOW CONTEXT MENU )-------------------------------- \\
  showContextMenu(notification: GeneralNotification) {

    if (this.notificationService.selectedNotificationsTab == NotificationTab.ArchiveNotifications) {

      // Build the menu
      this.menuService.buildMenu(this, this.ellipsis.nativeElement.getBoundingClientRect().right - 20, this.ellipsis.nativeElement.getBoundingClientRect().top + 22,
        [
          new MenuOption("Go To Product Page", false, this.goToProductPage),
          new MenuDivider(),
          new MenuOption("Go To Vendor Product Page", false, this.goToVendorProductPage),
          new MenuOption("View Vendor Info", false, this.viewVendorInfo, [notification.vendorId]),
          new MenuDivider(),
          new MenuOption("Close", false, this.onClose, [notification]),
          new MenuDivider(),
          new MenuOption("Restore", false, this.sendNotificationToPending, [notification])
        ]
      );

    } else {
      // Build the menu
      this.menuService.buildMenu(this, this.ellipsis.nativeElement.getBoundingClientRect().right - 20, this.ellipsis.nativeElement.getBoundingClientRect().top + 22,
        [
          new MenuOption("Go To Product Page", false, this.goToProductPage),
          new MenuDivider(),
          new MenuOption("Go To Vendor Product Page", false, this.goToVendorProductPage),
          new MenuOption("View Vendor Info", false, this.viewVendorInfo, [notification.vendorId]),
          new MenuDivider(),
          new MenuOption("Close", false, this.onClose, [notification])
        ]
      );
    }
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage(productId: number) {
    // Get the product id
    if (!productId) productId = this.notificationService.generalNotification.productId;

    // Open the product
    this.productService.openProduct(productId)
      .subscribe((product: Product) => {
        this.product = product;
      });

    // Hide the cover
    this.cover.showNormalCover = false;
  }


  // --------------------------------( GO TO VENDOR PRODUCT PAGE )-------------------------------- \\
  goToVendorProductPage(hoplink: string) {
    // Get the hoplink
    if (!hoplink) hoplink = this.notificationService.generalNotification.hoplink;

    // This will open the page
    window.open(hoplink);
  }


  // --------------------------------( VIEW VENDOR INFO )-------------------------------- \\
  viewVendorInfo(vendorId: number) {
    // If we don't have a vendor id, this means it's a general notification
    if (!vendorId) vendorId = this.notificationService.generalNotification.vendorId;

    // Flag we are loading
    this.loadingService.loading = true;

    // Get the vendor info from the database
    this.dataService.get('api/Vendors/Vendor', [{ key: 'vendorId', value: vendorId }])
      .subscribe((vendor: Vendor) => {
        // Assign the vendor info and open the vendor form
        this.formService.vendorForm.vendor = vendor;
        this.formService.vendorForm.show = true;
        this.loadingService.loading = false;
      });
  }



  // -----------------------------( ON DISMISS BUTTON CLICK )------------------------------ \\
  onDismissButtonClick(notification: Notification) {
    this.archiveNotification(notification);
  }


  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification) {
    // switch (notification.name) {

    //   case NotificationType.ProductNameOther: {

    //     break;
    //   }
    //   case NotificationType.ProductReportedAsIllegal: {

    //     break;
    //   }
    //   case NotificationType.ProductReportedAsHavingAdultContent: {

    //     break;
    //   }
    //   case NotificationType.OffensiveProductOther: {

    //     break;
    //   }
    //   case NotificationType.ProductInactive: {

    //     break;
    //   }
    //   case NotificationType.ProductSiteNoLongerInService: {

    //     break;
    //   }
    //   case NotificationType.MissingProductOther: {

    //     break;
    //   }
    // }
  }
}
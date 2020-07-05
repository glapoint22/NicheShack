import { Component, ViewChild, ElementRef } from '@angular/core';
import { MessageNotificationPopupComponent } from '../message-notification-popup/message-notification-popup.component';
import { NotificationType, Notification, NotificationTab } from 'projects/manager/src/app/classes/notification';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { Vendor } from 'projects/manager/src/app/classes/vendor';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'general-notification-popup',
  templateUrl: './general-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './general-notification-popup.component.scss']
})
export class GeneralNotificationPopupComponent extends MessageNotificationPopupComponent {
  public notificationType = NotificationType;
  @ViewChild('ellipsis', { static: false }) ellipsis: ElementRef;


  constructor(
    popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    dataService: TempDataService,
    notificationService: NotificationService,
    private loadingService: LoadingService,
    private formService: FormService
  ) { super(popupService, cover, menuService, dropdownMenuService, dataService, notificationService) }


  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.generalNotificationPopup = this;
  }


  // --------------------------------( SET POPUP )-------------------------------- \\
  setPopup() {
    this.paginatorIndex = this.notificationService.generalNotification.customerText.length - 1;
  }

  // --------------------------------( SHOW CONTEXT MENU )-------------------------------- \\
  showContextMenu(notification: Notification) {

    if (this.notificationService.selectedNotificationsTab == NotificationTab.ArchiveNotifications) {

      // Build the menu
      this.menuService.buildMenu(this, this.ellipsis.nativeElement.getBoundingClientRect().right - 20, this.ellipsis.nativeElement.getBoundingClientRect().top + 22,
        this.menuService.option("Go To Product Page", null, false, this.goToProductPage),
        this.menuService.divider(),
        this.menuService.option("Go To Vendor Product Page", null, false, this.goToVendorProductPage),
        this.menuService.option("View Vendor Info", null, false, this.viewVendorInfo),
        this.menuService.option("Contact Vendor", null, true, this.contactVendor),
        this.menuService.divider(),
        this.menuService.option("Close", null, false, this.onClose, notification),
        this.menuService.divider(),
        this.menuService.option("Restore", null, false, this.sendNotificationToPending, notification)
      );

    } else {
      // Build the menu
      this.menuService.buildMenu(this, this.ellipsis.nativeElement.getBoundingClientRect().right - 20, this.ellipsis.nativeElement.getBoundingClientRect().top + 22,
        this.menuService.option("Go To Product Page", null, false, this.goToProductPage),
        this.menuService.divider(),
        this.menuService.option("Go To Vendor Product Page", null, false, this.goToVendorProductPage),
        this.menuService.option("View Vendor Info", null, false, this.viewVendorInfo),
        this.menuService.option("Contact Vendor", null, true, this.contactVendor),
        this.menuService.divider(),
        this.menuService.option("Close", null, false, this.onClose, notification)
      );
    }
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage() {

  }


  // --------------------------------( GO TO VENDOR PRODUCT PAGE )-------------------------------- \\
  goToVendorProductPage() {

  }


  // --------------------------------( VIEW VENDOR INFO )-------------------------------- \\
  viewVendorInfo(vendorId: string) {
    // If we don't have a vendor id, this means it's a general notification
    if (!vendorId) vendorId = this.notificationService.generalNotification.vendorId;

    // Flag we are loading
    this.loadingService.loading = true;

    // Get the vendor info from the database
    this.dataService.get('api/Vendors', [{ key: 'id', value: vendorId }])
      .subscribe((vendor: Vendor) => {
        // Assign the vendor info and open the vendor form
        this.formService.vendorForm.vendor = vendor;
        this.formService.vendorForm.show = true;
        this.loadingService.loading = false;
      });
  }


  // --------------------------------( CONTACT VENDOR )-------------------------------- \\
  contactVendor() {

  }



  // -----------------------------( ON DISMISS BUTTON CLICK )------------------------------ \\
  onDismissButtonClick(notification: Notification) {
    this.archiveNotification(notification);
  }


  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification) {
    switch (notification.name) {

      case NotificationType.ProductNameOther: {

        break;
      }
      case NotificationType.ProductReportedAsIllegal: {

        break;
      }
      case NotificationType.ProductReportedAsHavingAdultContent: {

        break;
      }
      case NotificationType.OffensiveProductOther: {

        break;
      }
      case NotificationType.ProductInactive: {

        break;
      }
      case NotificationType.ProductSiteNoLongerInService: {

        break;
      }
      case NotificationType.MissingProductOther: {

        break;
      }
    }
  }
}
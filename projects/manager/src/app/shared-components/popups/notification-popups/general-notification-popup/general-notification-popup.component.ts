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
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { MenuDivider } from 'projects/manager/src/app/classes/menu-divider';
import { NicheShackHierarchyItemType } from 'projects/manager/src/app/classes/hierarchy-item';

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
        [
          new MenuOption("Go To Product Page", false, this.goToProductPage),
          new MenuDivider(),
          new MenuOption("Go To Vendor Product Page", false, this.goToVendorProductPage),
          new MenuOption("View Vendor Info", false, this.viewVendorInfo),
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
          new MenuOption("View Vendor Info", false, this.viewVendorInfo),
          new MenuDivider(),
          new MenuOption("Close", false, this.onClose, [notification])
        ]
      );
    }
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage(productId: string) {
    // Get the product id
    if (!productId) productId = this.notificationService.generalNotification.productId;

    // This basically creates a selected item for the niche shack hierarchy popup
    // and in turn will display the product
    this.popupService.nicheShackHierarchyPopup.selectedItem = {
      id: productId,
      type: NicheShackHierarchyItemType.Product,
      showChildren: false,
      children: null,
      parent: null,
      childless: null,
      url: null,
      childrenUrl: null,
      childrenParameters: null,
      name: null
    }

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
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MessageNotificationPopupComponent } from '../message-notification-popup/message-notification-popup.component';
import { NotificationType, Notification, NotificationTab } from 'projects/manager/src/app/classes/notification';

@Component({
  selector: 'general-notification-popup',
  templateUrl: './general-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './general-notification-popup.component.scss']
})
export class GeneralNotificationPopupComponent extends MessageNotificationPopupComponent {
  public notificationType = NotificationType;
  @ViewChild('ellipsis', { static: false }) ellipsis: ElementRef;

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

    if(this.notificationService.selectedNotificationsTab == NotificationTab.ArchiveNotifications) {

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

    }else {
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
  viewVendorInfo() {

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
import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { DataService } from 'services/data.service';
import { ProductContentNotification } from 'projects/manager/src/app/classes/product-content-notification';
import { Notification } from 'projects/manager/src/app/classes/notification';
import { NotificationText } from 'projects/manager/src/app/classes/notification-text';

@Component({
  selector: 'product-content-notification-popup',
  templateUrl: './product-content-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss']
})
export class ProductContentNotificationPopupComponent extends GeneralNotificationPopupComponent {

  constructor(
    popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    dataService: DataService,
    notificationService: NotificationService,
    loadingService: LoadingService,
    formService: FormService,
    productService: ProductService
  ) {
    super(
      popupService,
      cover,
      menuService,
      dropdownMenuService,
      dataService, notificationService,
      loadingService,
      formService,
      productService
    )
  }


  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.productContentNotificationPopup = this;
  }


  // --------------------------------( ON PAGINATOR CLICK )-------------------------------- \\
  onPaginatorClick(index: number) {
    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: ProductContentNotification) => {
        this.notificationService.productContentNotification = notification;
      });
  }



  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    if (this.productService.product && this.productService.product.id == this.notificationService.productContentNotification.productId) {
      this.product = this.productService.product;
    } else {
      this.product = {
        id: this.notificationService.productContentNotification.productId,
        vendor: null,
        hoplink: this.notificationService.productContentNotification.hoplink,
        name: this.notificationService.productContentNotification.productName,
        rating: null,
        totalReviews: null,
        description: null,
        content: this.notificationService.productContentNotification.content,
        pricePoints: this.notificationService.productContentNotification.pricePoints,
        image: null,
        media: null,
        minPrice: this.notificationService.productContentNotification.minPrice,
        maxPrice: this.notificationService.productContentNotification.maxPrice,
        keywords: null
      }
    }
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage() {
    super.goToProductPage(this.notificationService.productContentNotification.productId);
  }


  // -----------------------------(ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification, htmlNotes: HTMLElement, notes: NotificationText) {
    super.onSubmit(notification, htmlNotes, notes);
  }
}
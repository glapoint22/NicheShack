import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { ProductMediaNotification } from 'projects/manager/src/app/classes/product-media-notification';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { DataService } from 'services/data.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { GeneralNotification } from 'projects/manager/src/app/classes/general-notification';
import { ProductService } from 'projects/manager/src/app/services/product.service';

@Component({
  selector: 'product-media-notification-popup',
  templateUrl: './product-media-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-media-notification-popup.component.scss']
})
export class ProductMediaNotificationPopupComponent extends GeneralNotificationPopupComponent {


  constructor(
    popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    dataService: DataService,
    notificationService: NotificationService,
    loadingService: LoadingService,
    formService: FormService,
    productService: ProductService,
  ) { super(popupService, cover, menuService, dropdownMenuService, dataService, notificationService, loadingService, formService, productService) }

  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.productMediaNotificationPopup = this;
  }


  // --------------------------------( ON PAGINATOR CLICK )-------------------------------- \\
  onPaginatorClick(index: number) {
    this.dataService.get('api/Notifications/Notification', [{ key: 'id', value: this.notificationService.notificationIds[index] }])
      .subscribe((notification: ProductMediaNotification) => {
        this.notificationService.productMediaNotification = notification;
      });
  }


  
  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    if (this.productService.product && this.productService.product.id == this.notificationService.productMediaNotification.productId) {
      this.product = this.productService.product;
    } else {
      this.product = {
        id: this.notificationService.productMediaNotification.productId,
        vendor: null,
        hoplink: this.notificationService.productMediaNotification.hoplink,
        name: this.notificationService.productMediaNotification.productName,
        rating: null,
        totalReviews: null,
        description: null,
        content: null,
        pricePoints: null,
        image: null,
        media: this.notificationService.productMediaNotification.media,
        minPrice: null,
        maxPrice: null,
        keywords: null
      }

      if (this.product.media.length > 0) {
        this.productService.setCurrentSelectedMedia(this.product.media[0]);
      }
      this.product.selectedMedia = this.product.media[0];
    }
  }




  
  // -----------------------------( ON SUBMIT )------------------------------ \\
  onSubmit(notification: GeneralNotification) {
    // switch (notification.name) {

    //   case NotificationType.VideosAndImagesAreDifferentFromProduct: {
        
    //     break;
    //   }
    //   case NotificationType.NotEnoughVideosAndImages: {
        
    //     break;
    //   }
    //   case NotificationType.VideosAndImagesNotClear: {
        
    //     break;
    //   }
    //   case NotificationType.VideosAndImagesMisleading: {
        
    //     break;
    //   }
    //   case NotificationType.VideosAndImagesOther: {
        
    //     break;
    //   }
    // }
  }



  // -----------------------------( VIEW VENDOR INFO )------------------------------ \\
  viewVendorInfo() {
    super.viewVendorInfo(this.notificationService.productMediaNotification.vendorId);
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage() {
    super.goToProductPage(this.notificationService.productMediaNotification.productId);
  }


  // --------------------------------( GO TO VENDOR PRODUCT PAGE )-------------------------------- \\
  goToVendorProductPage() {
    super.goToVendorProductPage(this.notificationService.productMediaNotification.hoplink);
  }
}
import { Component } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { NotificationListItem } from 'projects/manager/src/app/classes/notification-list-item';
import { ProductMediaNotification } from 'projects/manager/src/app/classes/product-media-notification';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { DataService } from 'services/data.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { GeneralNotification } from 'projects/manager/src/app/classes/general-notification';
import { ProductService } from 'projects/manager/src/app/services/product.service';

@Component({
  selector: 'product-media-notification-popup',
  templateUrl: './product-media-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-media-notification-popup.component.scss']
})
export class ProductMediaNotificationPopupComponent extends GeneralNotificationPopupComponent {
  public mediaType = MediaType;
  public currentIndex: number = 0;


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
    private promptService: PromptService
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


  // -----------------------------( ON IMAGE ICON CLICK )------------------------------ \\
  onImageIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.ProductImage;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.notificationService.productMediaNotification.media[this.currentIndex];
  }


  // -----------------------------( ON VIDEO ICON CLICK )------------------------------ \\
  onVideoIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.Video;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.media = this.notificationService.productMediaNotification.media[this.currentIndex];
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.notificationService.productMediaNotification.media[this.currentIndex];
  }



  // -----------------------------( ADD MEDIA ITEM )------------------------------ \\
  addMediaItem() {
    this.dataService.post('api/Products/Media', this.notificationService.productMediaNotification.productId)
      .subscribe((id: number) => {
        this.notificationService.productMediaNotification.media[this.currentIndex].id = id;
      });

    this.notificationService.productMediaNotification.media.push({
      id: null,
      name: null,
      url: null
    });
    this.paginator.setPage(this.notificationService.productMediaNotification.media.length);
    this.currentIndex = this.notificationService.productMediaNotification.media.length - 1;
    // this.productService.currentSelectedMedia = this.notificationService.productMediaNotification.media[this.currentIndex];
    // this.productService.scrollTop = this.currentIndex * 64;
  }




  // -----------------------------( ON DELETE CLICK )------------------------------ \\
  onDeleteClick() {
    if (this.notificationService.productMediaNotification.media.length == 0) return;

    let promptTitle = 'Delete';
    let promptMessage = 'Are you sure you want to delete this media item?';

    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteMediaItem, this);
  }


  // -----------------------------( DELETE ITEM )------------------------------ \\
  deleteMediaItem() {
    this.dataService.delete('api/Products/Media', this.notificationService.productMediaNotification.media[this.currentIndex].id)
      .subscribe();

    this.notificationService.productMediaNotification.media.splice(this.currentIndex, 1);
    this.currentIndex = Math.min(this.notificationService.productMediaNotification.media.length - 1, this.currentIndex);

    if (this.currentIndex >= 0) {
      // this.productService.currentSelectedMedia = this.notificationService.productMediaNotification.media[this.currentIndex];
      // this.productService.setCurrentSelectedMedia(this.notificationService.productMediaNotification.media[this.currentIndex]);
      // this.productService.scrollTop = this.currentIndex * 64;
      // this.currentMediaId = this.productService.currentSelectedMedia.id;
    } else {
      this.currentIndex = 0;
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
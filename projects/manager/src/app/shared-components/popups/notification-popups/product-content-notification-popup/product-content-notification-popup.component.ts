import { Component, Input } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
import { Notification } from 'projects/manager/src/app/classes/notification';
import { Item } from 'projects/manager/src/app/classes/item';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { ProductContent } from 'projects/manager/src/app/classes/product-content';
import { ProductPricePoint } from 'projects/manager/src/app/classes/product-price-point';
import { CheckboxItemListComponent } from '../../../item-lists/checkbox-item-list/checkbox-item-list.component';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { NotificationService } from 'projects/manager/src/app/services/notification.service';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PaginatorComponent } from '../../../paginator/paginator.component';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';

@Component({
  selector: 'product-content-notification-popup',
  templateUrl: './product-content-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-content-notification-popup.component.scss']
})
export class ProductContentNotificationPopupComponent extends GeneralNotificationPopupComponent {
  public contentIndex: number = 0;
  public pricePointList: Array<Item>;
  @Input() content: Array<ProductContent>;
  @Input() pricePoints: Array<ProductPricePoint>;
  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, dropdownMenuService: DropdownMenuService, notificationService: NotificationService, private loadingService: LoadingService, private promptService: PromptService, private productService: ProductService) { super(popupService, cover, menuService, dropdownMenuService, notificationService) }


  //                                                                 TEMP!!!!!!
  // ******************************************************************************************************************************************
  public addTemp(): Observable<string> {
    return of('YGFDSFSDAFW').pipe(delay(1000));
  }
  // ******************************************************************************************************************************************


  
  // --------------------------------( INITIALIZE POPUP )-------------------------------- \\
  initializePopup() {
    this.popupService.productContentNotificationPopup = this;
  }


  // --------------------------------( SET POPUP )-------------------------------- \\
  setPopup() {
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    this.paginatorIndex = this.notificationService.productContentNotification.customerText.length - 1;

    // Combine all the price point properties into one string
    if (this.notificationService.productContentNotification.pricePoints) {
      this.pricePointList = this.notificationService.productContentNotification.pricePoints.map(x => ({

        id: x.id,
        // Text Before
        name: ((x.textBefore.length == 0 ? "" : x.textBefore) + " " +
          // Price
          (formatter.format(parseFloat(x.wholeNumber + "." + x.decimal))) +
          // Text After
          (x.textAfter.length == 0 ? '' : " " + x.textAfter)).trim()
      }));
    }
  }


  // -----------------------------( ADD CONTENT )------------------------------ \\
  addContent(paginator: PaginatorComponent) {
    this.loadingService.loading = true;
    this.addTemp().subscribe((id: string) => {
      this.loadingService.loading = false;

      this.productService.product.content.push({
        id: id,
        icon: null,
        title: null,
        priceIndices: []
      });

      paginator.currentIndex = this.contentIndex = this.productService.product.content.length - 1;
    });
  }


  // -----------------------------( ON DELETE CONTENT )------------------------------ \\
  onDeleteContent(paginator: PaginatorComponent) {
    this.promptService.showPrompt('Delete Content', 'Are you sure you want to delete this content?', this.deleteContent, this, [paginator]);
  }


  // -----------------------------( DELETE CONTENT )------------------------------ \\
  deleteContent(paginator: PaginatorComponent) {
    this.productService.product.content.splice(this.contentIndex, 1);

    // Set the index of the previous content
    paginator.currentIndex = Math.max(0, this.contentIndex = Math.min(this.productService.product.content.length - 1, this.contentIndex));
  }


  // -----------------------------( ON IMAGE ICON CLICK )------------------------------ \\
  onImageIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.Icon;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.notificationService.productContentNotification.content[this.contentIndex].icon;
  }


  // -----------------------------( ADD PRICE POINT )------------------------------ \\
  addPricePoint(sourceElement: HTMLElement) {
    this.loadingService.loading = true;

    this.addTemp().subscribe((id: string) => {
      // Create the new price point
      let pricePoint: ProductPricePoint = {
        id: id,
        textBefore: '',
        textAfter: '',
        wholeNumber: 0,
        decimal: 0
      }

      // Show the price point popup
      this.popupService.sourceElement = sourceElement;
      this.popupService.pricePointPopup.show = true;


      // Push the new price point
      this.pricePoints.push(pricePoint);
      this.pricePointList.push({
        id: pricePoint.id,
        name: ''
      });

      // Set the reference to this new price point
      this.popupService.pricePointPopup.pricePoint = pricePoint;
      this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[this.pricePointList.length - 1];

      // This will set the new price point in the product properties
      this.popupService.pricePointPopup.setPricePointListItem();

      this.loadingService.loading = false;
    });
  }


  // -----------------------------( EDIT PRICE POINT )------------------------------ \\
  editPricePoint(sourceElement: HTMLElement, index: number) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
    this.popupService.pricePointPopup.pricePoint = this.pricePoints[index];
    this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[index];
  }


  // -----------------------------( ON DELETE PRICE POINT )------------------------------ \\
  onDeletePricePoint(itemList: CheckboxItemListComponent) {
    this.promptService.showPrompt('Delete Price Point', 'Are you sure you want to delete this price point?', this.deletePricePoint, this, [itemList]);
  }


  // -----------------------------( DELETE PRICE POINT )------------------------------ \\
  deletePricePoint(itemList: CheckboxItemListComponent) {
    this.pricePoints.splice(itemList.selectedListItemIndex, 1);
    // itemList.removeListItem();????????????????????????????????????????????????????????????????????????????????????????
    this.productService.setPrice();
  }


  // -----------------------------(ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification) {

  }
}
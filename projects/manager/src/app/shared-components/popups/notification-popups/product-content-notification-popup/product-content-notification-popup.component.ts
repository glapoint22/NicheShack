import { Component, Input, ViewChild } from '@angular/core';
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
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { PaginatorComponent } from '../../../paginator/paginator.component';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';
import { Image } from 'projects/manager/src/app/classes/image';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'product-content-notification-popup',
  templateUrl: './product-content-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-content-notification-popup.component.scss']
})
export class ProductContentNotificationPopupComponent extends GeneralNotificationPopupComponent {
  public contentIndex: number = 0;
  public pricePointList: Array<Item>;
  // public itemList;
  @Input() content: Array<ProductContent>;
  @Input() pricePoints: Array<ProductPricePoint>;
  @ViewChild('itemList', { static: false }) itemList: CheckboxItemListComponent;


  constructor(
    popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    dataService: TempDataService,
    notificationService: NotificationService,
    loadingService: LoadingService,
    formService: FormService,
    private promptService: PromptService,
  ) { super(popupService, cover, menuService, dropdownMenuService, dataService, notificationService, loadingService, formService) }


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

    // Set delete prompt title and message
    window.setTimeout(() => {
      // As long as the list is there to access
      if (this.itemList != null) {
        this.itemList.promptTitle = 'Delete Price Point';
        this.itemList.promptMultiTitle = 'Delete Price Points';
        this.itemList.propmtMessage = 'Are you sure you want to delete the selected price point?';
        this.itemList.propmtMultiMessage = 'Are you sure you want to delete all the selected price points?';
      }
    });
  }


  // -----------------------------( ADD CONTENT )------------------------------ \\
  addContent(paginator: PaginatorComponent) {
    this.notificationService.productContentNotification.content.push({
      id: null,
      icon: new Image(),
      title: null,
      priceIndices: []
    });

    this.contentIndex = this.notificationService.productContentNotification.content.length - 1;
    paginator.setPage(this.notificationService.productContentNotification.content.length);
  }


  // -----------------------------( ON DELETE CONTENT )------------------------------ \\
  onDeleteContent(paginator: PaginatorComponent) {
    this.promptService.showPrompt('Delete Content', 'Are you sure you want to delete this content?', this.deleteContent, this, [paginator]);
  }


  // -----------------------------( DELETE CONTENT )------------------------------ \\
  deleteContent(paginator: PaginatorComponent) {
    this.notificationService.productContentNotification.content.splice(this.contentIndex, 1);

    // Set the page for the paginator
    let index = Math.max(0, this.contentIndex = Math.min(this.notificationService.productContentNotification.content.length - 1, this.contentIndex));
    paginator.setPage(index + 1);
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
    // Create the new price point
    let pricePoint: ProductPricePoint = {
      id: null,
      textBefore: '',
      textAfter: '',
      wholeNumber: 0,
      decimal: 0
    }

    // Show the price point popup
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;


    // Push the new price point
    this.notificationService.productContentNotification.pricePoints.push(pricePoint);
    this.pricePointList.push({
      id: pricePoint.id,
      name: ''
    });

    // Set the reference to this new price point
    this.popupService.pricePointPopup.pricePoint = pricePoint;
    this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[this.pricePointList.length - 1];

    // This will set the new price point in the product properties
    this.popupService.pricePointPopup.setPricePointListItem();
  }


  // -----------------------------( EDIT PRICE POINT )------------------------------ \\
  editPricePoint(sourceElement: HTMLElement, index: number) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
    this.popupService.pricePointPopup.pricePoint = this.notificationService.productContentNotification.pricePoints[index];
    this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[index];
  }


  // -----------------------------( MOVE ARRAY ELEMENT )------------------------------ \\
  moveArrayElement(arr, move) {
    let element = arr[move.fromIndex];

    arr.splice(move.fromIndex, 1);
    arr.splice(move.toIndex, 0, element);
  }


  // -----------------------------( MOVE PRICE POINT )------------------------------ \\
  movePricePoint(move) {
    // Update the price points
    this.moveArrayElement(this.notificationService.productContentNotification.pricePoints, move);

    // Update the check list
    for(let i = 0; i < this.notificationService.productContentNotification.content.length; i++) {
      this.moveArrayElement(this.notificationService.productContentNotification.content[i].priceIndices, move)
    }

    // Then update the price point list
    this.moveArrayElement(this.pricePointList, move);
  }


  // -----------------------------( VIEW VENDOR INFO )------------------------------ \\
  viewVendorInfo() {
    super.viewVendorInfo(this.notificationService.productContentNotification.vendorId);
  }


  // --------------------------------( GO TO PRODUCT PAGE )-------------------------------- \\
  goToProductPage() {
    super.goToProductPage(this.notificationService.productContentNotification.productId);
  }


  // --------------------------------( GO TO VENDOR PRODUCT PAGE )-------------------------------- \\
  goToVendorProductPage() {
    super.goToVendorProductPage(this.notificationService.productContentNotification.hoplink);
  }


  // -----------------------------(ON SUBMIT )------------------------------ \\
  onSubmit(notification: Notification) {

  }
}
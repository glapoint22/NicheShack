import { Component, Input, ViewChild } from '@angular/core';
import { GeneralNotificationPopupComponent } from '../general-notification-popup/general-notification-popup.component';
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
import { Image } from 'projects/manager/src/app/classes/image';
import { LoadingService } from 'projects/manager/src/app/services/loading.service';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { ItemListOptions } from 'projects/manager/src/app/classes/item-list-options';
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { MenuDivider } from 'projects/manager/src/app/classes/menu-divider';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { Subscription } from 'rxjs';
import { SaveService } from 'projects/manager/src/app/services/save.service';
import { ListItem } from 'projects/manager/src/app/classes/list-item';
import { DataService } from 'services/data.service';
import { NotificationListItem } from 'projects/manager/src/app/classes/notification-list-item';
import { ProductContentNotification } from 'projects/manager/src/app/classes/product-content-notification';

@Component({
  selector: 'product-content-notification-popup',
  templateUrl: './product-content-notification-popup.component.html',
  styleUrls: ['../../popup/popup.component.scss', '../message-notification-popup/message-notification-popup.component.scss', './product-content-notification-popup.component.scss']
})
export class ProductContentNotificationPopupComponent extends GeneralNotificationPopupComponent {
  public contentIndex: number = 0;
  public pricePointList: Array<Item>;
  public itemListOptions: ItemListOptions;
  public mediaType = MediaType;

  
  private pricePointPopupSubscription: Subscription;
  
  @Input() content: Array<ProductContent>;
  @Input() pricePoints: Array<ProductPricePoint>;
  @ViewChild('itemList', { static: false }) itemList: CheckboxItemListComponent;


  constructor(
    popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    dataService: DataService,
    notificationService: NotificationService,
    loadingService: LoadingService,
    formService: FormService,
    private promptService: PromptService,
    private saveService: SaveService
  ) { super(popupService, cover, menuService, dropdownMenuService, dataService, notificationService, loadingService, formService) }


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




   // ===========================================================================================================================\\
  //                                                       [ CONTENT ]                                                          \\ 
  // ===========================================================================================================================\\



  // -----------------------------( ON ITEM CHANGE )------------------------------ \\
  onItemChange(index: number) {
    this.contentIndex = index;
  }


  // -----------------------------( ADD CONTENT )------------------------------ \\
  addContent(paginator: PaginatorComponent) {
    let content: ProductContent = {
      id: null,
      icon: new Image(),
      name: null,
      priceIndices: []
    }
    this.dataService.post('api/Products/Content', this.notificationService.productContentNotification.productId)
      .subscribe((id: string) => {
        content.id = id;
      });

      
    this.notificationService.productContentNotification.content.push(content);
    this.contentIndex = this.notificationService.productContentNotification.content.length - 1;
    paginator.setPage(this.notificationService.productContentNotification.content.length);
  }


  // -----------------------------( ON DELETE CONTENT )------------------------------ \\
  onDeleteContent(paginator: PaginatorComponent) {
    this.promptService.showPrompt('Delete Content', 'Are you sure you want to delete this content?', this.deleteContent, this, [paginator]);
  }


  // -----------------------------( DELETE CONTENT )------------------------------ \\
  deleteContent(paginator: PaginatorComponent) {
    // Delete this content from the database
    this.dataService.delete('api/Products/Content', this.notificationService.productContentNotification.content[this.contentIndex].id).subscribe();

    // Delete this content from the content array
    this.notificationService.productContentNotification.content.splice(this.contentIndex, 1);

    // Set the page for the paginator
    let index = Math.max(0, this.contentIndex = Math.min(this.notificationService.productContentNotification.content.length - 1, this.contentIndex));
    paginator.setPage(index + 1);
  }



  // ===========================================================================================================================\\
  //                                                       [ NAME ]                                                            \\
  // ===========================================================================================================================\\


  // -----------------------------( ON NAME CHANGE )------------------------------ \\
  onNameChange(value: string) {
    this.saveService.save({
      url: 'api/Products/ContentTitle',
      data: {
        id: this.notificationService.productContentNotification.content[this.contentIndex].id,
        name: value
      }
    });
  }



  // ===========================================================================================================================\\
  //                                                       [ ICON ]                                                             \\
  // ===========================================================================================================================\\



  // -----------------------------( ON IMAGE ICON CLICK )------------------------------ \\
  onImageIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.Icon;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.notificationService.productContentNotification.content[this.contentIndex].icon;
  }


  // -----------------------------( ON ICON CHANGE )------------------------------ \\
  onIconChange() {
    this.saveService.save({
      url: 'api/Products/ContentIcon',
      data: {
        ItemId: this.notificationService.productContentNotification.content[this.contentIndex].id,
        PropertyId: this.notificationService.productContentNotification.content[this.contentIndex].icon.id
      }
    });
  }



  // ===========================================================================================================================\\
  //                                                       [ PRICE POINTS ]                                                     \\
  // ===========================================================================================================================\\



  // -----------------------------( NG ON CHANGES )------------------------------ \\
  setPopup() {




    // Define the item list options
    this.itemListOptions = {
      // Current Object
      currentObj: this,
      // Menu Options
      menuOptions: () => {
        return [
          // New Price Point
          new MenuOption('New Price Point', this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
          // Edit Price Point
          new MenuOption('Edit Price Point', this.itemList.addIcon.isDisabled, this.onListItemEdit, null, 'Ctrl+Alt+E'),
          // Delete Price Point
          new MenuOption(!this.itemList.isMultiSelected ? 'Delete Price Point' : 'Delete Price Points', this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete'),
          // Divider
          new MenuDivider(),
          // Move Up
          new MenuOption("Move Up", this.itemList.selectedListItemIndex == 0 || this.itemList.isMultiSelected ? true : false, this.movePricePoint, [this.itemList.selectedListItemIndex, this.itemList.selectedListItemIndex - 1]),
          // Move Down
          new MenuOption("Move Down", this.itemList.selectedListItemIndex == this.itemList.listItems.length - 1 || this.itemList.isMultiSelected ? true : false, this.movePricePoint, [this.itemList.selectedListItemIndex, this.itemList.selectedListItemIndex + 1])
        ]
      },
      // On Add Item
      onAddItem: this.addPricePointFromMenu,
      // On Edit Item
      onEditItem: this.editPricePoint,
      // On Delete Item
      onDeleteItem: this.openDeletePrompt
    }



    // Update the price point
    this.pricePointPopupSubscription = this.popupService.pricePointPopup.onPopupClose
      .subscribe(() => {
        this.saveService.save({
          url: 'api/Products/PricePoint',
          data: this.popupService.pricePointPopup.pricePoint
        });
      });



    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    // this.paginatorIndex = this.notificationService.productContentNotification.customerText.length - 1;

    // Combine all the price point properties into one string
    if (this.notificationService.productContentNotification.pricePoints) {

      this.pricePointList = this.notificationService.productContentNotification.pricePoints.map(x => ({
        id: x.id,
        // Text Before
        name: ((!x.textBefore || x.textBefore.length == 0 ? "" : x.textBefore) + " " +
          // Price
          (formatter.format(parseFloat(x.wholeNumber + "." + x.decimal))) +
          // Text After
          (!x.textAfter || x.textAfter.length == 0 ? '' : " " + x.textAfter)).trim()
      }));
    }
  }


  // -----------------------------( ON LIST ITEM ADD )------------------------------ \\
  onListItemAdd() {
    this.itemList.onListItemAdd();
  }


  // -----------------------------( ON LIST ITEM EDIT )------------------------------ \\
  onListItemEdit() {
    this.itemList.onListItemEdit();
  }


  // -----------------------------( ON LIST ITEM DELETE )------------------------------ \\
  onListItemDelete() {
    this.itemList.onListItemDelete();
  }


  // -----------------------------( OPEN DELETE PROMPT )------------------------------ \\
  openDeletePrompt() {
    // Prompt the user
    let promptTitle = !this.itemList.isMultiSelected ? 'Delete Price Point' : 'Delete Price Points';
    let promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected price point?' : 'Are you sure you want to delete all the selected price points?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deletePricePoint, this, null, this.onPromptCancel);
  }


  // -----------------------------( SET NEW PRICE POINT )------------------------------ \\
  setNewPricePoint() {
    // Create the new price point
    let pricePoint: ProductPricePoint = {
      id: null,
      textBefore: '',
      textAfter: '',
      wholeNumber: 0,
      decimal: 0
    }

    this.dataService.post('api/Products/PricePoints', {
      productId: this.notificationService.productContentNotification.productId,
      order: 0
    })
      .subscribe((id: number) => {
        pricePoint.id = id;
      });

    // Push the new price point
    this.notificationService.productContentNotification.pricePoints.unshift(pricePoint);

    for (let i = 0; i < this.notificationService.productContentNotification.content.length; i++) {
      this.notificationService.productContentNotification.content[i].priceIndices.unshift(false);
    }

    this.pricePointList.unshift({
      id: pricePoint.id,
      name: ''
    });

    // Select the new list item
    this.itemList.selectedListItemIndex = 0;
    // Set the new list item
    this.itemList.setNewListItem(this.itemList.selectedListItemIndex);

    // Set the reference to this new price point
    this.popupService.pricePointPopup.pricePoint = pricePoint;
    this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[0];

    // This will set the new price point in the product properties
    this.popupService.pricePointPopup.setPricePointListItem();
  }


  // -----------------------------( ADD PRICE POINT FROM MENU )------------------------------ \\
  addPricePointFromMenu(originalSourceElement: HTMLElement) {
    // Set the new price point
    this.setNewPricePoint();

    window.setTimeout(() => {
      // Get reference to the new source element
      let newSourceElement: HTMLElement = this.itemList.rowItem.find((item, index) => index == 0).nativeElement;
      // Get the distance between the original source element and the new source element
      this.popupService.bottomBuffer = (originalSourceElement.getBoundingClientRect().top - newSourceElement.getBoundingClientRect().top) + 5;
      // Show the price point popup
      this.showPricePointPopup(newSourceElement);
    })
  }


  // -----------------------------( ADD PRICE POINT )------------------------------ \\
  addPricePoint(sourceElement: HTMLElement) {
    this.setNewPricePoint();
    this.popupService.bottomBuffer = 20;
    this.showPricePointPopup(sourceElement);
  }


  // -----------------------------( SHOW PRICE POINT POPUP )------------------------------ \\
  showPricePointPopup(sourceElement: HTMLElement) {
    // Show the price point popup
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
  }


  // -----------------------------( EDIT PRICE POINT )------------------------------ \\
  editPricePoint(sourceElement: HTMLElement, index: number) {
    this.popupService.bottomBuffer = 50;
    this.popupService.sourceElement = sourceElement;
    this.popupService.pricePointPopup.show = true;
    this.popupService.pricePointPopup.pricePoint = this.notificationService.productContentNotification.pricePoints[index];
    this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[index];
  }


  // -----------------------------( DELETE PRICE POINT )------------------------------ \\
  deletePricePoint() {
    let deletedPricePoints: Array<ListItem> = this.itemList.deleteListItem();

    // Loop through all the deleted price points
    for (let i = 0; i < deletedPricePoints.length; i++) {

      // Find a price point within the price point data list where its ID matches the ID of one of the deleted price points and record its index
      let index = this.notificationService.productContentNotification.pricePoints.map(x => x.id).indexOf(deletedPricePoints[i].id)

      // Remove the item from the checklist that has the recorded index
      for (let j = 0; j < this.notificationService.productContentNotification.content.length; j++) {
        this.notificationService.productContentNotification.content[j].priceIndices.splice(index, 1)
      }
      // Remove the item from the price point data list that has the recorded index 
      this.notificationService.productContentNotification.pricePoints.splice(index, 1);
    }

    // Update the database
    this.dataService.delete('api/Products/PricePoints', {
      // productId: this.product.id,
      keywords: deletedPricePoints
    }).subscribe();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }


  // -----------------------------( MOVE ARRAY ELEMENT )------------------------------ \\
  moveArrayElement(arr, fromIndex: number, toIndex: number) {
    let element = arr[fromIndex];

    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }


  // -----------------------------( MOVE PRICE POINT )------------------------------ \\
  movePricePoint(fromIndex: number, toIndex: number) {
    // Save the new order to the database
    this.saveService.save({
      url: 'api/Products/PricePointMove',
      data: {
        productId: this.notificationService.productContentNotification.productId,
        fromIndex: fromIndex,
        toIndex: toIndex
      }
    });

    // Update the price points (Price point data coming in)
    this.moveArrayElement(this.notificationService.productContentNotification.pricePoints, fromIndex, toIndex);

    // Update the check list (Check list data coming in)
    for (let i = 0; i < this.notificationService.productContentNotification.content.length; i++) {
      this.moveArrayElement(this.notificationService.productContentNotification.content[i].priceIndices, fromIndex, toIndex);
    }

    // Then update the price point list (String list)
    this.moveArrayElement(this.pricePointList, fromIndex, toIndex);

    // Select the moved price point
    this.itemList.onListItemDown(toIndex)

    // Set focus to the moved price point
    window.setTimeout(() => {
      this.itemList.setListItemFocus(this.itemList.selectedListItemIndex);
    })
  }


  // -----------------------------( ON PRICE POINT CHANGE )------------------------------ \\
  onPricePointChange() {
    this.saveService.save({
      url: 'api/Products/PriceIndices',
      data: {
        productContentId: this.notificationService.productContentNotification.content[this.contentIndex].id,
        priceIndices: this.notificationService.productContentNotification.content[this.contentIndex].priceIndices
      }
    });
  }


  // -----------------------------( NG ON DESTROY )------------------------------ \\
  ngOnDestroy() {
    this.pricePointPopupSubscription.unsubscribe();
  }
}
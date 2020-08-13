import { Component, Input, OnChanges, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { ProductPricePoint } from 'projects/manager/src/app/classes/product-price-point';
import { ProductContent } from 'projects/manager/src/app/classes/product-content';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Item } from 'projects/manager/src/app/classes/item';
import { CheckboxItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/checkbox-item-list/checkbox-item-list.component';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { Image } from 'projects/manager/src/app/classes/image';
import { Subscription } from 'rxjs';
import { SaveService } from 'projects/manager/src/app/services/save.service';
import { ItemListOptions } from 'projects/manager/src/app/classes/item-list-options';
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { MenuDivider } from 'projects/manager/src/app/classes/menu-divider';
import { ListItem } from 'projects/manager/src/app/classes/list-item';
import { Product } from 'projects/manager/src/app/classes/product';
import { DataService } from 'services/data.service';

@Component({
  selector: 'product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent implements OnInit, OnChanges, OnDestroy {
  @Input() product: Product;
  @Input() pricePoints: Array<ProductPricePoint>;
  @ViewChild('itemList', { static: false }) itemList: CheckboxItemListComponent;


  public contentIndex: number = 0;
  public pricePointList: Array<Item>;
  public mediaType = MediaType;
  public itemListOptions: ItemListOptions;
  private pricePointPopupSubscription: Subscription;


  constructor(
    public popupService: PopupService,
    private promptService: PromptService,
    private productService: ProductService,
    private dataService: DataService,
    private saveService: SaveService
  ) { }


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
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
    this.dataService.post('api/Products/Content', this.productService.product.id)
      .subscribe((id: string) => {
        content.id = id;
      });
    this.productService.product.content.push(content);
    this.contentIndex = this.productService.product.content.length - 1;
    paginator.setPage(this.productService.product.content.length);
  }


  // -----------------------------( ON DELETE CONTENT )------------------------------ \\
  onDeleteContent(paginator: PaginatorComponent) {
    this.promptService.showPrompt('Delete Content', 'Are you sure you want to delete this content?', this.deleteContent, this, [paginator]);
  }


  // -----------------------------( DELETE CONTENT )------------------------------ \\
  deleteContent(paginator: PaginatorComponent) {
    // Delete this content from the database
    this.dataService.delete('api/Products/Content', this.productService.product.content[this.contentIndex].id).subscribe();

    // Delete this content from the content array
    this.productService.product.content.splice(this.contentIndex, 1);

    // Set the page for the paginator
    let index = Math.max(0, this.contentIndex = Math.min(this.productService.product.content.length - 1, this.contentIndex));
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
        id: this.product.content[this.contentIndex].id,
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
    this.popupService.mediaBrowserPopup.media = this.product.content[this.contentIndex].icon;
  }


  // -----------------------------( ON ICON CHANGE )------------------------------ \\
  onIconChange() {
    this.saveService.save({
      url: 'api/Products/ContentIcon',
      data: {
        ItemId: this.product.content[this.contentIndex].id,
        PropertyId: this.product.content[this.contentIndex].icon.id
      }
    });
  }



  // ===========================================================================================================================\\
  //                                                       [ PRICE POINTS ]                                                     \\
  // ===========================================================================================================================\\



  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    // Combine all the price point properties into one string
    if (this.pricePoints) {

      this.pricePointList = this.pricePoints.map(x => ({
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
      productId: this.productService.product.id,
      order: 0
    })
      .subscribe((id: number) => {
        pricePoint.id = id;
      });

    // Push the new price point
    this.pricePoints.unshift(pricePoint);

    for (let i = 0; i < this.product.content.length; i++) {
      this.product.content[i].priceIndices.unshift(false);
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
    this.popupService.pricePointPopup.pricePoint = this.pricePoints[index];
    this.popupService.pricePointPopup.pricePointListItem = this.pricePointList[index];
  }


  // -----------------------------( DELETE PRICE POINT )------------------------------ \\
  deletePricePoint() {
    let deletedPricePoints: Array<ListItem> = this.itemList.deleteListItem();

    // Loop through all the deleted price points
    for (let i = 0; i < deletedPricePoints.length; i++) {

      // Find a price point within the price point data list where its ID matches the ID of one of the deleted price points and record its index
      let index = this.pricePoints.map(x => x.id).indexOf(deletedPricePoints[i].id)

      // Remove the item from the checklist that has the recorded index
      for (let j = 0; j < this.product.content.length; j++) {
        this.product.content[j].priceIndices.splice(index, 1)
      }
      // Remove the item from the price point data list that has the recorded index 
      this.pricePoints.splice(index, 1);
    }

    // Update the database
    this.dataService.delete('api/Products/PricePoints', {
      productId: this.product.id,
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
        productId: this.productService.product.id,
        fromIndex: fromIndex,
        toIndex: toIndex
      }
    });

    // Update the price points (Price point data coming in)
    this.moveArrayElement(this.pricePoints, fromIndex, toIndex);

    // Update the check list (Check list data coming in)
    for (let i = 0; i < this.product.content.length; i++) {
      this.moveArrayElement(this.product.content[i].priceIndices, fromIndex, toIndex);
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
        productContentId: this.product.content[this.contentIndex].id,
        priceIndices: this.product.content[this.contentIndex].priceIndices
      }
    });
  }


  // -----------------------------( NG ON DESTROY )------------------------------ \\
  ngOnDestroy() {
    this.pricePointPopupSubscription.unsubscribe();
  }
}
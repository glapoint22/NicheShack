import { Component, Input, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductGroupType } from 'classes/product-group-type';
import { KeyValue } from '@angular/common';
import { ProductGroupWidgetComponent } from '../../../designer/widgets/product-group-widget/product-group-widget.component';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { ItemListComponent } from '../../../item-lists/item-list/item-list.component';
import { Item } from 'projects/manager/src/app/classes/item';
import { ItemListOptions } from 'projects/manager/src/app/classes/item-list-options';
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'product-group-type',
  templateUrl: './product-group-type.component.html',
  styleUrls: ['./product-group-type.component.scss']
})
export class ProductGroupTypeComponent implements OnInit, Searchable {
  // Constructor
  constructor(private popupService: PopupService, private promptService: PromptService) { }

  // Public
  public items: Array<Item>;
  public searchResults: Array<Item>;
  public apiUrl: string = 'api/Products';
  public itemListOptions: ItemListOptions;
  public productGroupType = ProductGroupType;
  public productGroupTypes: Array<KeyValue<string, string>>;

  // Decorators
  @Input() productGroupWidget: ProductGroupWidgetComponent;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  @ViewChild('itemList', { static: false }) itemList: ItemListComponent;


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // Define the item list options
    this.itemListOptions = {
      // Current Object
      currentObj: this,
      // Menu Options
      menuOptions: () => {
        return [
          // New Featured Product
          new MenuOption('New Featured Product', this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
          // Delete Featured Product
          new MenuOption(!this.itemList.isMultiSelected ? 'Delete Featured Product' : 'Delete Featured Products', this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
        ]
      },
      // On Add Item
      onAddItem: this.openPopup,
      // On Delete Item
      onDeleteItem: this.openDeletePrompt
    }

    this.productGroupTypes = [
      { key: 'Featured Products', value: 'Featured Products' },
      { key: 'Browsed Products', value: 'Browsed Products' },
      { key: 'Related Browsed Products', value: 'Related Browsed Products' },
      { key: 'Related Bought Products', value: 'Related Bought Products' },
      { key: 'Related Wishlist Products', value: 'Related Wishlist Products' },
      { key: 'Related Subscribed Products', value: 'Related Subscribed Products' },
      { key: 'Related Browsed Niche Products', value: 'Related Browsed Niche Products' }
    ]
  }


  // -------------------------( ON DROPDOWN OPTION SELECT )------------------------ \\
  onDropdownOptionSelect(selectedOptionValue: string) {
    let index = this.productGroupTypes.findIndex(x => x.value == selectedOptionValue);
    this.productGroupWidget.productGroupType = index;
  }


  // -----------------------------( ON LIST ITEM ADD )------------------------------ \\
  onListItemAdd() {
    this.itemList.onListItemAdd();
  }


  // -----------------------------( ON LIST ITEM DELETE )------------------------------ \\
  onListItemDelete() {
    this.itemList.onListItemDelete();
  }


  // -----------------------------( OPEN DELETE PROMPT )------------------------------ \\
  openDeletePrompt() {
    // Prompt the user
    this.itemList.itemDeletionPending = true;
    let promptTitle = !this.itemList.isMultiSelected ? 'Delete Featured Product' : 'Delete Featured Products';
    let promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected featured product?' : 'Are you sure you want to delete all the selected featured products?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteFeaturedProduct, this, null, this.onPromptCancel);
  }


  // -----------------------------( ADD FEATURED PRODUCT )------------------------------ \\
  openPopup(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }


  // -----------------------------( SET SEARCH ITEM )------------------------------ \\
  setSearchItem(searchItem: any) {
    // Add the item to the list
    this.productGroupWidget.featuredProducts.unshift(searchItem);
    // Select the new list item
    this.itemList.setListItemSelection(0)
    // Save the new item to the database
    this.onChange.emit();
  }


  // -----------------------------( DELETE FEATURED PRODUCT )------------------------------ \\
  deleteFeaturedProduct() {
    this.itemList.deleteListItem();
    this.onChange.emit();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }
}
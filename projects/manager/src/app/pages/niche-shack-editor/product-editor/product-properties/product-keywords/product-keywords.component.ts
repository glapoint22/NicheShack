import { Component, Input, ViewChild } from '@angular/core';
import { ItemListOptions } from 'projects/manager/src/app/classes/item-list-options';
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { ListItem } from 'projects/manager/src/app/classes/list-item';
import { Product } from 'projects/manager/src/app/classes/product';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';
import { ItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/item-list/item-list.component';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { PopupService } from 'projects/manager/src/app/services/popup.service';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent implements Searchable<ListItem>{
  constructor(private promptService: PromptService, private dataService: DataService, private popupService: PopupService) { }

  // Public
  public itemListOptions: ItemListOptions;
  public apiUrl: string = 'api/Keywords';

  // Decorators
  @Input() product: Product;
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
          // New Keyword
          new MenuOption('New Keyword', this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
          // Delete Keyword
          new MenuOption(!this.itemList.isMultiSelected ? 'Delete Keyword' : 'Delete Keywords', this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
        ]
      },
      // On Add Item
      onAddItem: this.openPopup,
      // On Delete Item
      onDeleteItem: this.openDeletePrompt
    }
  }


  // -----------------------------( ON LIST ITEM ADD )------------------------------ \\
  onListItemAdd() {
    this.itemList.onListItemAdd();
  }


  // -----------------------------( OPEN POPUP )------------------------------ \\
  openPopup(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }


  // -----------------------------( SET SEARCH ITEM )------------------------------ \\
  setSearchItem(searchItem: ListItem) {
    // Add the item to the list
    this.product.keywords.push(searchItem);
    // Select the new list item
    this.itemList.setListItemSelection(this.itemList.listItems.length - 1);

    this.dataService.post('api/Products/Keyword', {
      productId: this.product.id,
      itemId: searchItem.id
    }).subscribe((id: number) => {
      searchItem.id = id;
    });
  }


  // -----------------------------( ON LIST ITEM DELETE )------------------------------ \\
  onListItemDelete() {
    this.itemList.onListItemDelete();
  }


  // -----------------------------( OPEN DELETE PROMPT )------------------------------ \\
  openDeletePrompt() {
    // Prompt the user
    this.itemList.itemDeletionPending = true;
    let promptTitle = !this.itemList.isMultiSelected ? 'Delete Keyword' : 'Delete Keywords';
    let promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected keyword?' : 'Are you sure you want to delete all the selected keywords?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteKeyword, this, null, this.onPromptCancel);
  }

  // -----------------------------( DELETE KEYWORD )------------------------------ \\
  deleteKeyword() {
    let deletedKeywords: Array<ListItem> = this.itemList.deleteListItem();

    this.dataService.delete('api/Products/Keyword', { ids: deletedKeywords.map(x => x.id) }).subscribe();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }
}
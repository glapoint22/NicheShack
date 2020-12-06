import { Component, Input, ViewChild } from '@angular/core';
import { ItemListOptions } from 'projects/manager/src/app/classes/item-list-options';
import { ListItem } from 'projects/manager/src/app/classes/list-item';
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { Product } from 'projects/manager/src/app/classes/product';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { ItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/item-list/item-list.component';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'product-subgroups',
  templateUrl: './product-subgroups.component.html',
  styleUrls: ['./product-subgroups.component.scss']
})
export class ProductSubgroupsComponent implements Searchable<ListItem> {
  constructor(private promptService: PromptService, private dataService: DataService, private popupService: PopupService) { }

  // Public
  public itemListOptions: ItemListOptions;
  public apiUrl: string = 'api/subgroups';

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
          // New subgroup
          new MenuOption('New subgroup', this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
          // Delete subgroup
          new MenuOption(!this.itemList.isMultiSelected ? 'Delete subgroup' : 'Delete subgroups', this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
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
    this.product.subgroups.push(searchItem);
    // Select the new list item
    this.itemList.setListItemSelection(this.itemList.listItems.length - 1);

    this.dataService.post("api/Products/subgroup", {
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
    let promptTitle = !this.itemList.isMultiSelected ? 'Delete subgroup' : 'Delete subgroups';
    let promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected subgroup?' : 'Are you sure you want to delete all the selected subgroups?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteSubgroup, this, null, this.onPromptCancel);
  }

  // -----------------------------( DELETE SUBGROUP )------------------------------ \\
  deleteSubgroup() {
    let deletedSubgroups: Array<ListItem> = this.itemList.deleteListItem();

    this.dataService.delete("api/Products/subgroup", { ids: deletedSubgroups.map(x => x.id) }).subscribe();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }
}
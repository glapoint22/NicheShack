import { Component, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';
import { Item } from '../../../classes/item';
import { ItemListOptions } from '../../../classes/item-list-options';
import { ListFormItem } from '../../../classes/list-form-item';
import { ListItem } from '../../../classes/list-item';
import { MenuOption } from '../../../classes/menu-option';
import { FormService } from '../../../services/form.service';
import { LoadingService } from '../../../services/loading.service';
import { EditableItemListComponent } from '../../item-lists/editable-item-list/editable-item-list.component';
import { FormComponent } from '../form/form.component';

@Component({
  template: '',
})
export class ListFormComponent extends FormComponent implements OnInit {
  @ViewChild('itemList', { static: false }) itemList: EditableItemListComponent;
  public items: Array<ListItem> = [];
  public itemListOptions: ItemListOptions;
  public searchInput: HTMLInputElement;
  public listFormItem: ListFormItem;


  constructor(
    formService: FormService,
    public dataService: DataService,
    public promptService: PromptService,
    public loadingService: LoadingService
  ) { super(formService) }

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
          new MenuOption('Add ' + this.listFormItem.type, this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
          // Edit Keyword
          new MenuOption('Rename ' + this.listFormItem.type, this.itemList.editIcon.isDisabled, this.onListItemEdit, null, 'Ctrl+Alt+E'),
          // Delete Keyword
          new MenuOption('Delete ' + this.listFormItem.type, this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
        ]
      },
      // On Add Item
      onAddItem: this.addItem,
      // On Add Item
      onEditItem: this.updateItem,
      // On Delete Item
      onDeleteItem: this.openDeletePrompt
    }
  }





  // -----------------------------( ON SHOW )------------------------------ \\
  onShow() {
    this.loadingService.loading = true;
    this.items = [];
    window.setTimeout(() => {
      this.initSearch();
    });

    this.getItems();
  }



  // -----------------------------( GET ITEMS )------------------------------ \\
  getItems() {
    this.dataService.get(this.listFormItem.apiUrl)
      .subscribe((items: Array<ListItem>) => {
        this.items = items;
        this.loadingService.loading = false;
      });
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
    this.itemList.itemDeletionPending = true;
    let promptTitle = !this.itemList.isMultiSelected ? 'Delete ' + this.listFormItem.type : 'Delete ' + this.listFormItem.type + 's';
    let promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete this ' +
      this.listFormItem.type.toLowerCase() + '?' : 'Are you sure you want to delete these ' +
      this.listFormItem.type.toLowerCase() + 's?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteItems, this, null, this.onPromptCancel);
  }


  // -----------------------------( ADD ITEM )------------------------------ \\
  addItem(item: Item) {
    this.dataService.post(this.listFormItem.apiUrl, {
      id: 0,
      name: item.name
    }).subscribe((id: number) => {
      item.id = id;
    });
  }


  // -----------------------------( UPDATE ITEM )------------------------------ \\
  updateItem(item: Item) {
    this.dataService.put(this.listFormItem.apiUrl, {
      id: item.id,
      name: item.name
    }).subscribe();
  }


  // -----------------------------( DELETE ITEMS )------------------------------ \\
  deleteItems() {
    let deletedItems: Array<ListItem> = this.itemList.deleteListItem();
    this.dataService.delete(this.listFormItem.apiUrl, { ids: deletedItems.map(x => x.id) }).subscribe();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }



  // -----------------------------( INIT SEARCH )------------------------------ \\
  initSearch() {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;

    fromEvent(this.searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap(() => {
          if (this.searchInput.value == '') {
            return this.dataService.get(this.listFormItem.apiUrl);
          }
          return this.dataService.get(this.listFormItem.apiUrl + '/search', [{ key: 'searchWords', value: this.searchInput.value }]);
        }))
      .subscribe((searchResults: Array<ListItem>) => {
        this.items = searchResults;
      });
  }




  // -----------------------------( CLEAR SEARCH RESULTS )------------------------------ \\
  clearSearchResults(input: HTMLInputElement) {
    input.value = '';
    this.getItems();
  }





  // --------------------------------( ON ESCAPE KEY DOWN )-------------------------------- \\
  onEscapeKeydown() {
    if (!this.itemList) return;
    if (this.itemList.selectedListItemIndex == null && this.itemList.indexOfEditedListItem == null) {
      super.onEscapeKeydown();
    }
  }
}
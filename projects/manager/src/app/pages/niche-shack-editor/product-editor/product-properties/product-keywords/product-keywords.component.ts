import { Component, Input, ViewChild } from '@angular/core';
import { EditableItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/editable-item-list/editable-item-list.component';
import { Item } from 'projects/manager/src/app/classes/item';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { ItemListOptions } from 'projects/manager/src/app/classes/item-list-options';
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { ListItem } from 'projects/manager/src/app/classes/list-item';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent {
  // Constructor
  constructor(private promptService: PromptService) { }

  // Public
  public itemListOptions: ItemListOptions;

  // Decorators
  @Input() keywords: Array<Item>;
  @ViewChild('itemList', { static: false }) itemList: EditableItemListComponent;


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
          // Edit Keyword
          new MenuOption('Edit Keyword', this.itemList.editIcon.isDisabled, this.onListItemEdit, null, 'Ctrl+Alt+E'),
          // Delete Keyword
          new MenuOption(!this.itemList.isMultiSelected ? 'Delete Keyword' : 'Delete Keywords', this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
        ]
      },
      // On Add Item
      onAddItem: this.postKeyword,
      // On Add Item
      onEditItem: this.updateKeyword,
      // On Delete Item
      onDeleteItem: this.openDeletePrompt
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
    let promptTitle = !this.itemList.isMultiSelected ? 'Delete Keyword' : 'Delete Keywords';
    let promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected keyword?' : 'Are you sure you want to delete all the selected keywords?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteKeyword, this, null, this.onPromptCancel);
  }


  // -----------------------------( POST KEYWORD )------------------------------ \\
  postKeyword(keyword: ListItem) {
    
  }


  // -----------------------------( UPDATE KEYWORD )------------------------------ \\
  updateKeyword(keyword: ListItem) {
    
  }


  // -----------------------------( DELETE KEYWORD )------------------------------ \\
  deleteKeyword() {
    let deletedKeywords: Array<ListItem> = this.itemList.deleteListItem();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }
}
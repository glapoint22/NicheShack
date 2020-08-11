import { Component, Input, ViewChild } from '@angular/core';
import { EditableItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/editable-item-list/editable-item-list.component';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { ItemListOptions } from 'projects/manager/src/app/classes/item-list-options';
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { ListItem } from 'projects/manager/src/app/classes/list-item';
import { Product } from 'projects/manager/src/app/classes/product';
import { SaveService } from 'projects/manager/src/app/services/save.service';
import { DataService } from 'services/data.service';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent {
  // Decorators
  @Input() product: Product;
  @ViewChild('itemList', { static: false }) itemList: EditableItemListComponent;
  public itemListOptions: ItemListOptions;
  private apiUrl: string = 'api/Products/Keyword';


  constructor(
    private promptService: PromptService,
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
    this.dataService.post(this.apiUrl, {
      productId: this.product.id,
      keywordName: keyword.name
    }).subscribe((id: number) => {
      keyword.id = id;
    });
  }


  // -----------------------------( UPDATE KEYWORD )------------------------------ \\
  updateKeyword(keyword: ListItem) {
    // Update the keyword
    this.saveService.save({
      url: this.apiUrl,
      data: {
        id: keyword.id,
        name: keyword.name
      }
    });
  }


  // -----------------------------( DELETE KEYWORD )------------------------------ \\
  deleteKeyword() {
    let deletedKeywords: Array<ListItem> = this.itemList.deleteListItem();

    this.dataService.delete(this.apiUrl, {
      productId: this.product.id,
      keywords: deletedKeywords
    }).subscribe();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }
}
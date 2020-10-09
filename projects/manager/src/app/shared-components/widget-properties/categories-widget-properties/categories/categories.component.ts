import { Component, Input, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { CategoriesWidgetComponent } from '../../../designer/widgets/categories-widget/categories-widget.component';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { ItemListComponent } from '../../../item-lists/item-list/item-list.component';
import { Item } from 'projects/manager/src/app/classes/item';
import { ItemListOptions } from 'projects/manager/src/app/classes/item-list-options';
import { MenuOption } from 'projects/manager/src/app/classes/menu-option';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements Searchable, OnInit {
  @Input() categoriesWidget: CategoriesWidgetComponent;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  @ViewChild('itemList', { static: false }) itemList: ItemListComponent;


  // Public
  public items: Array<Item>;
  public searchResults: Array<Item>;
  public itemListOptions: ItemListOptions;
  public apiUrl: string = 'api/Categories/Detail';



  constructor(private popupService: PopupService, private promptService: PromptService) { }


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // Define the item list options
    this.itemListOptions = {
      // Current Object
      currentObj: this,
      // Menu Options
      menuOptions: () => {
        return [
          // New Category
          new MenuOption('New Category', this.itemList.addIcon.isDisabled, this.onListItemAdd, null, 'Ctrl+Alt+N'),
          // Delete Category
          new MenuOption(!this.itemList.isMultiSelected ? 'Delete Category' : 'Delete Categories', this.itemList.deleteIcon.isDisabled, this.onListItemDelete, null, 'Delete')
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


  // -----------------------------( ON LIST ITEM DELETE )------------------------------ \\
  onListItemDelete() {
    this.itemList.onListItemDelete();
  }


  // -----------------------------( OPEN DELETE PROMPT )------------------------------ \\
  openDeletePrompt() {
    // Prompt the user
    this.itemList.itemDeletionPending = true;
    let promptTitle = !this.itemList.isMultiSelected ? 'Delete Category' : 'Delete Categories';
    let promptMessage = !this.itemList.isMultiSelected ? 'Are you sure you want to delete the selected category?' : 'Are you sure you want to delete all the selected categories?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteCategory, this, null, this.onPromptCancel);
  }


  // -----------------------------( OPEN POPUP )------------------------------ \\
  openPopup(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }


  // -----------------------------( SET SEARCH ITEM )------------------------------ \\
  setSearchItem(searchItem: any) {
    // Add the item to the list
    this.categoriesWidget.categories.unshift(searchItem);
    // Select the new list item
    this.itemList.setListItemSelection(0)
    // Save the new item to the database
    this.onChange.emit();
  }


  // -----------------------------( DELETE CATEGORY )------------------------------ \\
  deleteCategory() {
    this.itemList.deleteListItem();
    this.onChange.emit();
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemList.onPromptCancel()
  }
}
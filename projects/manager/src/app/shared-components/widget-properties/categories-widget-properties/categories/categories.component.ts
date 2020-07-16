import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { CategoriesWidgetComponent } from '../../../designer/widgets/categories-widget/categories-widget.component';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { ItemListComponent } from '../../../item-lists/item-list/item-list.component';
import { Item } from 'projects/manager/src/app/classes/item';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements Searchable {
  @Input() categoriesWidget: CategoriesWidgetComponent;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  @ViewChild('itemList', { static: false }) itemList: ItemListComponent;
  public apiUrl: string = 'api/Categories';
  public searchResults: Array<Item>;
  public items: Array<Item>;


  constructor(private popupService: PopupService, private promptService: PromptService) { }


  // -----------------------------( NG AFTER VIEW INIT )------------------------------ \\
  ngAfterViewInit() {
    // Set delete prompt title and message
    this.itemList.promptTitle = 'Delete Category';
    this.itemList.promptMultiTitle = 'Delete Categories';
    this.itemList.propmtMessage = 'Are you sure you want to delete the selected category?';
    this.itemList.propmtMultiMessage = 'Are you sure you want to delete all the selected categories?';
  }


  // -----------------------------( ADD CATEGORY )------------------------------ \\
  addCategory(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }
  


  // -----------------------------( SET SEARCH ITEM )------------------------------ \\
  setSearchItem(searchItem: any) {
    // Add the item to the list
    this.categoriesWidget.categories.push(searchItem);

    this.onChange.emit();
  }
}
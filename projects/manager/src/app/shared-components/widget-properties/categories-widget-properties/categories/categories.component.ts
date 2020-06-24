import { Component, Input, ViewChild } from '@angular/core';
import { CategoriesWidgetComponent } from '../../../designer/widgets/categories-widget/categories-widget.component';
import { Searchable } from 'projects/manager/src/app/classes/searchable';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { ItemListComponent } from '../../../item-lists/item-list/item-list.component';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements Searchable {
  @Input() categoriesWidget: CategoriesWidgetComponent;
  @ViewChild('itemList', { static: false }) itemList: ItemListComponent;

  public searchUrl: string = 'api/Categories';

  constructor(private popupService: PopupService, private promptService: PromptService) { }



  // -----------------------------( ADD CATEGORY )------------------------------ \\
  addCategory(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.searchPopup.searchable = this;
    this.popupService.searchPopup.show = !this.popupService.searchPopup.show;
  }
  


  // -----------------------------( SET SEARCH ITEM )------------------------------ \\
  setSearchItem(searchItem: any) {
    // Add the item to the list
    // this.itemList.addListItem(searchItem);
    this.categoriesWidget.categories.push(searchItem)
  }


  // -----------------------------( ON REMOVE CATEGORY CLICK )------------------------------ \\
  onRemoveCategoryClick() {
    if (!this.itemList.deleteIcon.isDisabled) {
      this.promptService.showPrompt('Remove Category', 'Are you sure you want to remove this category?', this.removeCategory, this);
    }

  }


  // -----------------------------( REMOVE CATEGORY )------------------------------ \\
  removeCategory() {
    this.itemList.deleteListItem();
  }
}
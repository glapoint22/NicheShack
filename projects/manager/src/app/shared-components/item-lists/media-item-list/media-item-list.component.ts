import { Component, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { EditableItemListComponent } from '../editable-item-list/editable-item-list.component';

@Component({
  selector: 'media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.scss']
})
export class MediaItemListComponent extends EditableItemListComponent {
  @Input() mediaList: Array<string>;
  @ViewChildren('rowItem') rowItem: QueryList<ElementRef>;


  // -----------------------------( SET FOCUS TO LIST ITEM )------------------------------ \\
  setFocusToListItem() {
    let rowItem = this.rowItem.find((item, index) => index == this.indexOfEditedListItem).nativeElement;
    rowItem.focus();
  }


  // -----------------------------( BUILD CONTEXT MENU )------------------------------ \\
  buildContextMenu(e: MouseEvent) {
    // Build the context menu
    this.menuService.buildMenu(this, e.clientX + 3, e.clientY,
      // Add
      this.menuService.option(this.menuOptions[0], "Ctrl+Alt+A", this.isAddDisabled, this.setListItemAdd),
      // Edit
      this.menuService.option(this.menuOptions[1], "Ctrl+Alt+E", this.isEditDisabled, this.editListItem),
      // Delete
      this.menuService.option(this.isDeleteDisabled ? this.menuOptions[2] : this.isEditDisabled ? this.menuOptions[3] : this.menuOptions[2], "Delete", this.isDeleteDisabled, this.deleteListItem),
      // Move To
      this.menuService.subMenu("Move To", false,
        this.menuService.option("Background Images", null, false, this.alita),
        this.menuService.option("Banner Images", null, false, this.alita),
        this.menuService.option("Category Images", null, false, this.alita),
        this.menuService.option("Designer Images", null, false, this.alita),
        this.menuService.option("Icon Images", null, false, this.alita),
        this.menuService.option("Product Images", null, false, this.alita)));
  }


  // -----------------------------( SET LIST ITEM ADD )------------------------------ \\
  setListItemAdd() {
      this.mediaList.unshift('81af3c1dcb6745ae932883d2f69e0b66.png');
      super.setListItemAdd();
  }


  // -----------------------------( REMOVE LIST ITEM )------------------------------ \\
  removeListItem(deletedListItemIndex: number) {
    this.mediaList.splice(deletedListItemIndex, 1);
    super.removeListItem(deletedListItemIndex);
  }


  

 



  // -----------------------------( ALITA )------------------------------ \\
  alita() {

  }
}
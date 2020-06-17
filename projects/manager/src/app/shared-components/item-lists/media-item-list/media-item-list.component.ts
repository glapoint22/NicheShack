import { Component, Input, ViewChildren, QueryList, ElementRef, Output, EventEmitter } from '@angular/core';
import { EditableItemListComponent } from '../editable-item-list/editable-item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MediaItem } from '../../../classes/media-item';

@Component({
  selector: 'media-item-list',
  templateUrl: './media-item-list.component.html',
  styleUrls: ['./media-item-list.component.scss']
})
export class MediaItemListComponent extends EditableItemListComponent {
  public selectType = SelectType;
  @Input() listItems: Array<MediaItem>;
  @ViewChildren('rowItem') rowItem: QueryList<ElementRef>;
  @Output() onAddMedia: EventEmitter<void> = new EventEmitter();
  

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
      this.menuService.option(this.menuOptions[0], "Ctrl+Alt+A", this.addIcon.isDisabled, ()=> this.onAddMedia.emit()),
      // Edit
      this.menuService.option(this.menuOptions[1], "Ctrl+Alt+E", this.editIcon.isDisabled, this.editListItem),
      // Delete
      this.menuService.option(this.deleteIcon.isDisabled ? this.menuOptions[2] : this.editIcon.isDisabled ? this.menuOptions[3] : this.menuOptions[2], "Delete", this.deleteIcon.isDisabled, this.deleteListItem),
      // Move To
      this.menuService.subMenu("Move To", false,
        this.menuService.option("Images", null, false, ()=>{}),
        this.menuService.option("Background Images", null, false, ()=>{}),
        this.menuService.option("Banner Images", null, false, ()=>{}),
        this.menuService.option("Category Images", null, false, ()=>{}),
        this.menuService.option("Product Images", null, false, ()=>{})));
        this.menuService.option("Icons", null, false, ()=>{})
  }
}
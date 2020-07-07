import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';

@Component({
  selector: 'checkbox-item-list',
  templateUrl: './checkbox-item-list.component.html',
  styleUrls: ['../item-list/item-list.component.scss']
})
export class CheckboxItemListComponent extends ItemListComponent implements OnInit {
  @Input() checkList: Array<boolean>;
  @Output() onPricePointMove: EventEmitter<{fromIndex: number, toIndex: number}> = new EventEmitter();
  public selectType = SelectType;


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // When the price point popup becomes hidden
    this.popupService.pricePointPopup.onPopupHide.subscribe(() => {
      // If a list item is selected
      if (this.selectedListItemIndex != null) {
        // Set the focus back to that list item
        this.setListItemFocus(this.selectedListItemIndex)
      }
    });
  }


  // -----------------------------( SET LIST ITEM BLUR )------------------------------ \\
  setListItemBlur() {
    // As long as the price point popup is NOT open
    if (!this.popupService.pricePointPopup.show) {
      super.setListItemBlur();
    }
  }


  // -----------------------------( BUILD CONTEXT MENU )------------------------------ \\
  buildContextMenu(e: MouseEvent) {
    // Build the context menu
    this.menuService.buildMenu(this, e.clientX + 3, e.clientY,

      this.menuService.option("Move Up", null, this.selectedListItemIndex == 0 || this.editIcon.isDisabled ? true : false, this.movePricePoint, this.selectedListItemIndex, this.selectedListItemIndex - 1),

      this.menuService.option("Move Down", null, this.selectedListItemIndex == this.listItems.length - 1 || this.editIcon.isDisabled ? true : false, this.movePricePoint, this.selectedListItemIndex, this.selectedListItemIndex + 1),

      // Divider
      this.menuService.divider(),
      // Add
      this.menuService.option(this.menuOptions[0], "Ctrl+Alt+N", this.addIcon.isDisabled, this.onListItemAdd),
      // Edit
      this.menuOptions[1] == null ? {} : this.menuService.option(this.menuOptions[1], "Ctrl+Alt+E", this.editIcon.isDisabled, this.onListItemEdit),
      // Delete
      this.menuService.option(this.deleteIcon.isDisabled ? this.menuOptions[2] : this.editIcon.isDisabled ? this.menuOptions[3] : this.menuOptions[2], "Delete", this.deleteIcon.isDisabled, this.onListItemDelete),
    );
  }


  // -----------------------------( MOVE PRICE POINT )------------------------------ \\
  movePricePoint(fromIndex: number, toIndex: number) {
    // Output the move values
    this.onPricePointMove.emit({fromIndex, toIndex});

    // Select the moved price point
    this.onListItemDown(toIndex)

    // Set focus to the moved price point
    window.setTimeout(()=> {
      this.setListItemFocus(this.selectedListItemIndex);
    })
  }
}
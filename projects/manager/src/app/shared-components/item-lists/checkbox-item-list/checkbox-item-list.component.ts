import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { MenuOption } from '../../../classes/menu-option';
import { MenuDivider } from '../../../classes/menu-divider';

@Component({
  selector: 'checkbox-item-list',
  templateUrl: './checkbox-item-list.component.html',
  styleUrls: ['../item-list/item-list.component.scss']
})
export class CheckboxItemListComponent extends ItemListComponent implements OnInit {
  @Input() checkList: Array<boolean>;
  @Output() onPricePointMove: EventEmitter<{ fromIndex: number, toIndex: number }> = new EventEmitter();
  public selectType = SelectType;


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // When the price point popup becomes hidden
    this.popupService.pricePointPopup.onPopupClose.subscribe(() => {
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
      [
        // Move Up
        new MenuOption("Move Up", this.selectedListItemIndex == 0 || this.editIcon.isDisabled ? true : false, this.movePricePoint, [this.selectedListItemIndex, this.selectedListItemIndex - 1]),
        // Move Down
        new MenuOption("Move Down", this.selectedListItemIndex == this.listItems.length - 1 || this.editIcon.isDisabled ? true : false, this.movePricePoint, [this.selectedListItemIndex, this.selectedListItemIndex + 1]),
        // Divider
        new MenuDivider(),
        // Add
        new MenuOption(this.menuOptions[0], this.addIcon.isDisabled, this.onListItemAdd, null, "Ctrl+Alt+N"),
        // Edit
        new MenuOption(this.menuOptions[1], this.editIcon.isDisabled, this.onListItemEdit, null, "Ctrl+Alt+E"),
        // Delete
        new MenuOption(this.deleteIcon.isDisabled ? this.menuOptions[2] : this.editIcon.isDisabled ? this.menuOptions[3] : this.menuOptions[2], this.deleteIcon.isDisabled, this.onListItemDelete, null, "Delete"),
      ]
    );
  }


  // -----------------------------( MOVE PRICE POINT )------------------------------ \\
  movePricePoint(fromIndex: number, toIndex: number) {
    // Output the move values
    this.onPricePointMove.emit({ fromIndex, toIndex });

    // Select the moved price point
    this.onListItemDown(toIndex)

    // Set focus to the moved price point
    window.setTimeout(() => {
      this.setListItemFocus(this.selectedListItemIndex);
    })
  }
}
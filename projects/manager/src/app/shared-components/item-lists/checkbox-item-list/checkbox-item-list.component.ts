import { Component, Input, OnInit } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';

@Component({
  selector: 'checkbox-item-list',
  templateUrl: './checkbox-item-list.component.html',
  styleUrls: ['../item-list/item-list.component.scss']
})
export class CheckboxItemListComponent extends ItemListComponent implements OnInit{
  @Input() checkList: Array<boolean>;
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
    // If the price point popup is NOT open
    if (!this.popupService.pricePointPopup.show) {
      super.setListItemBlur();
    }
  }
}
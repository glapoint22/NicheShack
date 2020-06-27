import { Component, Input, ViewChild } from '@angular/core';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';
import { EditableItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/editable-item-list/editable-item-list.component';
import { Product } from 'projects/manager/src/app/classes/product';
import { Item } from 'projects/manager/src/app/classes/item';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent {
  @Input() product: Product;
  @ViewChild('itemList', { static: false }) itemList: EditableItemListComponent;
  public keywords: Array<string>;

  constructor(private dataService: TempDataService) { }


  // -----------------------------( ON PANEL CLICK )------------------------------ \\
  onPanelClick(expanded: boolean) {
    if (expanded) {
      if (!this.keywords) {
        this.itemList.addIcon.isDisabled = true;
        this.dataService.get('api/Products/Keywords', [{ key: 'productId', value: this.product.id }])
          .subscribe((keywords: Array<string>) => {
            this.keywords = keywords;
            this.itemList.addIcon.isDisabled = false;
          });
      }
    }
  }




  // -----------------------------( ON CHANGE )------------------------------ \\
  onChange(item: Item) {
    let keyword: Item;

    // If we have any keywords
    if (this.product.keywords) {
      // Find the keyword in the array
      if (item.id) {
        keyword = this.product.keywords.find(x => x.id == item.id);
      }


      // We have no keywords so initialize new keywords with a length of zero
    } else {
      this.product.keywords = [];
    }

    // If we have a keyword, update it
    if (keyword) {
      keyword.name = item.name;

      // This keyword does not exist in the array, add it
    } else {
      this.product.keywords.push({
        id: item.id,
        name: item.name
      });
    }
  }
}
import { Component, Input, ViewChild } from '@angular/core';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';
import { EditableItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/editable-item-list/editable-item-list.component';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent {
  @Input() productId: string;
  @ViewChild('itemList', { static: false }) itemList: EditableItemListComponent;
  public keywords: Array<string>;

  constructor(private dataService: TempDataService) { }


  // -----------------------------( ON PANEL CLICK )------------------------------ \\
  onPanelClick(expanded: boolean) {
    if (expanded) {
      if (!this.keywords) {
        this.itemList.addIcon.isDisabled = true;
        this.dataService.get('api/Keywords', [{ key: 'productId', value: this.productId }])
          .subscribe((keywords: Array<string>) => {
            this.keywords = keywords;
            this.itemList.addIcon.isDisabled = false;
          });
      }
    }
  }
}
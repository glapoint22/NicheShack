import { Component, Input, ViewChild } from '@angular/core';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';
import { EditableItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/editable-item-list/editable-item-list.component';
import { ListItem } from 'projects/manager/src/app/classes/list-item';

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
        this.dataService.get('api/Products/Keywords', [{ key: 'productId', value: this.productId }])
          .subscribe((keywords: Array<string>) => {
            this.keywords = keywords;
            this.itemList.addIcon.isDisabled = false;
          });
      }
    }
  }


  post(keyword: ListItem) {
    keyword.loading = true;
    this.dataService.post('api/Products/Keywords', keyword.name)
      .subscribe((id: string) => {
        keyword.loading = false;
        keyword.id = id;
      });
  }

  
  update(keyword: ListItem) {
    keyword.loading = true;
    this.dataService.put('api/Products/Keywords', keyword.name)
      .subscribe(() => {
        keyword.loading = false;
      });
  }
}
import { Component, Input, ViewChild } from '@angular/core';
import { EditableItemListComponent } from 'projects/manager/src/app/shared-components/item-lists/editable-item-list/editable-item-list.component';
import { Item } from 'projects/manager/src/app/classes/item';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent {
  @Input() keywords: Array<Item>;
  @ViewChild('itemList', { static: false }) itemList: EditableItemListComponent;
  


  // -----------------------------( NG AFTER VIEW INIT )------------------------------ \\
  ngAfterViewInit() {
    // Set delete prompt title and message
    this.itemList.promptTitle = 'Delete Keyword';
    this.itemList.promptMultiTitle = 'Delete Keywords';
    this.itemList.propmtMessage = 'Are you sure you want to delete the selected keyword?';
    this.itemList.propmtMultiMessage = 'Are you sure you want to delete all the selected keywords?';
  }
}
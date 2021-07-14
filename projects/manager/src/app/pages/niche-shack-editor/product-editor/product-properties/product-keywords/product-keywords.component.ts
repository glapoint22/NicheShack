import { Component, Input, ViewChild } from '@angular/core';
import { HierarchyItem } from 'projects/manager/src/app/classes/hierarchy-item';
import { Product } from 'projects/manager/src/app/classes/product';
import { DataService } from 'services/data.service';
import { AvailableKeywordsComponent } from './available-keywords/available-keywords.component';
import { SelectedKeywordsComponent } from './selected-keywords/selected-keywords.component';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss']
})
export class ProductKeywordsComponent {
  @Input() product: Product;
  @ViewChild('availableKeywords', { static: false }) availableKeywords: AvailableKeywordsComponent;
  @ViewChild('selectedKeywords', { static: false }) selectedKeywords: SelectedKeywordsComponent;
  public isAddButtonDisabled: boolean = true;

  constructor(private dataService: DataService) { }

  ngAfterContentChecked() {
    if (this.availableKeywords) {
      this.isAddButtonDisabled = !this.availableKeywords.selectedItem ||
        this.availableKeywords.selectedItem.type == 1 ||
        this.selectedKeywords.items.some(x => x.id == this.availableKeywords.selectedItem.id);
    }
  }

  onAddButtonClick() {
    this.selectedKeywords.selectedItem = null;
    let item: HierarchyItem = this.selectedKeywords.createItem();

    item.id = this.availableKeywords.selectedItem.id;
    item.name = this.availableKeywords.selectedItem.name;
    this.selectedKeywords.items.unshift(item);
    this.selectedKeywords.mapItems([item]);
    this.selectedKeywords.selectedItem = item;

    this.dataService
      .post('api/SelectedKeywords/Groups/Add', { id: this.availableKeywords.selectedItem.id, productId: this.product.id })
      .subscribe();
  }


}
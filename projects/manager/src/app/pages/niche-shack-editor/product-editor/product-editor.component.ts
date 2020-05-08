import { Component, Input } from '@angular/core';
import { Product } from '../../../classes/product';
import { HierarchyItem } from '../../../classes/hierarchy-item';

@Component({
  selector: 'product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent {
  @Input() hierarchyItem: HierarchyItem;
  public product: Product = new Product();

  ngOnChanges() {
    this.product.id = this.hierarchyItem.id;
  }
}
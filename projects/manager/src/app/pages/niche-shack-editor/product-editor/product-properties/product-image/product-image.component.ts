import { Component, Input } from '@angular/core';
import { Product } from 'projects/manager/src/app/classes/product';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { DataService } from 'services/data.service';

@Component({
  selector: 'product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent {
  @Input() product: Product;
  public mediaType = MediaType;

  constructor(private dataService: DataService) { }

  onChange() {
    this.dataService.put('api/Products/Image', {
      itemId: this.product.id,
      propertyId: this.product.image.id
    }).subscribe();
  }
}
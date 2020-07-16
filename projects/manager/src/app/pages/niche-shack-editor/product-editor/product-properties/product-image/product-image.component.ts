import { Component, Input } from '@angular/core';
import { Product } from 'projects/manager/src/app/classes/product';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { SaveService } from 'projects/manager/src/app/services/save.service';

@Component({
  selector: 'product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent {
  @Input() product: Product;
  public mediaType = MediaType;

  constructor(private saveService: SaveService) { }

  onChange() {
      this.saveService.save({
        url: 'api/Products/Image',
        data: this.product
      });
  }
}
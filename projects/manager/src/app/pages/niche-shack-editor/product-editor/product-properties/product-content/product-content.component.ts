import { Component, Input } from '@angular/core';
import { ProductContent } from 'projects/manager/src/app/classes/product-content';
import { ProductPricePoint } from 'projects/manager/src/app/classes/product-price-point';

@Component({
  selector: 'product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent {
  @Input() content: Array<ProductContent>;
  @Input() pricePoints: Array<ProductPricePoint>;
}
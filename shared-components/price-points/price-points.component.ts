import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShippingType } from 'classes/shipping-type';
import { Product } from 'projects/manager/src/app/classes/product';

@Component({
  selector: 'price-points',
  templateUrl: './price-points.component.html',
  styleUrls: ['./price-points.component.scss']
})
export class PricePointsComponent {
  constructor() { }
  public shippingType = ShippingType;
  @Input() product: Product;
  @Output() onBuyClick: EventEmitter<string> = new EventEmitter();
}
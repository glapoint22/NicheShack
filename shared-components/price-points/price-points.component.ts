import { Component, Input, OnInit } from '@angular/core';
import { ShippingType } from 'classes/shipping-type';
import { Product } from 'projects/manager/src/app/classes/product';

@Component({
  selector: 'price-points',
  templateUrl: './price-points.component.html',
  styleUrls: ['./price-points.component.scss']
})
export class PricePointsComponent implements OnInit {
  constructor() { }
  public shippingType = ShippingType;
  @Input() product: Product;

  ngOnInit() {
  }

}

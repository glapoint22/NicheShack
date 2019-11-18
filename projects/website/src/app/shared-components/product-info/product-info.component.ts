import { Component, OnInit, Input } from '@angular/core';
import { ProductInfo } from '../../interfaces/product-info';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  @Input() productInfo: ProductInfo;

  constructor() { }

  ngOnInit() {
  }

}

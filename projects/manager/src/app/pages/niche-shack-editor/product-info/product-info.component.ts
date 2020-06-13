import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {

  constructor(public productService: ProductService) { }

  ngOnInit() {
  }

  onBuyClick(url: string) {
    window.open(url);
  }

}

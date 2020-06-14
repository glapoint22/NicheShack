import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ProductMediaType } from '../../../classes/media';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public productMediaType = ProductMediaType;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.product = null;
  }

  onBuyClick(url: string) {
    window.open(url);
  }

}

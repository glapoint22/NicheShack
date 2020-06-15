import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MediaType } from '../../../classes/media';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public mediaType = MediaType;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.product = null;
  }

  onBuyClick(url: string) {
    window.open(url);
  }

}

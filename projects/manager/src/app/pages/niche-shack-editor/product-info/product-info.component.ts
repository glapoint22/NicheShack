import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MediaType } from '../../../classes/media';
import { ProductMedia } from '../../../classes/product-media';

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

  onThumbnailClick(media: ProductMedia) {
    this.productService.product.selectedMedia = media;
    this.productService.setCurrentSelectedMedia(media);
  }

  onBuyClick(url: string) {
    window.open(url);
  }

  getMinPrice() {
    let minPrice = Math.min(...this.productService.product.price.map(x => x.price));


    // Return min price as long as it's a number or it does NOT equel zero, otherwise return null
    return isNaN(minPrice) ? null : minPrice;
  }

  getMaxPrice() {
    let minPrice = Math.min(...this.productService.product.price.map(x => x.price));
    let maxPrice = Math.max(...this.productService.product.price.map(x => x.price));

    // Return max price as long as it's a number or max price does NOT equel min price, otherwise return null
    return isNaN(maxPrice) || minPrice == maxPrice ? null : maxPrice;
  }
}

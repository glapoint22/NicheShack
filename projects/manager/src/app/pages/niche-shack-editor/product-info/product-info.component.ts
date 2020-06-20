import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { MediaType, Media } from '../../../classes/media';

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

  onThumbnailClick(media: Media, thumbnailIndex: number) {
    this.productService.setCurrentSelectedMedia(media);
    this.productService.currentSelectedMediaIndex = thumbnailIndex;
  }

  onBuyClick(url: string) {
    window.open(url);
  }
}

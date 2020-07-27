import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { Media, MediaType } from '../classes/media';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product: Product;
  public currentSelectedMedia: Media;
  public currentSelectedMediaIndex: number = 0;
  constructor(private sanitizer: DomSanitizer) { }
  public scrollTop: number = 0;

  setCurrentSelectedMedia(media: Media) {
    if (media.type == MediaType.Video) {
      media.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(media.url);
    }

    this.currentSelectedMedia = media;
  }


  setPrice() {
    let prices: Array<number> = this.product.pricePoints.map(x => x.wholeNumber + (x.decimal * 0.01));
    let minPrice = Math.min(...prices);
    let maxPrice = Math.max(...prices);

    if(minPrice == maxPrice) {
      this.product.minPrice = minPrice;
      this.product.maxPrice = 0;
    } else {
      this.product.minPrice = minPrice;
      this.product.maxPrice = maxPrice;
    }
  }
}
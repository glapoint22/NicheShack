import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { ProductMedia, ProductMediaType } from '../classes/product-media';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public product: Product;
  public currentSelectedMedia: ProductMedia;

  constructor(private sanitizer: DomSanitizer) { }

  setCurrentSelectedMedia(media: ProductMedia) {
    if(media.type == ProductMediaType.Video) {
      media.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(media.url);
    }

    this.currentSelectedMedia = media;
  }
}

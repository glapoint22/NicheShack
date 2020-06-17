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

  constructor(private sanitizer: DomSanitizer) { }

  setCurrentSelectedMedia(media: Media) {
    if(media.type == MediaType.Video) {
      media.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(media.url);
    }

    this.currentSelectedMedia = media;
  }
}

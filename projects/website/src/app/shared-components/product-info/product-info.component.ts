import { Component, Input } from '@angular/core';
import { ProductInfo } from '../../interfaces/product-info';
import { ShareService } from '../../services/share.service';
import { Media, MediaType } from '../../interfaces/media';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  @Input() productInfo: ProductInfo;
  public selectedMedia: Media;
  public mediaType = MediaType;
  public currentMediaIndex: number = 0;

  constructor(public shareService: ShareService, private sanitizer: DomSanitizer) { }


  ngOnChanges() {
    this.selectedMedia = this.productInfo.media[0];

    this.productInfo.media.forEach((media: Media) => {
      if (media.type == MediaType.Video) {
        this.setVideo(media);
      }
    });
  }


  


  onThumbnailClick(media) {
    this.selectedMedia = media;
  }


  onBuyClick(hoplink: string) {
    window.location.href = hoplink;
  }

  getProductUrl(): string {
    return '/' + this.productInfo.product.urlName + '/' + this.productInfo.product.id;
  }


  setVideo(media: Media) {
    media.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(media.url);
  }

  

  playVideo(media: Media) {
    if (media.type == MediaType.Video) {
      console.log('Playing Video');
    }

  }
}
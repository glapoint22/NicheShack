import { Component, Input } from '@angular/core';
import { Media, MediaType } from 'projects/manager/src/app/classes/media';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';

@Component({
  selector: 'product-media',
  templateUrl: './product-media.component.html',
  styleUrls: ['./product-media.component.scss']
})
export class ProductMediaComponent {
  @Input() media: Array<Media>;
  public mediaType = MediaType;
  constructor(private popupService: PopupService, private productService: ProductService){}

  // -----------------------------( ON PAGINATOR CLICK )------------------------------ \\
  onPaginatorClick(pageIndex: number) {
    this.productService.currentSelectedMediaIndex = pageIndex;
    this.productService.currentSelectedMedia = this.media[this.productService.currentSelectedMediaIndex];
    this.productService.setCurrentSelectedMedia(this.media[this.productService.currentSelectedMediaIndex]);
    this.productService.scrollTop = pageIndex * 64;
  }


  // -----------------------------( ON IMAGE ICON CLICK )------------------------------ \\
  onImageIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.ProductImage;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.media[this.productService.currentSelectedMediaIndex];
  }


  // -----------------------------( ON VIDEO ICON CLICK )------------------------------ \\
  onVideoIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.Video;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.media = this.media[this.productService.currentSelectedMediaIndex];
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
  }
}
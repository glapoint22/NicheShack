import { Component, Input, ViewChild, OnChanges, DoCheck } from '@angular/core';
import { Media, MediaType } from 'projects/manager/src/app/classes/media';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';

@Component({
  selector: 'product-media',
  templateUrl: './product-media.component.html',
  styleUrls: ['./product-media.component.scss']
})
export class ProductMediaComponent implements OnChanges, DoCheck {
  @Input() media: Array<Media>;
  @ViewChild('paginator', { static: false }) paginator: PaginatorComponent;
  public mediaType = MediaType;
  private currentMediaId: string;


  constructor(
    private popupService: PopupService,
    public productService: ProductService,
    private dataService: TempDataService,
    private promptService: PromptService
  ) { }



  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    if (this.media.length > 0) this.currentMediaId = this.media[0].id;
  }





  // -----------------------------( NG DO CHECK )------------------------------ \\
  ngDoCheck() {
    if (this.productService.currentSelectedMedia.url && this.currentMediaId != this.productService.currentSelectedMedia.id) {
      this.currentMediaId = this.productService.currentSelectedMedia.id;

      // Update the media
      this.dataService.put('api/Products/Media', {
        productId: this.productService.product.id,
        oldMediaId: this.currentMediaId,
        newMediaId: this.productService.currentSelectedMedia.id
      }).subscribe();
    }
  }



  // -----------------------------( ON PAGINATOR CLICK )------------------------------ \\
  onPaginatorClick(pageIndex: number) {
    this.productService.currentSelectedMediaIndex = pageIndex;
    this.productService.currentSelectedMedia = this.media[this.productService.currentSelectedMediaIndex];
    this.productService.setCurrentSelectedMedia(this.media[this.productService.currentSelectedMediaIndex]);
    this.productService.scrollTop = pageIndex * 64;
    this.currentMediaId = this.productService.currentSelectedMedia.id;
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



  // -----------------------------( ADD MEDIA ITEM )------------------------------ \\
  addMediaItem() {
    this.dataService.post('api/Products/Media', this.productService.product.id)
      .subscribe((id: string) => {
        this.media[this.productService.currentSelectedMediaIndex].id = id;
      });

    this.productService.product.media.push({
      id: null,
      name: null,
      url: null
    });
    this.paginator.setPage(this.productService.product.media.length);
    this.productService.currentSelectedMediaIndex = this.productService.product.media.length - 1;
    this.productService.currentSelectedMedia = this.media[this.productService.currentSelectedMediaIndex];
    this.productService.scrollTop = this.productService.currentSelectedMediaIndex * 64;
  }




  // -----------------------------( ON DELETE CLICK )------------------------------ \\
  onDeleteClick() {
    if (this.media.length == 0) return;

    let promptTitle = 'Delete';
    let promptMessage = 'Are you sure you want to delete this media item?';

    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteMediaItem, this);
  }


  // -----------------------------( DELETE ITEM )------------------------------ \\
  deleteMediaItem() {
    this.dataService.delete('api/Products/Media', this.media[this.productService.currentSelectedMediaIndex].id)
      .subscribe();

    this.media.splice(this.productService.currentSelectedMediaIndex, 1);
    this.productService.currentSelectedMediaIndex = Math.min(this.media.length - 1, this.productService.currentSelectedMediaIndex);

    if (this.productService.currentSelectedMediaIndex >= 0) {
      this.productService.currentSelectedMedia = this.media[this.productService.currentSelectedMediaIndex];
      this.productService.setCurrentSelectedMedia(this.media[this.productService.currentSelectedMediaIndex]);
      this.productService.scrollTop = this.productService.currentSelectedMediaIndex * 64;
      this.currentMediaId = this.productService.currentSelectedMedia.id;
    } else {
      this.productService.currentSelectedMediaIndex = 0;
    }
  }
}
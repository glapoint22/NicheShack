import { Component, Input, ViewChild, OnChanges, OnInit } from '@angular/core';
import { Media, MediaType } from 'projects/manager/src/app/classes/media';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { PromptService } from 'projects/manager/src/app/services/prompt.service';
import { PaginatorComponent } from 'projects/manager/src/app/shared-components/paginator/paginator.component';
import { SaveService } from 'projects/manager/src/app/services/save.service';
import { DataService } from 'services/data.service';
import { Product } from 'projects/manager/src/app/classes/product';

@Component({
  selector: 'product-media',
  templateUrl: './product-media.component.html',
  styleUrls: ['./product-media.component.scss']
})
export class ProductMediaComponent implements OnInit, OnChanges {
  @Input() product: Product;
  @ViewChild('paginator', { static: false }) paginator: PaginatorComponent;
  public mediaType = MediaType;
  private currentMediaId: number;


  constructor(
    private popupService: PopupService,
    public productService: ProductService,
    private dataService: DataService,
    private promptService: PromptService,
    private saveService: SaveService,
  ) { }



  ngOnInit() {
    this.popupService.mediaBrowserPopup.onMediaChange.subscribe((media: Media) => {
      this.productService.setCurrentSelectedMedia(media);

      // Post new media
      if (!this.currentMediaId) {
        this.dataService.post('api/Products/Media', {
          ItemId: this.product.id,
          PropertyId: media.id
        })
          .subscribe((id: number) => {
            this.product.selectedMedia.itemId = id;
          });
      } else {

        // Update the media
        if (this.currentMediaId != media.id) {
          this.saveService.save({
            url: 'api/Products/Media',
            data: {
              itemId: this.product.selectedMedia.itemId,
              propertyId: media.id
            }
          });
        }

      }

      this.currentMediaId = media.id;
    });
  }



  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    if (this.product.media.length > 0) this.currentMediaId = this.product.media[0].id;
  }




  // -----------------------------( ADD MEDIA ITEM )------------------------------ \\
  addMediaItem() {
    this.product.media.push({
      itemId: null,
      id: null,
      name: null,
      url: null
    });
    this.paginator.setPage(this.product.media.length);
    this.product.selectedMedia = this.product.media[this.product.media.length - 1];
    this.currentMediaId = null;
  }






  // -----------------------------( ON PAGINATOR CLICK )------------------------------ \\
  onPaginatorClick(index: number) {
    this.product.selectedMedia = this.product.media[index];
    this.productService.setCurrentSelectedMedia(this.product.selectedMedia);
    this.currentMediaId = this.product.selectedMedia.id;

  }


  // -----------------------------( ON IMAGE ICON CLICK )------------------------------ \\
  onImageIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.ProductMediaImage;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.product.selectedMedia;
  }


  // -----------------------------( ON VIDEO ICON CLICK )------------------------------ \\
  onVideoIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.Video;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.media = this.product.selectedMedia;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
  }




  getMediaIndex() {
    if (!this.product.media || this.product.media.length == 0) return 0;
    return this.product.media.findIndex(x => x == this.product.selectedMedia);
  }





  // -----------------------------( ON DELETE CLICK )------------------------------ \\
  onDeleteClick() {
    if (this.product.media.length == 0) return;

    let promptTitle = 'Delete';
    let promptMessage = 'Are you sure you want to delete this media item?';

    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteMediaItem, this);
  }


  // -----------------------------( DELETE ITEM )------------------------------ \\
  deleteMediaItem() {

    if (this.product.selectedMedia.id) {
      this.dataService.delete('api/Products/Media', { productId: this.product.id, mediaId: this.product.selectedMedia.id })
        .subscribe();
    }

    let selectedIndex = this.getMediaIndex();

    this.product.media.splice(selectedIndex, 1);
    selectedIndex = Math.min(this.product.media.length - 1, selectedIndex);

    if (selectedIndex >= 0) {
      this.product.selectedMedia = this.product.media[selectedIndex];
      this.productService.setCurrentSelectedMedia(this.product.selectedMedia);
      this.currentMediaId = this.product.selectedMedia.id;
    }
  }
}
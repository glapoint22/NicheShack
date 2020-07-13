import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'projects/manager/src/app/classes/product';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { Subscription } from 'rxjs';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';

@Component({
  selector: 'product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {
  @Input() product: Product;
  public mediaType = MediaType;
  private subscription: Subscription;
  private currentImage: string;

  constructor(private dataService: TempDataService, private popupService: PopupService) { }

  ngOnInit() {
    this.subscription = this.popupService.mediaBrowserPopup.onPopupClose
      .subscribe(() => {
        // Test to see if the image changed
        if (this.currentImage != this.product.image.id) {

          // Update the image
          this.dataService.put('api/Products/Image', this.product)
            .subscribe(() => {
              // Set the current image as the new image
              this.currentImage = this.product.image.id;
            });
        }
      });
  }





  ngOnChanges() {
    if (this.product.image) this.currentImage = this.product.image.id;
  }






  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
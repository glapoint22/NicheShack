import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Product } from 'projects/manager/src/app/classes/product';
import { Subscription } from 'rxjs';
import { SaveService } from 'projects/manager/src/app/services/save.service';

@Component({
  selector: 'product-hoplink',
  templateUrl: './product-hoplink.component.html',
  styleUrls: ['./product-hoplink.component.scss']
})
export class ProductHoplinkComponent implements OnInit, OnChanges, OnDestroy {
  @Input() product: Product;
  private subscription: Subscription;
  private currentHoplink: string;

  constructor(private popupService: PopupService, private saveService: SaveService) { }


  ngOnInit() {
    this.subscription = this.popupService.hoplinkPopup.onPopupClose
      .subscribe(() => {
        // Test to see if the hoplink changed
        if (this.currentHoplink != this.product.hoplink) {

          // Update the hoplink
          this.saveService.save({
            url: 'api/Products/Hoplink',
            data: {
              id: this.product.id,
              name: this.product.hoplink
            }
          });

          this.currentHoplink = this.product.hoplink;
        }
      });
  }


  ngOnChanges() {
    this.currentHoplink = this.product.hoplink;
  }


  onHoplinkIconClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.hoplinkPopup.product = this.product;
    this.popupService.hoplinkPopup.show = !this.popupService.hoplinkPopup.show;
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
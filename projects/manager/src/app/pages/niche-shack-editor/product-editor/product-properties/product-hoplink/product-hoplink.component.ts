import { Component, Input } from '@angular/core';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Product } from 'projects/manager/src/app/classes/product';

@Component({
  selector: 'product-hoplink',
  templateUrl: './product-hoplink.component.html',
  styleUrls: ['./product-hoplink.component.scss']
})
export class ProductHoplinkComponent {
  @Input() product: Product;

  constructor(private popupService: PopupService) { }

  onHoplinkIconClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.hoplinkPopup.product = this.product;
    this.popupService.hoplinkPopup.show = !this.popupService.hoplinkPopup.show;
  }
}
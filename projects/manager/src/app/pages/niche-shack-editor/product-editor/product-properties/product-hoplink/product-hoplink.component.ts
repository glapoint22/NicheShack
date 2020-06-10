import { Component, Input } from '@angular/core';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { ProductProperties } from 'projects/manager/src/app/classes/product-properties';

@Component({
  selector: 'product-hoplink',
  templateUrl: './product-hoplink.component.html',
  styleUrls: ['./product-hoplink.component.scss']
})
export class ProductHoplinkComponent {
  @Input() productProperties: ProductProperties;

  constructor(private popupService: PopupService) { }

  onHoplinkIconClick(sourceElement: HTMLElement) {
    this.popupService.sourceElement = sourceElement;
    this.popupService.hoplinkPopup.productProperties = this.productProperties;
    this.popupService.hoplinkPopup.show = !this.popupService.hoplinkPopup.show;
  }
}
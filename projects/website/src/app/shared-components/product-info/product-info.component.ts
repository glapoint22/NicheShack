import { Component, Input } from '@angular/core';
import { ProductInfo } from '../../interfaces/product-info';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  @Input() productInfo: ProductInfo;

  constructor(public shareService: ShareService) { }

  onBuyClick(hoplink: string) {
    window.location.href = hoplink;
  }

  getProductUrl(): string {
    return '/' + this.productInfo.product.urlTitle + '/' + this.productInfo.product.id;
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;
  @Output() quickLookClick: EventEmitter<Product> = new EventEmitter();

  constructor(private router: Router) { }

  onClick() {
    this.router.navigate([this.product.urlTitle, this.product.id]);
  }

  onQuickLookClick() {
    this.quickLookClick.emit(this.product);
  }
}
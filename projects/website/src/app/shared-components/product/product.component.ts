import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;

  constructor(private router: Router) { }

  onClick() {
    this.router.navigate([this.product.urlTitle, this.product.id]);
  }
}
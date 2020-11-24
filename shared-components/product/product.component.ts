import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'classes/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() product: Product;

  constructor(private router: Router) { }

  onClick() {
    this.router.navigate([this.product.urlName, this.product.urlId]);
  }
}
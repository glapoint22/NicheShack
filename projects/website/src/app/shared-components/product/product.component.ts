import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() quickLookClick: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  onClick() {

  }

  onQuickLookClick() {
    this.quickLookClick.emit(this.product);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'grid-widget',
  templateUrl: './grid-widget.component.html',
  styleUrls: ['./grid-widget.component.scss']
})
export class GridWidgetComponent implements OnInit {
  @Input() products: Array<Product>;

  constructor() { }

  ngOnInit() {
  }

}

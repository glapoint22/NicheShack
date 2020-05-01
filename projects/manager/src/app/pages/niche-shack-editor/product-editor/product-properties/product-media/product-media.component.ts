import { Component, OnInit, Input } from '@angular/core';
import { ProductMedia } from 'projects/manager/src/app/classes/product-media';

@Component({
  selector: 'product-media',
  templateUrl: './product-media.component.html',
  styleUrls: ['./product-media.component.scss']
})
export class ProductMediaComponent implements OnInit {
  @Input() media: Array<ProductMedia>;
  public currentIndex: number = 0;

  constructor() { }

  ngOnInit() {
  }

}

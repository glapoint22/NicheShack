import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-hoplink',
  templateUrl: './product-hoplink.component.html',
  styleUrls: ['./product-hoplink.component.scss']
})
export class ProductHoplinkComponent {
  @Input() hoplink: string;
}
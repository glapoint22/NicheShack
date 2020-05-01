import { Component, Input } from '@angular/core';
import { productFilter } from 'projects/manager/src/app/classes/product-filter';

@Component({
  selector: 'product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.scss']
})
export class ProductFiltersComponent {
  @Input() filters: Array<productFilter>;
}
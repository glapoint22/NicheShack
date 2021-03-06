import { Component, Input } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'rating-filter',
  templateUrl: './rating-filter.component.html'
})
export class RatingFilterComponent extends FilterComponent {
  @Input() options: Array<number>;
}
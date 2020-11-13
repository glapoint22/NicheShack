import { Component } from '@angular/core';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'custom-filter',
  templateUrl: './custom-filter.component.html'
})
export class CustomFilterComponent extends FilterComponent { }
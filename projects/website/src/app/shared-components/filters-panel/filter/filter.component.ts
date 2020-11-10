import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { CheckboxComponent } from 'shared-components/custom-input/checkbox/checkbox.component';
import { QueryFilter } from '../../../classes/query-filter';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() filter: QueryFilter;
  @Output() onChange: EventEmitter<KeyValue<string, any>> = new EventEmitter();
  @ViewChildren('checkbox') checkboxes: QueryList<CheckboxComponent>;

  onFilterClick(value: any) {
    this.onChange.emit({
      key: this.filter.caption,
      value: value
    });
  }

  trackOption(index: number) {
    return index;
  }
}
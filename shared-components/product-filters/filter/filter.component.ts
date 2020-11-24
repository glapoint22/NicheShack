import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { QueryFilter } from 'classes/query-filter';
import { CheckboxComponent } from 'shared-components/custom-input/checkbox/checkbox.component';

@Component({
  template: ''
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
}
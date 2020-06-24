import { Component, Output, EventEmitter } from '@angular/core';
import { HierarchyContentComponent } from '../hierarchy-content/hierarchy-content.component';
import { HierarchyCheckboxItem } from '../../../classes/hierarchy-checkbox-item';

@Component({
  selector: 'hierarchy-checkbox-content',
  templateUrl: './hierarchy-checkbox-content.component.html',
  styleUrls: ['../hierarchy-content/hierarchy-content.component.scss', './hierarchy-checkbox-content.component.scss']
})
export class HierarchyCheckboxContentComponent extends HierarchyContentComponent {
  @Output() onChange: EventEmitter<HierarchyCheckboxItem> = new EventEmitter();

  onCheckboxChange(item: HierarchyCheckboxItem) {
    item.checked = !item.checked;
    this.onChange.emit(item);
  }
}
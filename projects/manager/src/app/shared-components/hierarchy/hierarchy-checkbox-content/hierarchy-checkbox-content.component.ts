import { Component, Output, EventEmitter } from '@angular/core';
import { HierarchyContentComponent } from '../hierarchy-content/hierarchy-content.component';
import { HierarchyItem } from '../../../classes/hierarchy-item';

@Component({
  selector: 'hierarchy-checkbox-content',
  templateUrl: './hierarchy-checkbox-content.component.html',
  styleUrls: ['../hierarchy-content/hierarchy-content.component.scss', './hierarchy-checkbox-content.component.scss']
})
export class HierarchyCheckboxContentComponent extends HierarchyContentComponent {
  // @Output() onShowHideChildren: EventEmitter<void> = new EventEmitter();

  // -----------------------------( SHOW HIDE CHILDREN )------------------------------ \\
  // showHideChildren(parent: HierarchyItem, input: HTMLInputElement) {
  //   super.showHideChildren(parent, input);
    
  //   this.onShowHideChildren.emit();
  // }

}
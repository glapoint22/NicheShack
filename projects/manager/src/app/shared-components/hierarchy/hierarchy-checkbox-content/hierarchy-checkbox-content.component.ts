import { Component } from '@angular/core';
import { HierarchyContentComponent } from '../hierarchy-content/hierarchy-content.component';

@Component({
  selector: 'hierarchy-checkbox-content',
  templateUrl: './hierarchy-checkbox-content.component.html',
  styleUrls: ['../hierarchy-content/hierarchy-content.component.scss', './hierarchy-checkbox-content.component.scss']
})
export class HierarchyCheckboxContentComponent extends HierarchyContentComponent { }
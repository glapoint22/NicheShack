import { Component, Input, OnChanges } from '@angular/core';
import { HierarchyComponent } from '../hierarchy/hierarchy.component';
import { HierarchyItem } from '../../classes/hierarchy-item';

@Component({
  selector: 'filters-hierarchy',
  templateUrl: './filters-hierarchy.component.html',
  styleUrls: ['./filters-hierarchy.component.scss']
})
export class FiltersHierarchyComponent extends HierarchyComponent implements OnChanges {
  @Input() filters: Array<HierarchyItem>;

  ngOnChanges() {
    this.items = this.filters;
  }


  mapItems(items: HierarchyItem[]) {
    // items.map(x => {
    //   x.parent = this.currentParent;
    //   x.childless = true;
    // });
  }



}
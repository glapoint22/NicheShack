import { Component, Input, OnChanges } from '@angular/core';
import { HierarchyItem } from '../../classes/hierarchy-item';
import { HierarchyPopupComponent } from '../popups/hierarchy-popup/hierarchy-popup.component';

@Component({
  selector: 'filters-hierarchy',
  templateUrl: './filters-hierarchy.component.html',
  styleUrls: ['./filters-hierarchy.component.scss']
})
export class FiltersHierarchyComponent extends HierarchyPopupComponent implements OnChanges {
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
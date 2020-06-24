import { Component, ViewChild, Input } from '@angular/core';
import { HierarchyComponent } from '../hierarchy/hierarchy.component';
import { HierarchyItem, FilterHierarchyItemType } from '../../classes/hierarchy-item';
import { PanelComponent } from '../panels/panel/panel.component';
import { HierarchyCheckboxItem } from '../../classes/hierarchy-checkbox-item';

@Component({
  selector: 'filters-hierarchy',
  templateUrl: './filters-hierarchy.component.html',
  styleUrls: ['./filters-hierarchy.component.scss']
})
export class FiltersHierarchyComponent extends HierarchyComponent {
  @Input() productId: string;
  @ViewChild('panel', { static: false }) panel: PanelComponent;

  // -----------------------------( MAP ITEMS )------------------------------ \\
  mapItems(items: Array<HierarchyItem>, parent?: HierarchyItem) {
    if (parent) {
      // Parent is Filter
      if (parent.type == FilterHierarchyItemType.Filter) {
        items.map((item: HierarchyItem) => {
          item.parent = parent;
          item.type = FilterHierarchyItemType.FilterOption;
          item.url = 'api/FilterOptions';
          item.childless = true;
        });
      }



      // Default is filter
    } else {
      items.map((item: HierarchyItem) => {
        item.type = FilterHierarchyItemType.Filter;
        item.url = 'api/Filters';
        item.childrenUrl = 'api/FilterOptions';
        item.childrenParameters = [{ key: 'filterId', value: item.id }, { key: 'productId', value: this.productId }];
      });
    }
  }




  // -----------------------------( ON PANEL CLICK )------------------------------ \\
  onPanelClick(expanded: boolean) {
    if (expanded) {
      if (!this.items) {
        this.load('api/Filters')
          .subscribe((items: Array<HierarchyItem>) => {
            this.items = items;
          });
      }
    }
  }



  // -----------------------------( ON CHANGE )------------------------------ \\
  onChange(item: HierarchyCheckboxItem) {
    item.loading = true;
    this.dataService.put('api/Products/Filters', { productId: this.productId, filterOptionId: item.id })
      .subscribe(() => {
        item.loading = false;
      });
  }
}
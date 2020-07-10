import { Component, ViewChild, Input } from '@angular/core';
import { HierarchyComponent } from '../hierarchy/hierarchy.component';
import { HierarchyItem, FilterHierarchyItemType } from '../../classes/hierarchy-item';
import { HierarchyCheckboxItem } from '../../classes/hierarchy-checkbox-item';
import { Product } from '../../classes/product';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'filters-hierarchy',
  templateUrl: './filters-hierarchy.component.html',
  styleUrls: ['./filters-hierarchy.component.scss']
})
export class FiltersHierarchyComponent extends HierarchyComponent {
  @Input() product: Product;
  @ViewChild('panel', { static: false }) panel: PanelComponent;


  ngOnChanges() {
    // Load the filters
    this.load('api/Filters').subscribe((items: Array<HierarchyCheckboxItem>) => {
      this.items = items;
      window.setTimeout(() => {
        this.panel.onContentLoad();
      });
    });
  }

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
        item.childrenParameters = [{ key: 'filterId', value: item.id }, { key: 'productId', value: this.product.id }];
      });
    }
  }




  // -----------------------------( ON CHANGE )------------------------------ \\
  onChange(filterOption: HierarchyCheckboxItem) {
    // If there are no filter option changes
    if (!this.product.filterOptionChanges) {
      this.product.filterOptionChanges = [];
    }

    // Get the index of the current filter option
    let index: number = this.product.filterOptionChanges.findIndex(x => x.id == filterOption.id);


    if (index > -1) {
      // Remove this option as it was set back to its original value
      this.product.filterOptionChanges.splice(index, 1);
    } else {
      // If the filter option is not found, add it to the filter changes array
      this.product.filterOptionChanges.push(filterOption);
    }
  }
}
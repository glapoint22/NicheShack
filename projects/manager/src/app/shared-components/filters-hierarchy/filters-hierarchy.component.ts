import { Component, ViewChild, Input } from '@angular/core';
import { HierarchyComponent } from '../hierarchy/hierarchy.component';
import { HierarchyItem, FilterHierarchyItemType } from '../../classes/hierarchy-item';
import { PanelComponent } from '../panels/panel/panel.component';
import { HierarchyCheckboxItem } from '../../classes/hierarchy-checkbox-item';
import { Product } from '../../classes/product';
import { ProductFilter } from '../../classes/product-filter';

@Component({
  selector: 'filters-hierarchy',
  templateUrl: './filters-hierarchy.component.html',
  styleUrls: ['./filters-hierarchy.component.scss']
})
export class FiltersHierarchyComponent extends HierarchyComponent {
  @Input() product: Product;
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
        item.childrenParameters = [{ key: 'filterId', value: item.id }, { key: 'productId', value: this.product.id }];
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
    let productFilter: ProductFilter;

    // If we have any product filters
    if (this.product.productFilters) {
      // Find the product filter in the array
      productFilter = this.product.productFilters.find(x => x.id == item.id);

      // We have no prodcut filters so initialize new product filters with a length of zero
    } else {
      this.product.productFilters = [];
    }

    // If we have a product filter, update it
    if (productFilter) {
      productFilter.checked = item.checked;

      // This product filter does not exist in the array, add it
    } else {
      this.product.productFilters.push({
        id: item.id,
        checked: item.checked
      });
    }
  }
}
import { Component, ViewChild, Input } from '@angular/core';
import { HierarchyComponent } from '../hierarchy/hierarchy.component';
import { HierarchyItem, FilterHierarchyItemType } from '../../classes/hierarchy-item';
import { HierarchyCheckboxItem } from '../../classes/hierarchy-checkbox-item';
import { Product } from '../../classes/product';
import { PanelComponent } from '../panel/panel.component';
import { SaveService } from '../../services/save.service';
import { DataService } from 'services/data.service';

@Component({
  selector: 'filters-hierarchy',
  templateUrl: './filters-hierarchy.component.html',
  styleUrls: ['./filters-hierarchy.component.scss']
})
export class FiltersHierarchyComponent extends HierarchyComponent {
  @Input() product: Product;
  @ViewChild('panel', { static: false }) panel: PanelComponent;

  constructor(dataService: DataService, private saveService: SaveService) { super(dataService) }


  ngOnChanges() {
    // Load the filters
    this.load('api/Filters').subscribe((items: Array<HierarchyCheckboxItem>) => {
      this.items = items;
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
          item.url = 'api/Products/Filters';
          item.childless = true;
          item.hierarchyId = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
        });
      }



      // Default is filter
    } else {
      items.map((item: HierarchyItem) => {
        item.type = FilterHierarchyItemType.Filter;
        item.url = 'api/Filters';
        item.childrenUrl = 'api/Products/Filters';
        item.childrenParameters = [{ key: 'filterId', value: item.id }, { key: 'productId', value: this.product.id }];
        item.hierarchyId = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
      });
    }
  }




  // -----------------------------( ON CHANGE )------------------------------ \\
  onChange(filterOption: HierarchyCheckboxItem) {
    this.saveService.save({
      url: 'api/Products/Filter',
      data: {
        productId: this.product.id,
        filterOptionId: filterOption.id,
        checked: filterOption.checked
      }
    });
  }
}
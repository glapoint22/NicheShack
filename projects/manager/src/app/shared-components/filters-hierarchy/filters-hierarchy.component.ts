import { Component, ViewChild } from '@angular/core';
import { HierarchyComponent } from '../hierarchy/hierarchy.component';
import { HierarchyItem, FilterHierarchyItemType } from '../../classes/hierarchy-item';
import { PanelComponent } from '../panels/panel/panel.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'filters-hierarchy',
  templateUrl: './filters-hierarchy.component.html',
  styleUrls: ['./filters-hierarchy.component.scss']
})
export class FiltersHierarchyComponent extends HierarchyComponent {
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
            // window.setTimeout(() => {
            //   this.panel.onContentLoad();
            // });

          });
      }
    }
  }


  

  // onShowHideChildren() {
  //   window.setTimeout(() => {
  //     this.panel.onContentLoad();
  //   }, 250);
  // }


  // loadChildren(parent: HierarchyItem): Observable<Array<HierarchyItem>> {
  //   return new Observable(() => {
  //     super.loadChildren(parent).subscribe((items: Array<HierarchyItem>) => {
  //       window.setTimeout(() => {
  //         this.panel.onContentLoad();
  //       }, 250);
  //     });
  //   });
  // }
}
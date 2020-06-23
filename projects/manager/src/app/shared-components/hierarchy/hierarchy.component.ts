import { Component } from '@angular/core';
import { HierarchyItem } from '../../classes/hierarchy-item';
import { TempDataService } from '../../services/temp-data.service';
import { KeyValue } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  template: '',
})
export class HierarchyComponent {
  public items: Array<HierarchyItem>;
  public selectedItem: HierarchyItem;

  constructor(public dataService: TempDataService) { }

  // -----------------------------( LOAD )------------------------------ \\
  load(url: string, parameters?: Array<KeyValue<string, string>>, parent?: HierarchyItem, type?: number): Observable<Array<HierarchyItem>> {
    return new Observable(subscriber => {
      this.dataService.get(url, parameters)
        .pipe(tap((items: Array<HierarchyItem>) => {
          this.mapItems(items, parent, type);
        }))
        .subscribe((items: Array<HierarchyItem>) => {
          subscriber.next(items);
        });
    });
  }




  // -----------------------------( LOAD CHILDREN )------------------------------ \\
  loadChildren(parent: HierarchyItem): Observable<Array<HierarchyItem>> {
    return new Observable(subscriber => {
      // If already in the process of loading children, return
      if (parent.loading) return;

      // Flag that we are loading children
      parent.loading = true;

      // Get the item's children from the database
      this.load(parent.childrenUrl, [{ key: 'id', value: parent.id }], parent)
        .subscribe((items: Array<HierarchyItem>) => {
          // Assign the items and flag loading has completed
          parent.children = items;
          parent.loading = false;

          // Return the items
          subscriber.next(parent.children);

          // flag that we are showing children
          window.setTimeout(() => {
            parent.showChildren = true;
          }, 100);
        });
    });
  }





  // -----------------------------( IS COLLAPSE BUTTON DISABLED )------------------------------ \\
  isCollapseButtonDisabled() {
    if (!this.items) return true;
    return !this.items.some(x => x.showChildren);
  }




  // -----------------------------( ON COLLAPSE BUTTON CLICK )------------------------------ \\
  onCollapseButtonClick() {
    if (!this.items.some(x => x.showChildren)) return;

    this.collapseItems(this.items);
  }




  // -----------------------------( COLLAPSE ITEMS )------------------------------ \\
  collapseItems(items: Array<HierarchyItem>) {
    items.forEach((item: HierarchyItem) => {
      item.showChildren = false;

      if (item.children) {
        this.collapseItems(item.children);
      }
    });
  }




  // -----------------------------( MAP ITEMS )------------------------------ \\
  mapItems(items: Array<HierarchyItem>, parent?: HierarchyItem, type?: number) { }
}
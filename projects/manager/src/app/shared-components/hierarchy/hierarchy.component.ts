import { Component } from '@angular/core';
import { HierarchyItem } from '../../classes/hierarchy-item';
import { tap } from 'rxjs/operators';
import { TempDataService } from '../../services/temp-data.service';
import { Observable } from 'rxjs';
import { PopupComponent } from '../popups/popup/popup.component';
import { PopupService } from '../../services/popup.service';
import { CoverService } from '../../services/cover.service';
import { MenuService } from '../../services/menu.service';
import { KeyValue } from '@angular/common';
import { DropdownMenuService } from '../../services/dropdown-menu.service';

@Component({
  selector: 'hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent extends PopupComponent {
  public items: Array<HierarchyItem> = [];
  public selectedItem: HierarchyItem;

  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, dropdownMenuService: DropdownMenuService, public dataService: TempDataService) { super(popupService, cover, menuService, dropdownMenuService) }


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
  loadChildren(parent: HierarchyItem) {
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





  // -----------------------------( IS COLLAPSE BUTTON DISABLED )------------------------------ \\
  isCollapseButtonDisabled() {
    return !this.items.some(x => x.showChildren);
  }




  // // -----------------------------( MAP ITEMS )------------------------------ \\
  mapItems(items: Array<HierarchyItem>, parent?: HierarchyItem, type?: number) { }
}
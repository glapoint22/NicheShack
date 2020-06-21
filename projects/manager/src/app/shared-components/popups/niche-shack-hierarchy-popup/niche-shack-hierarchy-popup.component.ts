import { Component, OnInit } from '@angular/core';
import { HierarchyItem, NicheShackHierarchyItemType } from '../../../classes/hierarchy-item';
import { HierarchyPopupComponent } from '../hierarchy-popup/hierarchy-popup.component';

@Component({
  selector: 'niche-shack-hierarchy-popup',
  templateUrl: './niche-shack-hierarchy-popup.component.html',
  styleUrls: ['../hierarchy-popup/hierarchy-popup.component.scss', '../popup/popup.component.scss']
})
export class NicheShackHierarchyPopupComponent extends HierarchyPopupComponent implements OnInit {
  public nicheShackHierarchyItemType = NicheShackHierarchyItemType;



  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.popupService.nicheShackHierarchyPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    if (!this.items && !this.searchResults) {
      this.load(this.getUrl(NicheShackHierarchyItemType.Category))
        .subscribe((items: Array<HierarchyItem>) => {
          this.items = items;
        });
      this.filterType = NicheShackHierarchyItemType.Product;
    }

    super.onPopupShow(popup, arrow);
  }



  // -----------------------------( GET URL )------------------------------ \\
  getUrl(type: number): string {
    switch (type) {
      // Category
      case NicheShackHierarchyItemType.Category:
        return 'api/Categories';

      // Niche
      case NicheShackHierarchyItemType.Niche:
        return 'api/Niches';

      // Product
      case NicheShackHierarchyItemType.Product:
        return 'api/Products';
    }
  }







  // -----------------------------( MAP ITEMS )------------------------------ \\
  mapItems(items: Array<HierarchyItem>, parent?: HierarchyItem, type?: number) {
    if (parent) {
      // Parent is category
      if (parent.type == NicheShackHierarchyItemType.Category) {
        items.map((item: HierarchyItem) => {
          item.parent = parent;
          item.type = NicheShackHierarchyItemType.Niche;
          item.url = this.getUrl(NicheShackHierarchyItemType.Niche);
          item.childrenUrl = this.getUrl(NicheShackHierarchyItemType.Product);
        });
      } else


        // Parent is niche
        if (parent.type == NicheShackHierarchyItemType.Niche) {
          items.map((item: HierarchyItem) => {
            item.parent = parent;
            item.type = NicheShackHierarchyItemType.Product;
            item.childless = true;
            item.url = this.getUrl(NicheShackHierarchyItemType.Product);
          });
        }

      // We are doing a search
    } else if (type) {

      // Product
      switch (type) {
        case NicheShackHierarchyItemType.Product:
          items.map((item: HierarchyItem) => {

            item.type = NicheShackHierarchyItemType.Product;
            item.childless = true;
            item.url = this.getUrl(NicheShackHierarchyItemType.Product);
          });
          break;

        // Niche
        case NicheShackHierarchyItemType.Niche:
          items.map((item: HierarchyItem) => {
            item.type = NicheShackHierarchyItemType.Niche;
            item.url = this.getUrl(NicheShackHierarchyItemType.Niche);
            item.childrenUrl = this.getUrl(NicheShackHierarchyItemType.Product);
          });
          break;


        // Category
        case NicheShackHierarchyItemType.Category:

          items.map((item: HierarchyItem) => {
            item.type = NicheShackHierarchyItemType.Category;
            item.url = this.getUrl(NicheShackHierarchyItemType.Category);
            item.childrenUrl = this.getUrl(NicheShackHierarchyItemType.Niche);
          });
          break;
      }

      // Default is category
    } else {
      items.map((item: HierarchyItem) => {
        item.type = NicheShackHierarchyItemType.Category;
        item.url = this.getUrl(NicheShackHierarchyItemType.Category);
        item.childrenUrl = this.getUrl(NicheShackHierarchyItemType.Niche);
      });
    }
  }








  // -----------------------------( GET ITEM NAME )------------------------------ \\
  getItemName(type: NicheShackHierarchyItemType): string {
    let name: string;

    switch (type) {
      case NicheShackHierarchyItemType.Category:
        name = 'Category';
        break;

      case NicheShackHierarchyItemType.Niche:
        name = 'Niche';
        break;


      case NicheShackHierarchyItemType.Product:
        name = 'Product';
        break;
    }

    return name;
  }






  // -----------------------------( GET ADD BUTTON TITLE )------------------------------ \\
  getAddButtonTitle() {
    let title: string;

    switch (this.selectedItem && this.selectedItem.type) {
      case NicheShackHierarchyItemType.Category:
        title = 'Add Niche';
        break;

      case NicheShackHierarchyItemType.Niche:
        title = 'Add Product';
        break;

      case NicheShackHierarchyItemType.Product:
        title = 'Add (Not Available)';
        break;

      default:
        if (this.searchResults && this.searchResults.length > 0 && this.searchResults[0].type != NicheShackHierarchyItemType.Category) {
          title = 'Add (Not Available)'
        } else {
          title = 'Add Category';
        }

        break;
    }
    return title;
  }










  // -----------------------------( IS ADD BUTTON DISABLED )------------------------------ \\
  isAddItemDisabled(): boolean {
    let result: boolean;

    if(super.isAddItemDisabled()) return true;

    switch (this.selectedItem && this.selectedItem.type) {
      case NicheShackHierarchyItemType.Category:
        result = false;
        break;

      case NicheShackHierarchyItemType.Niche:
        result = false;
        break;

      case NicheShackHierarchyItemType.Product:
        result = true;
        break;

      default:
        if (this.searchResults && this.searchResults.length > 0 && this.searchResults[0].type != NicheShackHierarchyItemType.Category) {
          result = true;
        } else {
          result = false;
        }

        break;
    }

    return result;
  }




  // -----------------------------( CREATE ITEM )------------------------------ \\
  createItem(): HierarchyItem {
    let item: HierarchyItem;

    if (!this.selectedItem) {
      item = {
        id: null,
        name: '',
        type: NicheShackHierarchyItemType.Category,
        showChildren: false,
        loading: false,
        children: [],
        parent: null,
        childless: false,
        url: this.getUrl(NicheShackHierarchyItemType.Category),
        childrenUrl: this.getUrl(NicheShackHierarchyItemType.Niche)
      }

    } else if (this.selectedItem.type == NicheShackHierarchyItemType.Category) {
      item = {
        id: null,
        name: '',
        type: NicheShackHierarchyItemType.Niche,
        showChildren: false,
        loading: false,
        children: [],
        parent: this.selectedItem,
        childless: false,
        url: this.getUrl(NicheShackHierarchyItemType.Niche),
        childrenUrl: this.getUrl(NicheShackHierarchyItemType.Product)
      }
    } else {
      item = {
        id: null,
        name: '',
        type: NicheShackHierarchyItemType.Product,
        showChildren: false,
        loading: false,
        children: [],
        parent: this.selectedItem,
        childless: true,
        url: this.getUrl(NicheShackHierarchyItemType.Product),
        childrenUrl: null
      }
    }

    return item;
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { HierarchyItem, NicheShackHierarchyItemType } from '../../../classes/hierarchy-item';
import { PopupComponent } from '../popup/popup.component';
import { TempDataService } from '../../../services/temp-data.service';
import { PopupService } from '../../../services/popup.service';
import { EditableHierarchyComponent } from '../../hierarchy/editable-hierarchy/editable-hierarchy.component';
import { PromptService } from '../../../services/prompt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'niche-shack-hierarchy-popup',
  templateUrl: './niche-shack-hierarchy-popup.component.html',
  styleUrls: ['../../hierarchy/editable-hierarchy/editable-hierarchy.component.scss']
})
export class NicheShackHierarchyPopupComponent extends EditableHierarchyComponent implements OnInit {
  @ViewChild('popup', { static: false }) popup: PopupComponent;
  public nicheShackHierarchyItemType = NicheShackHierarchyItemType;
  public showMenu: boolean;



  private _show: boolean;
  public get show(): boolean {
    return this._show;
  }
  public set show(v: boolean) {
    if (v) {
      this.popup.show = v;
      this.onPopupShow();
    }
    this._show = v;
  }


  constructor(
    dataService: TempDataService,
    promptService: PromptService,
    private popupService: PopupService,
    private router: Router
  ) { super(dataService, promptService) }



  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.popupService.nicheShackHierarchyPopup = this;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow() {
    if (!this.items && !this.searchResults) {
      this.load(this.getUrl(NicheShackHierarchyItemType.Category))
        .subscribe((items: Array<HierarchyItem>) => {
          this.items = items;
        });
      this.filterType = NicheShackHierarchyItemType.Product;
    }

    window.setTimeout(() => {
      this.initSearch();
    });
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
          item.childrenParameters = [{ key: 'id', value: item.id }];
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
            item.childrenParameters = [{ key: 'id', value: item.id }];
          });
          break;


        // Category
        case NicheShackHierarchyItemType.Category:

          items.map((item: HierarchyItem) => {
            item.type = NicheShackHierarchyItemType.Category;
            item.url = this.getUrl(NicheShackHierarchyItemType.Category);
            item.childrenUrl = this.getUrl(NicheShackHierarchyItemType.Niche);
            item.childrenParameters = [{ key: 'id', value: item.id }];
          });
          break;
      }

      // Default is category
    } else {
      items.map((item: HierarchyItem) => {
        item.type = NicheShackHierarchyItemType.Category;
        item.url = this.getUrl(NicheShackHierarchyItemType.Category);
        item.childrenUrl = this.getUrl(NicheShackHierarchyItemType.Niche);
        item.childrenParameters = [{ key: 'id', value: item.id }];
      });
    }
  }








  // -----------------------------( GET ITEM NAME )------------------------------ \\
  getItemName(type: number): string {
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
        if (this.searchResults && this.searchResults.length > 0 && this.filterType != NicheShackHierarchyItemType.Category) {
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

    if (super.isAddItemDisabled()) return true;

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
  createItem(): any {
    let item: any;

    // Category
    if (!this.selectedItem) {
      item = {
        name: ''
      }

      // Niche
    } else if (this.selectedItem.type == NicheShackHierarchyItemType.Category) {
      item = {
        name: '',
        parent: this.selectedItem,
      }

      // Product
    } else {
      item = {
        name: '',
        parent: this.selectedItem,
        childless: true,
      }
    }

    return item;
  }




  // --------------------------------( ON KEYDOWN )-------------------------------- \\
  onKeydown() {
    if (this.show) {
      super.onKeydown();
    }
  }






  // -----------------------------( ON DELETE CLICK )------------------------------ \\
  onDeleteClick() {
    if (this.isDeleteItemDisabled()) return;

    this.popup.preventNoShow = true;

    super.onDeleteClick();

    this.promptService.onPromptClose
      .subscribe(() => {
        this.popup.preventNoShow = false;
      });
  }



  // -----------------------------( ON ITEM SELECT )------------------------------ \\
  onItemSelect() {
    this.router.navigate(['']);
  }
}
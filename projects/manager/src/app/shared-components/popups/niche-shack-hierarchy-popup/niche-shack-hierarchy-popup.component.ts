import { Component, OnInit, HostListener } from '@angular/core';
import { HierarchyComponent } from '../../hierarchy/hierarchy.component';
import { HierarchyItem, NicheShackHierarchyItemType } from '../../../classes/hierarchy-item';
import { fromEvent, of } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { TempDataService } from '../../../services/temp-data.service';
import { PromptService } from '../../../services/prompt.service';
import { DropdownMenuService } from '../../../services/dropdown-menu.service';

@Component({
  selector: 'niche-shack-hierarchy-popup',
  templateUrl: './niche-shack-hierarchy-popup.component.html',
  styleUrls: ['./niche-shack-hierarchy-popup.component.scss', '../popup/popup.component.scss']
})
export class NicheShackHierarchyPopupComponent extends HierarchyComponent implements OnInit {
  public showMenu: boolean;
  public nicheShackHierarchyItemType = NicheShackHierarchyItemType;
  public filterType: NicheShackHierarchyItemType;
  public searchInput: HTMLInputElement;
  public searchResults: Array<HierarchyItem>;
  private editMode: boolean;

  constructor(popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    dataService: TempDataService, private promptService: PromptService) { super(popupService, cover, menuService, dropdownMenuService, dataService,) }

  ngOnInit() {
    this.popupService.nicheShackHierarchyPopup = this;
    this.load(this.getUrl(NicheShackHierarchyItemType.Category))
      .subscribe((items: Array<HierarchyItem>) => {
        this.items = items;
      });
    this.filterType = NicheShackHierarchyItemType.Product;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    this.searchInput = document.getElementById('search-input') as HTMLInputElement;

    fromEvent(this.searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap(() => {
          if (this.searchInput.value == '') {
            this.clearSearchResults();
            return of();
          }
          return this.load(this.getUrl(this.filterType) + '/Search', [{ key: 'search', value: this.searchInput.value }]);
        }))
      .pipe(tap((items: Array<HierarchyItem>) => {
        this.mapItems(items, null, this.filterType);
      }))
      .subscribe((searchResults: Array<HierarchyItem>) => {
        this.selectedItem = null;
        this.searchResults = searchResults;
      });
  }


  // getSearchUrl(): string {
  //   switch (this.filterType) {
  //     case NicheShackHierarchyItemType.Product:
  //       return 'api/Products/Search';


  //     case NicheShackHierarchyItemType.Niche:

  //       return 'api/Niches/Search';

  //     case NicheShackHierarchyItemType.Category:

  //       return 'api/Categories/Search';
  //   }
  // }



  getUrl(type: number): string {
    switch (type) {
      case NicheShackHierarchyItemType.Product:
        return 'api/Products';
      case NicheShackHierarchyItemType.Niche:
        return 'api/Niches';
      case NicheShackHierarchyItemType.Category:
        return 'api/Categories';
    }
  }


  mapItems(items: Array<HierarchyItem>, parent?: HierarchyItem, type?: number) {
    if (parent) {
      if (parent.type == NicheShackHierarchyItemType.Category) {
        items.map((item: HierarchyItem) => {
          item.parent = parent;
          item.type = NicheShackHierarchyItemType.Niche;
          item.url = this.getUrl(NicheShackHierarchyItemType.Niche);
          item.childrenUrl = this.getUrl(NicheShackHierarchyItemType.Product);
        });
      } else



        if (parent.type == NicheShackHierarchyItemType.Niche) {
          items.map((item: HierarchyItem) => {
            item.parent = parent;
            item.type = NicheShackHierarchyItemType.Product;
            item.childless = true;
            item.url = this.getUrl(NicheShackHierarchyItemType.Product);
          });
        }
    } else if (type) {
      switch (type) {
        case NicheShackHierarchyItemType.Product:
          items.map((item: HierarchyItem) => {

            item.type = NicheShackHierarchyItemType.Product;
            item.childless = true;
            item.url = this.getUrl(NicheShackHierarchyItemType.Product);
          });

          break;

        case NicheShackHierarchyItemType.Niche:
          items.map((item: HierarchyItem) => {
            item.type = NicheShackHierarchyItemType.Niche;
            item.url = this.getUrl(NicheShackHierarchyItemType.Niche);
            item.childrenUrl = this.getUrl(NicheShackHierarchyItemType.Product);
          });

          break;


        case NicheShackHierarchyItemType.Category:

          items.map((item: HierarchyItem) => {

            item.type = NicheShackHierarchyItemType.Category;
            item.url = this.getUrl(NicheShackHierarchyItemType.Category);
            item.childrenUrl = this.getUrl(NicheShackHierarchyItemType.Niche);
          });

          break;
      }
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
  isAddButtonDisabled() {
    let result: boolean;

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




  // -----------------------------( CLEAR SEARCH RESULTS )------------------------------ \\
  clearSearchResults() {
    this.searchResults = null;
    this.selectedItem = null;
    this.searchInput.value = '';
  }




  // -----------------------------( ON EDIT ITEM CLICK )------------------------------ \\
  onEditItemClick() {
    this.editMode = true;
    this.editItem();
  }
















  // -----------------------------( EDIT ITEM )------------------------------ \\
  editItem() {
    if (!this.selectedItem) return;

    // Get the element
    let el: HTMLElement = document.getElementById(this.selectedItem.id);

    // Set the element to be editable
    el.contentEditable = 'true';


    // Select the text
    let range: Range = document.createRange();
    range.selectNodeContents(el);
    let sel: Selection = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);



    // On Keydown
    let onKeydown = (event: KeyboardEvent) => {
      // If enter or escape was pressed
      if (event.keyCode == 13 || event.keyCode == 27) {

        // Escape was pressed
        if (event.keyCode == 27) {
          if (this.editMode) {
            el.innerText = this.selectedItem.name;
          } else {
            this.deleteItem();
          }


          // Enter was pressed
        } else {
          event.preventDefault();

          el.contentEditable = 'false';

          // Save
          this.saveItem(el);
        }

        // remove the listeners
        removeKeydownListener();
        removeBlurListener();

        this.editMode = false;
      }
    }


    // On Blur
    let onBlur = () => {
      if (el.contentEditable == 'false') return;

      el.contentEditable = 'false';
      if (el.innerText == '') {
        if (!this.selectedItem.name) {
          this.deleteItem();
        } else {
          el.innerText = this.selectedItem.name;
        }

      } else {
        // Save
        if (el.innerText != this.selectedItem.name) {
          this.saveItem(el);
        }

      }

      removeBlurListener();
      removeKeydownListener();
    }


    // keydown & blur listeners
    el.addEventListener('keydown', onKeydown);
    el.addEventListener('blur', onBlur);

    // Remove keydown listener
    let removeKeydownListener = () => {
      el.removeEventListener('keydown', onKeydown);
    }

    // Remove blur listener
    let removeBlurListener = () => {
      el.removeEventListener('blur', onBlur);
    }
  }





  // -----------------------------( ON DELETE CLICK )------------------------------ \\
  onDeleteClick() {
    if (!this.selectedItem) return;

    let promptTitle = 'Delete';
    let promptMessage = 'Are you sure you want to delete ' + this.selectedItem.name + '?';

    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteItem, this);
  }






  // -----------------------------( DELETE ITEM )------------------------------ \\
  deleteItem() {
    let items: Array<HierarchyItem>;

    if (!this.selectedItem.parent) {
      items = this.searchResults ? this.searchResults : this.items;
    } else {
      items = this.selectedItem.parent.children;
    }





    if (this.selectedItem.id) {
      this.selectedItem.loading = true;

      this.dataService.delete(this.selectedItem.url, {
        id: this.selectedItem.id
      }).subscribe(() => {
        items.splice(items.findIndex(x => x == this.selectedItem), 1);
        this.selectedItem.loading = false;
        this.selectedItem = null;
      });

    } else {
      items.splice(items.findIndex(x => x == this.selectedItem), 1);
      this.selectedItem = null;
    }


  }




  // -----------------------------( ON ADD BUTTON CLICK )------------------------------ \\
  onAddItemButtonClick() {
    if (this.isAddButtonDisabled()) return;

    if (!this.selectedItem) {
      this.addItem(this.items);
    } else {
      if (this.selectedItem.children && this.selectedItem.children.length > 0) {
        this.selectedItem.showChildren = true;
        this.addItem(this.selectedItem.children);




      } else {
        // this.currentParent = this.selectedItem;
        this.loadChildren(this.selectedItem)
          .subscribe((children: Array<HierarchyItem>) => {
            this.addItem(children);
          });
      }
    }
  }





  // -----------------------------( ADD ITEM )------------------------------ \\
  addItem(children: Array<HierarchyItem>) {
    let newItem: HierarchyItem;

    if (!this.selectedItem) {
      newItem = {
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
      newItem = {
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
      newItem = {
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


    children.unshift(newItem);

    window.setTimeout(() => {
      this.selectedItem = newItem;
      this.editItem();
    });
  }





  // -----------------------------( SAVE ITEM )------------------------------ \\
  saveItem(element: HTMLElement) {
    let apiUrl: string;


    this.selectedItem.loading = true;




    // If we have an Id, update the item
    if (this.selectedItem.id) {


      // Update
      this.dataService.put(this.selectedItem.url, {
        id: this.selectedItem.id,
        name: element.innerText
      })
        .subscribe(() => {
          // Set the new name
          element.innerText = this.selectedItem.name = element.innerText;
          this.selectedItem.loading = false;

        });

      // This is a new item
    } else {
      // Post new item
      this.dataService.post(this.selectedItem.url, element.innerText)
        .subscribe((id: string) => {
          // Assign the new item properties
          this.selectedItem.id = id;


          element.innerText = this.selectedItem.name = element.innerText;

          this.selectedItem.loading = false;
        });
    }
  }



  // -----------------------------( ON KEYDOWN )------------------------------ \\
  @HostListener('document:keydown.escape')
  onKeydown() {
    // If the escape key was pressed and prompt is not enabled
    if (this.show) {
      if (this.selectedItem) {

        // Get the element
        let el: HTMLElement = document.getElementById(this.selectedItem.id);

        // Set editable to false
        if (el && el.contentEditable == 'true') {
          el.contentEditable = 'false';
        } else {
          // Deselect the selected item
          this.selectedItem = null;
        }
      }
    }
  }
}
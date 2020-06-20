import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { delay, debounceTime, switchMap, tap } from 'rxjs/operators';
import { HierarchyItem, NicheShackHierarchyItemType } from '../../../classes/hierarchy-item';
import { PopupComponent } from '../../popups/popup/popup.component';
import { PromptService } from '../../../services/prompt.service';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { ProductService } from '../../../services/product.service';
import { LoadingService } from '../../../services/loading.service';
import { Item } from '../../../classes/item';

@Component({
  selector: 'hierarchy-popup',
  templateUrl: './hierarchy-popup.component.html',
  styleUrls: ['./hierarchy-popup.component.scss', '../../popups/popup/popup.component.scss']
})
export class HierarchyPopupComponent extends PopupComponent implements OnInit {
  public items: Array<HierarchyItem> = [];
  public selectedItem: HierarchyItem;
  private editMode: boolean;
  
  public currentParent: HierarchyItem;
  private searchInput: any;
  public hierarchyItemType = NicheShackHierarchyItemType;
  public searchResultsCount: number;
  @Output() showItemProperties: EventEmitter<HierarchyItem> = new EventEmitter();
  public filterType: NicheShackHierarchyItemType;
  public showMenu: boolean;

  constructor(popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    private promptService: PromptService, private productService: ProductService, private loadingService: LoadingService) { super(popupService, cover, menuService) }




  //                                                                 TEMP!!!!!!
  // ******************************************************************************************************************************************
  public getTempItems(type: string): Observable<any> {
    if (type == 'Category') {
      return of([
        {
          id: 'fdsafdfds',
          name: 'Health & Fitness'
        },
        {
          id: 'hgfdhfhhgf',
          name: 'Self-Help'
        },
        {
          id: 'rewqrewer',
          name: 'E-business & E-marketing'
        }
      ]).pipe(delay(1000));


    } else if (type == 'Niche') {
      return of([
        {
          id: 'fsdfafsdf',
          name: 'Diets & Weight Loss'
        },
        {
          id: 'yttrtr',
          name: 'Exercise & Fitness'
        },
        {
          id: 'rewqerweer',
          name: 'Remedies'
        },
        {
          id: 'hffgdhfggh',
          name: 'Nutrition'
        }
      ]).pipe(delay(1000));
    } else {
      return of([
        {
          id: '102B896BF0',
          name: 'Booty Type Training'
        },
        {
          id: '10C45610AF',
          name: 'SocialSaleRep'
        },
        {
          id: '10F6F95D3F',
          name: 'Crunch Cholesterol'
        },
        {
          id: '112298D096',
          name: 'Wealth Trigger 360'
        }
      ]).pipe(delay(1000))
    }
  }

  public updateTempItem(url: string, item: Item): Observable<any> {
    return of({}).pipe(delay(1000));
  }


  public postTempItem(url: string, name: string): Observable<string> {
    return of('GFDGDFSASF').pipe(delay(1000));
  }


  public deleteTempItem(id: string): Observable<any> {
    return of({}).pipe(delay(1000));
  }
  // ******************************************************************************************************************************************









  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    this.searchInput = document.getElementById('search-input');

    fromEvent(this.searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap((event: any) => {

          // Replace with this.dataService.get(...)
          return this.getTempItems(event.target.value == '' ? 'Category' : this.getTypeName(this.filterType));
        }))
      .subscribe((items: Array<HierarchyItem>) => {

        this.items = items;


        this.selectedItem = null;
        this.searchResultsCount = this.searchInput.value == '' ? null : this.items.length;
      });
  }









  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // this.popupService.hierarchyPopup = this;
    this.filterType = NicheShackHierarchyItemType.Product;

    this.getTempItems('Category')
      .pipe(tap((items: Array<HierarchyItem>) => {
        this.mapItems(items);
      }))
      .subscribe((items: Array<HierarchyItem>) => {
        this.items = items;
      });
  }




  mapItems(items: Array<HierarchyItem>) {
    items.map((item: HierarchyItem) => item.type = NicheShackHierarchyItemType.Category);
  }








  // -----------------------------( ON COLLAPSE BUTTON CLICK )------------------------------ \\
  onCollapseButtonClick() {
    if (!this.items.some(x => x.showChildren)) return;

    if (this.selectedItem && this.selectedItem.parent) this.selectedItem = null;

    this.collapseItems(this.items);
  }




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













  // -----------------------------( ON KEYDOWN )------------------------------ \\
  @HostListener('document:keydown.escape')
  onKeydown() {
    // If the escape key was pressed and prompt is not enabled
    if (this.show) {
      if (this.selectedItem) {
        let el: HTMLElement = this.getItemElement();

        // Set editable to false
        if (el && el.contentEditable == 'true') {
          el.contentEditable = 'false';
        } else {
          // Deselect the selected item
          this.selectedItem = null;
          this.showItemProperties.emit(this.selectedItem);
        }
      }
    }
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
        if (this.searchResultsCount != null && this.items.length > 0 && this.items[0].type != NicheShackHierarchyItemType.Category) {
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
        if (this.searchResultsCount != null && this.items.length > 0 && this.items[0].type != NicheShackHierarchyItemType.Category) {
          result = true;
        } else {
          result = false;
        }

        break;
    }

    return result;
  }
















  // -----------------------------( LOAD CHILDREN )------------------------------ \\
  loadChildren(parent: HierarchyItem): Observable<Array<HierarchyItem>> {
    return new Observable(subscriber => {
      // If already in the process of loading children, return
      if (parent.loading) return;

      // Flag that we are loading children
      parent.loading = true;

      this.getTempItems((parent.type == NicheShackHierarchyItemType.Category ? 'Niche' : 'Product')) // <- Replace with this.dataService.get(...)
        .subscribe((items: Array<HierarchyItem>) => {

          // Set the item's properties
          items.map(x => {
            x.type = (parent.type == NicheShackHierarchyItemType.Category ? NicheShackHierarchyItemType.Niche : NicheShackHierarchyItemType.Product);
            x.parent = parent;
            x.children = [];
          });

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



















  // -----------------------------( ON ADD BUTTON CLICK )------------------------------ \\
  onAddItemButtonClick() {
    if (this.isAddButtonDisabled()) return;

    if (!this.selectedItem) {
      this.addItem(this.items);
    } else {
      if (this.selectedItem.children.length == 0) {
        this.loadChildren(this.selectedItem)
          .subscribe((children: Array<HierarchyItem>) => {
            this.addItem(children);
          });
      } else {
        this.selectedItem.showChildren = true;
        this.addItem(this.selectedItem.children);
      }
    }
  }

















  // -----------------------------( ADD ITEM )------------------------------ \\
  addItem(children: Array<HierarchyItem>) {
    let type: NicheShackHierarchyItemType;

    if (!this.selectedItem) {
      type = NicheShackHierarchyItemType.Category;
    } else if (this.selectedItem.type == NicheShackHierarchyItemType.Category) {
      type = NicheShackHierarchyItemType.Niche;
    } else {
      type = NicheShackHierarchyItemType.Product;
    }


    let newItem: HierarchyItem = {
      id: null,
      name: null,
      type: type,
      showChildren: false,
      loading: false,
      children: [],
      parent: this.selectedItem,
      childless: false,
      url: null,
      childrenUrl: null
    }

    children.unshift(newItem);

    window.setTimeout(() => {
      this.selectedItem = newItem;
      this.editItem();
    });
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
    let el: HTMLElement = this.getItemElement();

    // Set the element to be editable
    el.contentEditable = 'true';


    // Select the text
    let range: Range = document.createRange();
    range.selectNodeContents(el);
    let sel: Selection = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    // Remove keydown listener
    let removeKeydownListener = () => {
      el.removeEventListener('keydown', onKeydown);
    }

    // Remove blur listener
    let removeBlurListener = () => {
      el.removeEventListener('blur', onBlur);
    }

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
          this.saveItem(el, true);
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
        this.saveItem(el, false);
      }

      removeBlurListener();
      removeKeydownListener();
    }


    // keydown & blur listeners
    el.addEventListener('keydown', onKeydown);
    el.addEventListener('blur', onBlur)
  }
















  // -----------------------------( SAVE ITEM )------------------------------ \\
  saveItem(element: HTMLElement, showProperties: boolean) {
    let apiUrl: string;

    this.loadingService.loading = true;

    switch (this.selectedItem.type) {

      // Cateogry
      case NicheShackHierarchyItemType.Category:
        // If we have an Id, get the update url
        if (this.selectedItem.id) {
          apiUrl = 'api/categories/update...';

          // Get the post url
        } else {
          apiUrl = 'api/categories/post...';
        }
        break;


      // Niche
      case NicheShackHierarchyItemType.Niche:

        // If we have an Id, get the update url
        if (this.selectedItem.id) {
          apiUrl = 'api/Niches/update...';

          // Get the post url
        } else {
          apiUrl = 'api/Niches/post...';
        }
        break;



      // Product
      case NicheShackHierarchyItemType.Product:
        // If we have an Id, get the update url
        if (this.selectedItem.id) {
          apiUrl = 'api/Products/update...';

          // Get the post url
        } else {
          apiUrl = 'api/Products/post...';
        }
        break;

    }



    // If we have an Id, update the item
    if (this.selectedItem.id) {

      // Update
      this.updateTempItem(apiUrl, {
        id: this.selectedItem.id,
        name: element.innerText
      })
        .subscribe(() => {
          // Set the new name
          element.innerText = this.selectedItem.name = element.innerText;

          if (this.selectedItem.type == NicheShackHierarchyItemType.Product) {
            if (this.productService.product) {
              this.productService.product.name = this.selectedItem.name;
            }
          }

          // Hide the loading screen
          this.loadingService.loading = false;
        });

      // This is a new item
    } else {
      // Post new item
      this.postTempItem(apiUrl, element.innerText)
        .subscribe((id: string) => {
          // Assign the new id and name to the new item
          this.selectedItem.id = id;
          element.innerText = this.selectedItem.name = element.innerText;

          // Show the item's properties
          if (showProperties) {
            if (this.selectedItem.type == NicheShackHierarchyItemType.Product) {
              if (this.productService.product) {
                this.productService.product.name = this.selectedItem.name;
              }
            }


            this.showItemProperties.emit(this.selectedItem);

            // Don't show the item's properties
          } else {
            this.loadingService.loading = false;
          }

        });
    }
  }











  // -----------------------------( ON DELETE CLICK )------------------------------ \\
  onDeleteClick() {
    if (!this.selectedItem) return;

    let promptTitle = 'Delete ' + (this.selectedItem ? this.getTypeName(this.selectedItem.type) : '');
    let promptMessage = 'Are you sure you want to delete ' + (this.selectedItem ? this.selectedItem.name : '') + '?';

    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteItem, this);
  }
















  // -----------------------------( DELETE ITEM )------------------------------ \\
  deleteItem() {
    let items: Array<HierarchyItem>;

    if (!this.selectedItem.parent) {
      items = this.items;
    } else {
      items = this.selectedItem.parent.children;
    }

    items.splice(items.findIndex(x => x == this.selectedItem), 1);



    if (this.selectedItem.id) {
      this.loadingService.loading = true;

      this.deleteTempItem(this.selectedItem.id).subscribe(() => {
        this.loadingService.loading = false;
        this.showItemProperties.emit(this.selectedItem);
      });

    }

    this.selectedItem = null;
  }













  // -----------------------------( GET ITEM ELEMENT )------------------------------ \\
  getItemElement() {
    return document.getElementById(this.getTypeName(this.selectedItem.type) + '-' + this.selectedItem.id);
  }















  // -----------------------------( ON ITEM CLICK )------------------------------ \\
  onItemClick() {
    if (!this.editMode && this.selectedItem.id)
      this.showItemProperties.emit(this.selectedItem);
  }



















  // -----------------------------( CLEAR SEARCH RESULTS )------------------------------ \\
  clearSearchResults() {
    this.searchResultsCount = null;
    this.selectedItem = null;
    this.items = [];
    this.searchInput.value = '';
    this.getTempItems('Category')
      .subscribe(result => {
        this.items = result;
      });
  }










  // -----------------------------( GET TYPE NAME )------------------------------ \\
  getTypeName(type: NicheShackHierarchyItemType): string {
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
}
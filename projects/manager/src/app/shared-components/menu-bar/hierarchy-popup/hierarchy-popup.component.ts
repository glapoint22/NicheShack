import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { delay, debounceTime, switchMap, tap } from 'rxjs/operators';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { PopupComponent } from '../../popups/popup/popup.component';

@Component({
  selector: 'hierarchy-popup',
  templateUrl: './hierarchy-popup.component.html',
  styleUrls: ['./hierarchy-popup.component.scss', '../../popups/popup/popup.component.scss']
})
export class HierarchyPopupComponent extends PopupComponent implements OnInit {
  @Output() showItemProperties: EventEmitter<HierarchyItem> = new EventEmitter();
  public items: Array<HierarchyItem> = [];
  public selectedItem: HierarchyItem;
  // public isCollapsed: boolean;
  public showMenu: boolean;
  public filterType: string = 'Product';
  public searchResultsCount: number;
  private searchInput: any;


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);

    this.searchInput = document.getElementById('search-input');

    fromEvent(this.searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap((event: any) => {

          // Replace with this.dataService.get(...)
          return this.getTempItems(event.target.value == '' ? 'Category' : this.filterType);
        }),
        tap(items => {
          // Set the item properties
          items.map(item => {
            item.type = this.searchInput.value == '' ? 'Category' : this.filterType;
            item.children = [];
          })
        }))
      .subscribe((result: any) => {
        this.items = result;
        this.selectedItem = null;
        this.searchResultsCount = this.searchInput.value == '' ? null : this.items.length;
      });
  }


  // ---------------------Temp-----------------------------
  public getTempItems(type: string): Observable<any> {
    if (type == 'Category') {
      return new Observable(subscriber => {
        subscriber.next([
          {
            id: 0,
            name: 'Health & Fitness',
            type: 'Category',
            showChildren: false,
            loadingChildren: false,
            children: [],
            parent: null
          },
          {
            id: 1,
            name: 'Self-Help',
            type: 'Category',
            showChildren: false,
            loadingChildren: false,
            children: [],
            parent: null
          },
          {
            id: 2,
            name: 'E-business & E-marketing',
            type: 'Category',
            showChildren: false,
            loadingChildren: false,
            children: [],
            parent: null
          }
        ]);
      }).pipe(delay(1000));


    } else if (type == 'Niche') {
      return new Observable(subscriber => {
        subscriber.next([
          {
            id: 0,
            name: 'Diets & Weight Loss'
          },
          {
            id: 1,
            name: 'Exercise & Fitness'
          },
          {
            id: 2,
            name: 'Remedies'
          },
          {
            id: 3,
            name: 'Nutrition'
          }
        ]);

      }).pipe(delay(1000));
    } else {
      return new Observable(subscriber => {
        subscriber.next([
          {
            id: '102B896BF0',
            name: 'The Paruresis Treatment System'
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
        ]);

      }).pipe(delay(1000))
    }
  }
  // ------------------------------------------------------

  ngOnInit() {

    this.getTempItems('Category')
      .subscribe(result => {
        this.items = result;
      });

  }

  



  onCollapseButtonClick() {
    if (!this.items.some(x => x.showChildren)) return;

    if (this.selectedItem && this.selectedItem.parent) this.selectedItem = null;

    this.items.forEach(item => {
      item.showChildren = false;

      if (item.children) {
        item.children.forEach(item => {
          item.showChildren = false;
        });
      }
    });
  }

  isCollapseButtonDisabled() {
    return !this.items.some(x => x.showChildren);
  }


  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    // If the escape key was pressed and prompt is not enabled
    if (event.keyCode == 27 && !document.getElementById('prompt')) {
      if (this.selectedItem) {
        let el: HTMLElement = this.getItemElement();

        // Set editable to false
        if (el.contentEditable == 'true') {
          el.contentEditable = 'false';
        } else {
          // Deselect the selected item
          this.selectedItem = null;
        }
      }
    }
  }


  getAddButtonTitle() {
    let title: string;

    switch (this.selectedItem && this.selectedItem.type) {
      case 'Category':
        title = 'Add Niche';
        break;

      case 'Niche':
        title = 'Add Product';
        break;

      case 'Product':
        title = 'Add (Not Available)';
        break;

      default:
        if (this.searchResultsCount != null && this.items.length > 0 && this.items[0].type != 'Category') {
          title = 'Add (Not Available)'
        } else {
          title = 'Add Category';
        }

        break;
    }

    return title;
  }


  isAddButtonDisabled() {
    let result: boolean;

    switch (this.selectedItem && this.selectedItem.type) {
      case 'Category':
        result = false;
        break;

      case 'Niche':
        result = false;
        break;

      case 'Product':
        result = true;
        break;

      default:
        if (this.searchResultsCount != null && this.items.length > 0 && this.items[0].type != 'Category') {
          result = true;
        } else {
          result = false;
        }

        break;
    }

    return result;
  }



  loadChildren(parent: HierarchyItem): Observable<Array<HierarchyItem>> {
    return new Observable(subscriber => {
      // If already in the process of loading children, return
      if (parent.loadingChildren) return;

      // Flag that we are loading children
      parent.loadingChildren = true;

      this.getTempItems((parent.type == 'Category' ? 'Niche' : 'Product')) // <- Replace with this.dataService.get(...)
        .subscribe((items: Array<HierarchyItem>) => {

          // Set the item's properties
          items.map(x => {
            x.type = (parent.type == 'Category' ? 'Niche' : 'Product');
            x.parent = parent;
            x.children = [];
          });

          // Assign the items and flag loading has completed
          parent.children = items;
          parent.loadingChildren = false;

          // Return the items
          subscriber.next(parent.children);

          // flag that we are showing children
          window.setTimeout(() => {
            parent.showChildren = true;
          }, 100);
        });
    });
  }


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




  addItem(children: Array<HierarchyItem>) {
    let type: string;

    if (!this.selectedItem) {
      type = 'Category';
    } else if (this.selectedItem.type == 'Category') {
      type = 'Niche';
    } else {
      type = 'Product';
    }


    let newItem: HierarchyItem = {
      id: Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase(),
      name: 'New ' + type,
      type: type,
      showChildren: false,
      loadingChildren: false,
      children: [],
      parent: this.selectedItem
    }

    children.unshift(newItem);

    window.setTimeout(() => {
      this.selectedItem = newItem;
      this.editItem();
    });
  }


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
          el.innerText = this.selectedItem.name;

          // Enter was pressed
        } else {
          event.preventDefault();
          this.selectedItem.name = el.innerText;
          el.contentEditable = 'false';
          // Save
        }

        // remove the listeners
        removeKeydownListener();
        removeBlurListener();
      }
    }


    // On Blur
    let onBlur = () => {
      el.contentEditable = 'false';
      if (el.innerText != this.selectedItem.name) el.innerText = this.selectedItem.name;

      removeBlurListener();
      removeKeydownListener();
    }


    // keydown & blur listeners
    el.addEventListener('keydown', onKeydown);
    el.addEventListener('blur', onBlur)
  }

  deleteItem() {
    let items: Array<HierarchyItem>;

    if (!this.selectedItem.parent) {
      items = this.items;
    } else {
      items = this.selectedItem.parent.children;
    }

    items.splice(items.findIndex(x => x == this.selectedItem), 1);

    this.selectedItem = null;

  }

  getItemElement() {
    return document.getElementById(this.selectedItem.type + '-' + this.selectedItem.id);
  }

  onItemClick() {
    // if (!this.selectedItem || this.selectedItem.type == 'Category') return;

    this.showItemProperties.emit(this.selectedItem);
  }

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
}




























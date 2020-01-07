import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HierarchyItem } from '../../../classes/hierarchy-item';

@Component({
  selector: 'hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnInit {
  @Output() showForm: EventEmitter<any> = new EventEmitter();
  public items: Array<HierarchyItem>;
  public selectedItem: HierarchyItem;
  public isCollapsed: boolean;
  public showMenu: boolean;

  // ---------------------Temp-----------------------------
  public getTempItems(type: string): Observable<any> {
    if (type == 'Category') {
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
    this.items = [
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
    ]
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
    if (event.keyCode == 27 && !document.getElementById('prompt')) {
      if (this.selectedItem) {
        let el: HTMLElement = this.getItemElement();

        if (el.contentEditable == 'true') {
          el.contentEditable = 'false';
        } else {
          this.selectedItem = null;
        }
      }
    }
  }


  getAddButtonTitle() {
    let title: string;

    switch (this.selectedItem && this.selectedItem.type) {
      case 'Category':
        title = 'Add Niche'
        break;

      case 'Niche':
        title = 'Add Product'
        break;

      case 'Product':
        title = 'Add'
        break;

      default:
        title = 'Add Category'
        break;
    }

    return title;
  }


  loadChildren(parent: HierarchyItem): Observable<Array<HierarchyItem>> {
    return new Observable(subscriber => {
      // If already in the process of loading children, return
      if (parent.loadingChildren) return;

      // Flag that we are loading children
      parent.loadingChildren = true;

      this.getTempItems(parent.type) // <- Replace with this.dataService.get(...)
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
    if (this.selectedItem && this.selectedItem.type == 'Product') return;

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

    // Remove blue listener
    let removeBlurListener = () => {
      el.removeEventListener('blur', onBlur);
    }

    // On Keydown
    let onKeydown = (event: KeyboardEvent) => {
      if (event.keyCode == 13 || event.keyCode == 27) {
        if (event.keyCode == 27) {
          el.innerText = this.selectedItem.name;
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
      el.innerText = this.selectedItem.name;
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

  onOpenFormButtonClick() {
    if(!this.selectedItem || this.selectedItem.type == 'Category') return;

    this.showForm.emit(this.selectedItem);
  }
}
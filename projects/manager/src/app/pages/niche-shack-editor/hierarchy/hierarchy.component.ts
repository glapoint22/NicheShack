import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnInit {
  @Output() showForm: EventEmitter<any> = new EventEmitter();
  public categories: Array<any>;
  public selectedItem: any = {};
  public isCollapsed: boolean;
  public showMenu: boolean;



  // ---------------------Temp-----------------------------
  public getTempItems(type: string): Observable<any> {
    if (type == 'niches') {
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

  ngOnInit() {
    this.categories = [
      {
        id: 0,
        name: 'Health & Fitness'
      },
      {
        id: 1,
        name: 'Self-Help'
      },
      {
        id: 2,
        name: 'E-business & E-marketing'
      }
    ]
  }


  onCategoryButtonClick(categoryId: number, input: HTMLInputElement, itemElement: HTMLLIElement) {
    // Get the category from the categories array based on the passed in category id
    let category = this.categories.find(x => x.id == categoryId);

    // Mark this category as the selected item
    this.selectedItem = { item: category, type: 'Category', element: itemElement };

    // If the category has not retrieved its niches
    if (!category.niches) {
      // Prevent the arrow button from rotating while loading the niches
      window.setTimeout(() => {
        input.checked = false;
      });

      // Get niches
      this.loadChildren(category, 'niches')
        .subscribe(() => {
          // This will rotate the arrow button
          input.checked = true;
        });


    } else {
      window.setTimeout(() => {
        // Expand or collapse
        category.expanded = input.checked;

        // Collapse each niche if the category is not checked
        if (!input.checked) {
          category.niches.forEach(niche => {
            niche.expanded = false;
          });
        }
      });
    }
  }


  onProductButtonClick(categoryId: number, nicheId: number, input: HTMLInputElement, itemElement: HTMLLIElement) {
    // Get the niche from the niches array based on the passed in category id and niche id
    let category = this.categories.find(x => x.id == categoryId);
    let niche = category.niches.find(x => x.id == nicheId);

    // Mark this niche as the selected item
    this.selectedItem = { item: niche, type: 'Niche', element: itemElement };;

    // If the niche has not retrieved its products
    if (!niche.products) {

      // Prevent the arrow button from rotating while loading the products
      window.setTimeout(() => {
        input.checked = false;
      });


      // Get products
      this.loadChildren(niche, 'products')
        .subscribe(() => {
          // This will rotate the arrow button
          input.checked = true;
        });
    } else {
      window.setTimeout(() => {
        niche.expanded = input.checked;
      });
    }
  }




  loadChildren(parentItem: any, childrenType: string): Observable<Array<any>> {
    return new Observable(subscriber => {
      // If already in the process of loading children, return
      if (parentItem.loadingChildren) return;

      // Flag that we are loading children
      parentItem.loadingChildren = true;

      this.getTempItems(childrenType) // <- Replace with this.dataService.get(...)
        .subscribe(items => {
          items.map(x => x.parentItem = parentItem)

          // Assign the items and flag loading has completed
          parentItem[childrenType] = items;
          parentItem.loadingChildren = false;

          // Return the items
          subscriber.next(parentItem[childrenType]);

          // flag that we are expanding
          window.setTimeout(() => {
            parentItem.expanded = true;
          }, 100);
        });
    });
  }






  collapse() {
    if (!this.categories.some(x => x.expanded)) return;

    if (this.selectedItem.type != 'Category') this.selectedItem = {};

    this.categories.forEach(category => {
      category.expanded = false;

      if (category.niches) {
        category.niches.forEach(niche => {
          niche.expanded = false;
        });
      }

    });
  }

  isCollapseButtonDisabled() {
    return !this.categories.some(x => x.expanded);
  }


  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.keyCode == 27) {
      if (this.selectedItem.element && this.selectedItem.element.contentEditable == 'true') {
        this.selectedItem.element.contentEditable = 'false';
      } else {
        this.selectedItem = {};
      }

    }
  }

  transitionend(event) {
    if (event.target.classList.contains('expand-arrow-button')) {
      event.target.style = "";
    } else {
      event.target.style = "visibility: hidden";
    }
  }

  getAddButtonTitle() {
    let title: string;

    switch (this.selectedItem.type) {
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


  onAddItemButtonClick() {
    switch (this.selectedItem.type) {
      case 'Category':
        // If the selected category does not contain niches, get the niches and then add the new niche
        if (!this.selectedItem.item.niches) {
          this.loadChildren(this.selectedItem.item, 'niches')
            .subscribe(niches => {
              this.addItem('Niche', niches);
            });
        } else {
          // The selected category already contains niches, add the new niche
          this.addItem('Niche', this.selectedItem.item.niches);
        }
        break;
      case 'Niche':
        // If the selected Niche does not contain products, get the products and then add the new product
        if (!this.selectedItem.item.products) {
          this.loadChildren(this.selectedItem.item, 'products')
            .subscribe(products => {
              this.addItem('Product', products);
            });
        } else {
          // The selected niche already contains products, add the new product
          this.addItem('Product', this.selectedItem.item.products);
        }
        break;

      case 'Product':
        return;

      default:
        this.addItem('Category', this.categories);
        break;
    }
  }


  addItem(type: string, collection: Array<any>) {
    let id: number | string;

    if (type == 'Product') {
      id = Math.floor((Math.random()) * 0x10000000000).toString(16).toUpperCase();
    } else {
      id = Math.max(...collection.map(x => x.id)) + 1;
    }

    let item = {
      id: id,
      name: 'New ' + type,
      parentItem: type != 'Category' ? this.selectedItem.item : null
    }

    collection.unshift(item);

    window.setTimeout(() => {
      let el = document.getElementById(type + '-' + id);
      this.selectedItem = { item: item, type: type, element: el }
      this.editItem();
    });
  }


  editItem() {
    if (!this.selectedItem.item) return;

    // Get the element
    let el: HTMLElement = this.selectedItem.element;

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
          el.innerText = this.selectedItem.item.name;
        } else {
          event.preventDefault();
          this.selectedItem.item.name = el.innerText;
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
      el.innerText = this.selectedItem.item.name;
      removeBlurListener();
      removeKeydownListener();
    }


    // keydown & blur listeners
    el.addEventListener('keydown', onKeydown);
    el.addEventListener('blur', onBlur)
  }

  deleteItem() {
    if (this.selectedItem.type == 'Category') {
      this.categories.splice(this.categories.findIndex(x => x == this.selectedItem.item), 1);
    } else {
      this.selectedItem.item.parentItem[this.selectedItem.type.toLowerCase() + 's'].splice(this.selectedItem.item.parentItem[this.selectedItem.type.toLowerCase() + 's'].findIndex(x => x == this.selectedItem.item), 1);
    }

    this.selectedItem = {};
  }
}
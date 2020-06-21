import { Component, HostListener } from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import { tap, debounceTime, switchMap } from 'rxjs/operators';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { PopupComponent } from '../../popups/popup/popup.component';
import { PopupService } from '../../../services/popup.service';
import { CoverService } from '../../../services/cover.service';
import { MenuService } from '../../../services/menu.service';
import { DropdownMenuService } from '../../../services/dropdown-menu.service';
import { TempDataService } from '../../../services/temp-data.service';
import { KeyValue } from '@angular/common';
import { PromptService } from '../../../services/prompt.service';

@Component({
  template: '',
})
export class HierarchyPopupComponent extends PopupComponent {
  public items: Array<HierarchyItem>;
  public selectedItem: HierarchyItem;
  public searchInput: HTMLInputElement;
  public filterType: number;
  public searchResults: Array<HierarchyItem>;
  public editMode: boolean;
  public showMenu: boolean;

  constructor(popupService: PopupService,
    cover: CoverService,
    menuService: MenuService,
    dropdownMenuService: DropdownMenuService,
    private dataService: TempDataService,
    private promptService: PromptService) { super(popupService, cover, menuService, dropdownMenuService) }



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
        // this.selectedItem = null;
        this.searchResults = searchResults;
      });
  }





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




  // -----------------------------( CLEAR SEARCH RESULTS )------------------------------ \\
  clearSearchResults() {
    this.searchResults = null;
    this.searchInput.value = '';
  }





  // -----------------------------( IS COLLAPSE BUTTON DISABLED )------------------------------ \\
  isCollapseButtonDisabled() {
    if (!this.items && !this.searchResults) return true;
    return !this.items.some(x => x.showChildren);
  }


  isEditItemDisabled(): boolean {
    return !this.selectedItem || this.editMode || (this.selectedItem.parent && !this.selectedItem.parent.showChildren);
  }



  // -----------------------------( ON EDIT ITEM CLICK )------------------------------ \\
  onEditItemClick() {
    if (this.isEditItemDisabled()) return;

    this.editItem(true);
  }






  // -----------------------------( EDIT ITEM )------------------------------ \\
  editItem(editingItem?: boolean) {
    if (!this.selectedItem) return;

    this.editMode = true;

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
          if (editingItem) {
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

        // this.editMode = false;
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
        } else {
          this.editMode = false;
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



  isDeleteItemDisabled() {
    return !this.selectedItem || this.editMode || (this.selectedItem.parent && !this.selectedItem.parent.showChildren);
  }





  // -----------------------------( ON DELETE CLICK )------------------------------ \\
  onDeleteClick() {
    if (this.isDeleteItemDisabled()) return;

    let promptTitle = 'Delete';
    let promptMessage = 'Are you sure you want to delete ' + this.selectedItem.name + '?';

    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteItem, this);
  }






  // -----------------------------( DELETE ITEM )------------------------------ \\
  deleteItem() {
    let items: Array<HierarchyItem>;

    // Item has no parent
    if (!this.selectedItem.parent) {
      items = this.searchResults ? this.searchResults : this.items;

      // Item has a parent
    } else {
      items = this.selectedItem.parent.children;
    }


    // If the item has an id
    if (this.selectedItem.id) {
      this.selectedItem.loading = true;

      // Delete this item from the database
      this.dataService.delete(this.selectedItem.url, {
        id: this.selectedItem.id
      }).subscribe(() => {
        items.splice(items.findIndex(x => x == this.selectedItem), 1);
        this.selectedItem.loading = false;
        this.selectedItem = null;
        this.editMode = false;
      });

      // This item has no id
      // This means it's a new item
      // Just remove it from the array
    } else {
      items.splice(items.findIndex(x => x == this.selectedItem), 1);
      this.selectedItem = null;
      this.editMode = false;
    }
  }




  // -----------------------------( ON ADD BUTTON CLICK )------------------------------ \\
  onAddItemButtonClick() {
    if (this.isAddItemDisabled()) return;

    if (!this.selectedItem) {
      this.addItem(this.items);
    } else {
      if (this.selectedItem.children && this.selectedItem.children.length > 0) {
        this.selectedItem.showChildren = true;
        this.addItem(this.selectedItem.children);




      } else {
        this.loadChildren(this.selectedItem)
          .subscribe((children: Array<HierarchyItem>) => {
            this.addItem(children);
          });
      }
    }
  }




  // -----------------------------( SAVE ITEM )------------------------------ \\
  saveItem(element: HTMLElement) {
    // Flag that we are saving
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
          this.editMode = false;
        });

      // This is a new item
    } else {
      // Post new item
      this.dataService.post(this.selectedItem.url, element.innerText)
        .subscribe((id: string) => {
          // Assign the new id
          this.selectedItem.id = id;

          // Set the name of the item
          element.innerText = this.selectedItem.name = element.innerText;

          // Flag that saving is complete
          this.selectedItem.loading = false;

          this.editMode = false;
        });
    }
  }





  // -----------------------------( IS ADD BUTTON DISABLED )------------------------------ \\
  isAddItemDisabled(): boolean {
    if ((!this.items && !this.searchResults) ||
      this.editMode ||
      (this.selectedItem && this.selectedItem.parent && !this.selectedItem.parent.showChildren)) return true;

    return false;
  }






  // -----------------------------( ADD ITEM )------------------------------ \\
  addItem(children: Array<HierarchyItem>) {
    let item: HierarchyItem = this.createItem();

    children.unshift(item);

    window.setTimeout(() => {
      this.selectedItem = item;
      this.editItem();
    });
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
          this.editMode = false;
        } else {
          // Deselect the selected item
          this.selectedItem = null;
        }
      }
    }
  }






  // -----------------------------( MAP ITEMS )------------------------------ \\
  mapItems(items: Array<HierarchyItem>, parent?: HierarchyItem, type?: number) { }



  // -----------------------------( GET URL )------------------------------ \\
  getUrl(type: number): string { return }



  // -----------------------------( CREATE ITEM )------------------------------ \\
  createItem(): HierarchyItem { return }
}
import { Component, HostListener } from '@angular/core';
import { HierarchyComponent } from '../hierarchy.component';
import { HierarchyItem } from '../../../classes/hierarchy-item';
import { fromEvent, of } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { DataService } from 'services/data.service';
import { PromptService } from 'services/prompt.service';

@Component({
  template: '',
})
export class EditableHierarchyComponent extends HierarchyComponent {
  public editMode: boolean;
  public searchResults: Array<HierarchyItem>;
  public searchInput: HTMLInputElement;
  public filterType: number;
  constructor(dataService: DataService, public promptService: PromptService) { super(dataService) }


  // -----------------------------( INIT SEARCH )------------------------------ \\
  initSearch() {
    this.searchInput = document.getElementById('search-input') as HTMLInputElement;

    fromEvent(this.searchInput, 'input')
      .pipe(
        debounceTime(250),
        switchMap(() => {
          if (this.searchInput.value == '') {
            this.clearSearchResults();
            return of();
          }
          return this.load(this.getUrl(this.filterType) + '/Search', [{ key: 'searchWords', value: this.searchInput.value }]);
        }))
      .pipe(tap((items: Array<HierarchyItem>) => {
        this.mapItems(items, null, this.filterType);
      }))
      .subscribe((searchResults: Array<HierarchyItem>) => {
        this.searchResults = searchResults;
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

    return super.isCollapseButtonDisabled();
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
    let el: HTMLElement = document.getElementById(this.selectedItem.hierarchyId);

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

          if (el.innerText.length == 0) return;

          // Set it to non editable
          el.contentEditable = 'false';

          // Save
          if (el.innerText != this.selectedItem.name) {
            this.saveItem(el);
          } else {
            this.editMode = false;
          }
        }

        // remove the listeners
        removeKeydownListener();
        removeBlurListener();
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
          this.editMode = false;
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










  // -----------------------------( IS DELETE ITEM DISABLED )------------------------------ \\
  isDeleteItemDisabled() {
    return !this.selectedItem || this.editMode || (this.selectedItem.parent && !this.selectedItem.parent.showChildren);
  }









  // -----------------------------( ON DELETE CLICK )------------------------------ \\
  onDeleteClick() {
    if (this.isDeleteItemDisabled()) return;

    let promptTitle = 'Delete';
    let promptMessage = 'Are you sure you want to delete this ' + this.getItemName(this.selectedItem.type).toLowerCase() + '?';

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










  // -----------------------------( IS ADD BUTTON DISABLED )------------------------------ \\
  isAddItemDisabled(): boolean {
    if ((!this.items && !this.searchResults) ||
      this.editMode ||
      (this.selectedItem && this.selectedItem.parent && !this.selectedItem.parent.showChildren)) return true;

    return false;
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





  // -----------------------------( ADD ITEM )------------------------------ \\
  addItem(children: Array<HierarchyItem>) {
    let item: HierarchyItem = this.createItem();

    children.unshift(item);

    window.setTimeout(() => {
      this.selectedItem = item;
      this.editItem();
    });
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
      this.dataService.post(this.selectedItem.url, {
        id: this.selectedItem.parent ? this.selectedItem.parent.id : 0,
        name: element.innerText
      })
        .subscribe((id: number) => {
          // Assign the new id
          this.selectedItem.id = id;

          // Set the name of the item
          element.innerText = this.selectedItem.name = element.innerText;

          this.mapItems([this.selectedItem], this.selectedItem.parent);

          // Flag that saving is complete
          this.selectedItem.loading = false;

          this.editMode = false;
        });
    }
  }




  // -----------------------------( ON KEYDOWN )------------------------------ \\
  @HostListener('document:keydown.escape')
  onKeydown() {
    // If the escape key was pressed
    if (this.selectedItem) {

      // Get the element
      let el: HTMLElement = document.getElementById(this.selectedItem.id.toString());

      // Set editable to false
      if (el && el.contentEditable == 'true') {
        el.contentEditable = 'false';
        this.editMode = false;
      } else {
        // If prompt is not up, deselect the selected item
        if (!this.promptService.show) {
          this.selectedItem = null;
        }
      }
    }
  }



  // -----------------------------( CREATE ITEM )------------------------------ \\
  createItem(): HierarchyItem { return }



  // -----------------------------( GET ITEM NAME )------------------------------ \\
  getItemName(type: number): string { return }


  // -----------------------------( GET ADD BUTTON TITLE )------------------------------ \\
  getAddButtonTitle() { }


  // -----------------------------( GET URL )------------------------------ \\
  getUrl(type: number): string { return }
}
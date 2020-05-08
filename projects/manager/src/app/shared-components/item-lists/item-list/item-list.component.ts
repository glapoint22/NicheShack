import { Component, ViewChildren, ElementRef, QueryList, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnChanges {
  public listItems: any[] = [];
  public lastFocusedListItem: any;
  public pivotIndex: number = null;
  public ctrlDown: boolean = false;
  public shiftDown: boolean = false;
  public newListItem: boolean = false;
  public itemDeleted: boolean = false;
  public isAddDisabled: boolean = false;
  public isEditDisabled: boolean = true;
  public overIconButton: boolean = false;
  public isDeleteDisabled: boolean = true;
  public eventListenersAdded: boolean = false;
  public selectedListItemIndex: number = null;
  public unselectedListItemIndex: number = null;
  constructor(public menuService: MenuService) { }
  @Input() list: Array<string>;
  @Input() menuOptions: Array<string>;
  @ViewChildren('listItem') listItem: QueryList<ElementRef>;
  @Output() onAddItem: EventEmitter<void> = new EventEmitter();
  @Output() onEditItem: EventEmitter<void> = new EventEmitter();


  // -----------------------------( NG ON CHANGES )------------------------------ \\
  ngOnChanges() {
    this.listItems = this.list.map(x => ({
      name: x,
      selected: false,
      selectType: null
    }));
  }


  // -----------------------------( ADD EVENT LISTENERS )------------------------------ \\
  addEventListeners() {
    if (!this.eventListenersAdded) {
      this.eventListenersAdded = true;
      window.addEventListener('keyup', this.onKeyUp);
      window.addEventListener('keydown', this.onKeyDown);
      window.addEventListener('mousedown', this.onMouseDown);
      window.addEventListener('blur', this.onInnerWindowBlur);
    }
  }


  // -----------------------------( REMOVE EVENT LISTENERS )------------------------------ \\
  removeEventListeners() {
    this.removeFocus();
    this.eventListenersAdded = false;
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('blur', this.onInnerWindowBlur);
  }

  
  // -----------------------------( ON KEY DOWN )------------------------------ \\
  onKeyDown = (event: KeyboardEvent) => {
    this.setShortcutKeys(event)
    if (!this.isEditDisabled && event.ctrlKey && event.altKey && event.keyCode === 69) this.onEditItem.emit();
  };


  // -----------------------------( SET SHORTCUT KEYS )------------------------------ \\
  setShortcutKeys(event: KeyboardEvent) {
    if (event.keyCode === 46) {
      this.deleteListItem();
      this.itemDeleted = true;
    }
    if (event.keyCode === 27) this.escape();
    if (event.keyCode === 38) this.arrowUp();
    if (event.keyCode === 40) this.arrowDown();
    if (event.ctrlKey) this.ctrlDown = true;
    if (event.shiftKey) this.shiftDown = true;
  }


  // -----------------------------( ON KEY UP )------------------------------ \\
  onKeyUp = (event: KeyboardEvent) => {
    if (event.keyCode === 16) this.shiftDown = false;
    if (event.keyCode === 17) this.ctrlDown = false;
  }


  // -----------------------------( ON INNER WINDOW BLUR )------------------------------ \\
  onInnerWindowBlur = () => {
    // * When the focus gets set to something that is outside the inner-window * \\

    // Then remove all listeners and selections
    this.removeEventListeners();
  }


  // -----------------------------( ON MOUSE DOWN )------------------------------ \\
  onMouseDown = () => {
    // As long as the context menu is open
    if (this.menuService.showMenu
      // and we're NOT clicking on an icon button
      && !this.overIconButton) {

      window.setTimeout(() => {
        // check to see if the context menu is now closed, if it is
        if (!this.menuService.showMenu
          // and we're not selecting a list item
          && document.activeElement != this.lastFocusedListItem) {

          // Then remove all listeners and selections
          this.removeEventListeners();
        }
      }, 20)
    }
  }


  // -----------------------------( ON LIST ITEM BLUR )------------------------------ \\
  onListItemBlur() {
    window.setTimeout(() => {
      // As long as a list item isn't losing focus becaus another list item is receiving focus
      if (document.activeElement != this.lastFocusedListItem
        // and the context menu is NOT open
        && !this.menuService.showMenu
        // and we're NOT clicking on an icon button
        && !this.overIconButton) {
          // Determine what happens when a list item loses focus 
          this.setListItemBlur();
      }
    })
  }


  // -----------------------------( SET LIST ITEM BLUR )------------------------------ \\
  setListItemBlur() {
    // When an item is deleted, it loses focus.
    // This is to prevent the listeners from being removed when an item gets deleted
    if (!this.itemDeleted) {
      // Then remove all listeners and selections
      this.removeEventListeners();
    }
    this.itemDeleted = false;
  }


  // -----------------------------( ON ICON BUTTON MOUSE OUT )------------------------------ \\
  onIconButtonMouseOut() {
    this.overIconButton = false;

    // * A fail safe that puts the focus back to the selected list item if a mouseup occurs outside the click bounds of an icon button * \\ 

    // As long as the context menu is NOT open
    if (!this.menuService.showMenu) {
      // If a list item is selected
      if (this.selectedListItemIndex != null) {
        // Set focus to that list item
        this.listItem.find((item, index) => index == this.selectedListItemIndex).nativeElement.focus();
      }
    }
  }


  // -----------------------------( ON LIST ITEM DOWN )------------------------------ \\
  onListItemDown(index: number) {

    window.setTimeout(() => {
      this.lastFocusedListItem = document.activeElement;

      this.setListItemSelection(index);
    })
  }


  // -----------------------------( SET LIST ITEM SELECTION )------------------------------ \\
  setListItemSelection(index: number) {
    this.addEventListeners();
    this.isEditDisabled = false;
    this.isDeleteDisabled = false;
    this.selectedListItemIndex = index;
    this.unselectedListItemIndex = null;
    // Define what list items are selected
    this.setListItemSelected(index);
    // Then define what the selection type is for each list item
    this.setListItemSelectType();
  }


  // -----------------------------( SET LIST ITEM SELECTED )------------------------------ \\ 
  setListItemSelected(index: number) {
    // If the shift key is down
    if (this.shiftDown) {
      this.setListItemSelectedShiftKey();

      // If the ctrl key is down 
    } else if (this.ctrlDown) {
      this.setListItemSelectedCtrlKey(index);

      // If NO modifier key is down
    } else {
      this.listItemDownNoModifierKey(index);
    }
    // Set edit on or off
    this.isEditDisabled = this.listItems.map(e => e.selected).indexOf(true) == this.listItems.map(e => e.selected).lastIndexOf(true) && this.unselectedListItemIndex == null ? false : true;
  }


  // -----------------------------( SET LIST ITEM SELECT TYPE )------------------------------ \\ 
  setListItemSelectType() {
    // If there is only one list item in the list
    if (this.listItems.length == 1) {
      // Set the type to whole
      this.listItems[0].selectType = "whole";

      // If there is more than one list item
    } else {

      // First list item
      this.listItems[0].selectType = this.listItems[0].selected ? this.listItems[1].selected ? "top" : this.unselectedListItemIndex == 1 ? "top" : "whole" : null;

      // Every list item in between
      for (let i = 1; i < this.listItems.length - 1; i++) {
        // Set the select type based on the following:
        this.listItems[i].selectType =

          // If a list item is marked as selected
          this.listItems[i].selected ?

            // If the list item before is NOT selected and the list item after IS selected
            !this.listItems[i - 1].selected && this.listItems[i + 1].selected ?
              "top" :

              // If the list item before IS selected and the list item after is NOT selected
              this.listItems[i - 1].selected && !this.listItems[i + 1].selected ?

                // And that list item after is unselected with the unselect
                i + 1 == this.unselectedListItemIndex ?
                  "middle" :

                  // But if its just NOT selected
                  "bottom" :

                // If the list item before is NOT selected and the list item after is also NOT selected
                !this.listItems[i - 1].selected && !this.listItems[i + 1].selected ?

                  // And that list item after is unselected with the unselect
                  i + 1 == this.unselectedListItemIndex ?
                    "top" :

                    // But if its just NOT selected
                    "whole" :

                  // If the list item before IS selected and the list item after is also selected
                  "middle" :

            // If a list item is NOT selected
            null;
      }

      // Last list item
      this.listItems[this.listItems.length - 1].selectType = this.listItems[this.listItems.length - 1].selected ? this.listItems[this.listItems.length - 2].selected ? "bottom" : "whole" : null;
    }
  }


  // -----------------------------( SET LIST ITEM SELECTED SHIFT KEY )------------------------------ \\
  setListItemSelectedShiftKey() {
    // Clear the selection from all list items
    for (let i = 0; i < this.listItems.length; i++) {
      this.listItems[i].selected = false;
    }

    // If the selection is after the pivot
    if (this.selectedListItemIndex > this.pivotIndex) {

      // Select all the list items from the pivot down to the selection
      for (let i = this.pivotIndex; i <= this.selectedListItemIndex; i++) {
        this.listItems[i].selected = true;
      }

      // If the selection is before the pivot 
    } else {

      // Select all the list items from the pivot up to the selection
      for (let i = this.pivotIndex; i >= this.selectedListItemIndex; i--) {
        this.listItems[i].selected = true;
      }
    }
  }


  // -----------------------------( SET LIST ITEM SELECTED CTRL KEY )------------------------------ \\
  setListItemSelectedCtrlKey(index: number) {
    // If the list item we are pressing down on is already selected
    if (this.listItems[index].selected) {

      // Unselect that list item
      this.listItems[index].selected = false;
      this.unselectedListItemIndex = index;
      this.selectedListItemIndex = null;
      // If no other list item is selected
      if (this.listItems.map(e => e.selected).indexOf(true) == -1) {
        // Then there is nothing to delete, so disable the ability to delete
        this.isDeleteDisabled = true;

        // But if there is still a list item that is selected
      } else {
        // Then enable the ability to delete a list item
        this.isDeleteDisabled = false;
      }

      // If the list item we are pressing down on is NOT yet selected
    } else {

      // Select that list item
      this.listItems[index].selected = true;
      this.unselectedListItemIndex = null;
      this.selectedListItemIndex = index;
    }
    // Define the pivot index
    this.pivotIndex = index;
  }


  // -----------------------------( LIST ITEM DOWN NO MODIFIER KEY )------------------------------ \\
  listItemDownNoModifierKey(index: number) {
    // Clear all the selected
    for (let i = 0; i < this.listItems.length; i++) this.listItems[i].selected = false;
    // Set the selected
    this.listItems[index].selected = true;
    // Define the pivot index
    this.pivotIndex = index;
  }


  // -----------------------------( ON LIST ITEM DOUBLE CLICK )------------------------------ \\
  onListItemDoubleClick() {
    // As long as the shift key and the ctrl key is not being pressed
    if (!this.shiftDown && !this.ctrlDown) {
      this.editListItem();
    }
  }


  // -----------------------------( REMOVE FOCUS )------------------------------ \\
  removeFocus() {
    this.pivotIndex = null;
    this.isEditDisabled = true;
    this.isDeleteDisabled = true;
    this.selectedListItemIndex = null;
    this.unselectedListItemIndex = null;

    for (let i = 0; i < this.listItems.length; i++) {
      this.listItems[i].selected = false;
      this.listItems[i].selectType = null;
    }
  }


  // -----------------------------( ADD LIST ITEM )------------------------------ \\
  addListItem() {
    if (!this.isAddDisabled) {
      this.onAddItem.emit();
    }
  }


  // -----------------------------( EDIT LIST ITEM )------------------------------ \\
  editListItem() {
    if (!this.isEditDisabled) {
      this.onEditItem.emit();
    }
  }


  // -----------------------------( DELETE )------------------------------ \\
  deleteListItem() {
    if (!this.isDeleteDisabled) {
      let listItemCopy: any;
      let deletedListItemIndex: number;


      // If a list item is selected
      if (this.selectedListItemIndex != null) {
        // Loop through the list of list items starting with the selected list item
        for (let i = this.selectedListItemIndex + 1; i < this.listItems.length; i++) {
          // If we come across a list item that is NOT selected
          if (!this.listItems[i].selected) {
            // Make a copy of that list item so it can be used as the newly selected list item when all the other list items are deleted
            listItemCopy = this.listItems[i];
            break;
          }
        }
      }

      // But if a list item is unselected
      if (this.unselectedListItemIndex != null) {
        // Make a copy of that list item so it can remain as the unselected list item when all the other list items are deleted
        listItemCopy = this.listItems[this.unselectedListItemIndex];
      }


      // Now delete all the selected list items
      do {
        // Find a list item in the list that is marked as selected
        deletedListItemIndex = this.listItems.map(e => e.selected).indexOf(true);
        // As long as a list item that is marked as selected is found
        if (deletedListItemIndex != -1) {
          // Remove that list item
          this.listItems.splice(deletedListItemIndex, 1);
        }
      }
      // Loop until all the list items marked as selected are deleted
      while (deletedListItemIndex != -1);


      // Now get the new index by finding what index the coppied list item resides at
      let newSelectedListItemIndex = this.listItems.indexOf(listItemCopy);

      // If a list item was selected
      if (this.selectedListItemIndex != null) {
        // And there is a next available list item that can be selected
        if (newSelectedListItemIndex != -1) {
          window.setTimeout(() => {
            // Select that list item
            this.selectedListItemIndex = newSelectedListItemIndex;
            this.listItems[this.selectedListItemIndex].selected = true;
            // Re-establish the pivot index
            this.pivotIndex = this.selectedListItemIndex;
            // Allow the selected list item to be edited
            this.isEditDisabled = false;
            // Set focus to that selected list item
            this.listItem.find((item, index) => index == this.selectedListItemIndex).nativeElement.focus();
          }, 20);

          // If there is NOT a next available list item that can be selected
        } else {
          // Make no list item marked as selected
          this.selectedListItemIndex = null;
          this.isDeleteDisabled = true;
          this.pivotIndex = null;
          this.removeEventListeners();
        }
      }

      // If a list item was unselected
      if (this.unselectedListItemIndex != null) {
        window.setTimeout(() => {
          // Unselect that list item again
          this.unselectedListItemIndex = newSelectedListItemIndex;
          this.isDeleteDisabled = true;
          // Re-establish the pivot index
          this.pivotIndex = this.unselectedListItemIndex;

          this.itemDeleted = false;

          // Set focus to that unselected list item
          this.listItem.find((item, index) => index == this.unselectedListItemIndex).nativeElement.focus();
        }, 20);
      }
    }
  }


  // -----------------------------( SET CONTEXT MENU )------------------------------ \\
  setContextMenu(e: MouseEvent) {
    // As long as the right mouse button is being pressed
    if (e.which == 3) {

      // Build the context menu
      this.menuService.buildMenu(this, e.clientX + 3, e.clientY,
        // Add
        this.menuService.option(this.menuOptions[0], "Ctrl+Alt+A", this.isAddDisabled, this.addListItem),
        // Edit
        this.menuService.option(this.menuOptions[1], "Ctrl+Alt+E", this.isEditDisabled, this.editListItem),
        // Delete
        this.menuService.option(this.isDeleteDisabled ? this.menuOptions[2] : this.isEditDisabled ? this.menuOptions[3] : this.menuOptions[2], "Delete", this.isDeleteDisabled, this.deleteListItem));
    }
  }


  // -----------------------------( ESCAPE )------------------------------ \\
  escape() {
    // As long as the context menu is NOT open
    if (!this.menuService.showMenu) {
      // Then remove all listeners and selections
      this.removeEventListeners();
    }
  }


  // -----------------------------( ARROW UP )------------------------------ \\
  arrowUp() {
    let index = this.selectedListItemIndex != null ? this.selectedListItemIndex : this.unselectedListItemIndex;

    if (index > 0) {
      index--;
      this.setListItemSelection(index);
    }
  }


  // -----------------------------( ARROW DOWN )------------------------------ \\
  arrowDown() {
    let index = this.selectedListItemIndex != null ? this.selectedListItemIndex : this.unselectedListItemIndex;

    if (index < this.listItems.length - 1) {
      index++;
      this.setListItemSelection(index);
    }
  }
}
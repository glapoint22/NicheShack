import { Component, ViewChildren, ElementRef, QueryList, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { ListItem } from '../../../classes/list-item';
import { icon } from '../../../classes/icon';
import { SelectType } from '../../../classes/list-item-select-type';
import { PopupService } from '../../../services/popup.service';
import { MenuOption } from '../../../classes/menu-option';
import { ItemListOptions } from '../../../classes/item-list-options';
import { PromptService } from 'services/prompt.service';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  constructor(public menuService: MenuService, public promptService: PromptService, public popupService: PopupService) { }
  // Public
  public promptTitle: string;
  public propmtMessage: string;
  public selectType = SelectType;
  public promptMultiTitle: string;
  public pivotIndex: number = null;
  public ctrlDown: boolean = false;
  public propmtMultiMessage: string;
  public shiftDown: boolean = false;
  public newListItem: boolean = false;
  public lastFocusedListItem: Element;
  public addIcon: icon = new icon(false);
  public editIcon: icon = new icon(true);
  public deleteIcon: icon = new icon(true);
  public isOverIconButton: boolean = false;
  public eventListenersAdded: boolean = false;
  public itemDeletionPending: boolean = false;
  public selectedListItemIndex: number = null;
  public unselectedListItemIndex: number = null;
  public preventDeselectionFromRightMouseDown: boolean;
  public get isMultiSelected(): boolean {
    return this.listItems.map(e => e.selected).indexOf(true) == this.listItems.map(e => e.selected).lastIndexOf(true) && this.unselectedListItemIndex == null ? false : true;
  }

  // Decorators
  @Input() listItems: Array<ListItem>;
  @Input() listOptions: ItemListOptions;
  @ViewChildren('rowItem') rowItem: QueryList<ElementRef>;


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // When the context menu becomes hidden
    this.menuService.menu.onHide.subscribe(() => {
      // If a list item is selected
      if (this.selectedListItemIndex != null) {
        // Set the focus back to that list item
        this.setListItemFocus(this.selectedListItemIndex)
      }
    });

    // When the search popup becomes hidden
    this.popupService.searchPopup.onPopupClose.subscribe(() => {
      // If a list item is selected
      if (this.selectedListItemIndex != null) {
        // Set the focus back to that list item
        this.setListItemFocus(this.selectedListItemIndex)
      }
    });
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
    if (!this.editIcon.isDisabled && event.ctrlKey && event.altKey && event.keyCode === 69) {
      this.listOptions.onEditItem.apply(this.listOptions.currentObj, [this.rowItem.find((item, index) => index == this.selectedListItemIndex).nativeElement, this.selectedListItemIndex]);
    }
  };


  // -----------------------------( SET SHORTCUT KEYS )------------------------------ \\
  setShortcutKeys(event: KeyboardEvent) {
    if (event.keyCode === 46) this.listOptions.onDeleteItem.apply(this.listOptions.currentObj);
    if (event.keyCode === 27) this.escape();
    if (event.keyCode === 38) this.arrowUp();
    if (event.keyCode === 40) this.arrowDown();

    if (this.listOptions == null || this.listOptions.multiSelect == null || this.listOptions.multiSelect) {
      if (event.ctrlKey) this.ctrlDown = true;
      if (event.shiftKey) this.shiftDown = true;
    }
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
    // As long as the context menu IS open
    if (this.menuService.menu.isVisible
      // and we're NOT clicking on an icon button
      && !this.isOverIconButton) {

      window.setTimeout(() => {
        // check to see if the context menu is now closed, if it is
        if (!this.menuService.menu.isVisible
          // and we're not selecting a list item
          && document.activeElement != this.lastFocusedListItem) {

          // Then remove all listeners and selections
          this.removeEventListeners();
        }
      }, 20)
    }
  }


  // -----------------------------( SET LIST ITEM FOCUS )------------------------------ \\
  setListItemFocus(listItemIndex: number) {
    window.setTimeout(() => {
      // Find the list item with the specified index and set focus to it
      this.rowItem.find((item, index) => index == listItemIndex).nativeElement.focus();
      // Then set the 'lastFocusedListItem' property as the list item we just set the focus to
      this.lastFocusedListItem = document.activeElement;
      this.preventDeselectionFromRightMouseDown = false;
    })
  }


  // -----------------------------( ON LIST ITEM BLUR )------------------------------ \\
  onListItemBlur() {
    window.setTimeout(() => {
      // As long as a list item isn't losing focus becaus another list item is receiving focus
      if (document.activeElement != this.lastFocusedListItem
        // and the context menu is NOT open
        && !this.menuService.menu.isVisible
        // and the search popup is NOT open
        && !this.popupService.searchPopup.show
        // and we're NOT clicking on an icon button
        && !this.isOverIconButton) {
        // Determine what happens when a list item loses focus 
        this.setListItemBlur();
      }
    })
  }


  // -----------------------------( SET LIST ITEM BLUR )------------------------------ \\
  setListItemBlur() {
    // When a list item is deleted, it loses focus.
    // This is to prevent the listeners from being removed when a list item gets deleted.
    if (!this.itemDeletionPending
      // Also, if a list item loses focus because of a right mouse down event, we don't want
      // to clear the selections and remove the event listeners
      && !this.preventDeselectionFromRightMouseDown) {
      // If a list item is NOT being deleted and there is no right mouse down event on a list item,
      // then remove all listeners and selections
      this.removeEventListeners();
    }
    // If a right mouse down event prevented the selections and listeners from being removed,
    // then we can reset this back to false, because it alreday served its purpose
    this.preventDeselectionFromRightMouseDown = false;
  }


  // -----------------------------( ON ICON BUTTON MOUSE OUT )------------------------------ \\
  onIconButtonMouseOut() {
    this.isOverIconButton = false;

    // * A fail safe that puts the focus back to the selected list item if a mouseup occurs outside the click bounds of an icon button * \\ 

    // As long as the context menu is NOT open
    if (!this.menuService.menu.isVisible) {
      // If a list item is selected
      if (this.selectedListItemIndex != null) {
        // Set focus to that list item
        this.setListItemFocus(this.selectedListItemIndex);
      }
    }
  }


  // -----------------------------( ON LIST ITEM DOWN )------------------------------ \\
  onListItemDown(index: number, e?: MouseEvent) {
    this.preventDeselectionFromRightMouseDown = false;

    // If the list item is being selected from a right mouse down
    if (e != null && e.which == 3) {
      // Check to see if that list item is already selected
      if (this.listItems[index].selected) {
        // If it's already selected,
        // then prevent it from being deselected
        this.preventDeselectionFromRightMouseDown = true;
      }
    }

    // As long as we're not right clicking on a list item that's already selected
    if (!this.preventDeselectionFromRightMouseDown) {
      window.setTimeout(() => {
        this.lastFocusedListItem = document.activeElement;
        this.setListItemSelection(index);
      });
    }
  }


  // -----------------------------( SET LIST ITEM SELECTION )------------------------------ \\
  setListItemSelection(index: number) {
    this.addEventListeners();
    this.editIcon.isDisabled = false;
    this.deleteIcon.isDisabled = false;
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
    this.editIcon.isDisabled = this.isMultiSelected;
  }



  // -----------------------------( SET LIST ITEM SELECT TYPE )------------------------------ \\ 
  setListItemSelectType() {
    // If there is only one list item in the list
    if (this.listItems.length == 1) {
      // Set the type to whole
      this.listItems[0].selectType = SelectType.Whole;

      // If there is more than one list item
    } else {

      // First list item
      this.listItems[0].selectType = this.listItems[0].selected ? this.listItems[1].selected ? SelectType.Top : this.unselectedListItemIndex == 1 ? SelectType.Top : SelectType.Whole : null;

      // Every list item in between
      for (let i = 1; i < this.listItems.length - 1; i++) {
        // Set the select type based on the following:
        this.listItems[i].selectType =

          // If a list item is marked as selected
          this.listItems[i].selected ?

            // If the list item before is NOT selected and the list item after IS selected
            !this.listItems[i - 1].selected && this.listItems[i + 1].selected ?
              SelectType.Top :

              // If the list item before IS selected and the list item after is NOT selected
              this.listItems[i - 1].selected && !this.listItems[i + 1].selected ?

                // And that list item after is unselected with the unselect
                i + 1 == this.unselectedListItemIndex ?
                  SelectType.Middle :

                  // But if its just NOT selected
                  SelectType.Bottom :

                // If the list item before is NOT selected and the list item after is also NOT selected
                !this.listItems[i - 1].selected && !this.listItems[i + 1].selected ?

                  // And that list item after is unselected with the unselect
                  i + 1 == this.unselectedListItemIndex ?
                    SelectType.Top :

                    // But if its just NOT selected
                    SelectType.Whole :

                  // If the list item before IS selected and the list item after is also selected
                  SelectType.Middle :

            // If a list item is NOT selected
            null;
      }

      // Last list item
      this.listItems[this.listItems.length - 1].selectType = this.listItems[this.listItems.length - 1].selected ? this.listItems[this.listItems.length - 2].selected ? SelectType.Bottom : SelectType.Whole : null;
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
        this.deleteIcon.isDisabled = true;

        // But if there is still a list item that is selected
      } else {
        // Then enable the ability to delete a list item
        this.deleteIcon.isDisabled = false;
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

    if (this.listOptions == null || this.listOptions.doubleClick == null || this.listOptions.doubleClick) {
      // As long as the shift key and the ctrl key is not being pressed
      if (!this.shiftDown && !this.ctrlDown) {
        this.onListItemEdit();
      }
    }
  }


  // -----------------------------( REMOVE FOCUS )------------------------------ \\
  removeFocus() {
    this.pivotIndex = null;
    this.editIcon.isDisabled = true;
    this.deleteIcon.isDisabled = true;
    this.selectedListItemIndex = null;
    this.unselectedListItemIndex = null;

    for (let i = 0; i < this.listItems.length; i++) {
      this.listItems[i].selected = false;
      this.listItems[i].selectType = null;
    }
  }


  // -----------------------------( ON LIST ITEM ADD )------------------------------ \\
  onListItemAdd() {
    if (!this.addIcon.isDisabled) {
      this.addListItem();
    }
  }


  // -----------------------------( ADD LIST ITEM )------------------------------ \\
  addListItem() {
    this.listOptions.onAddItem.apply(this.listOptions.currentObj, [this.rowItem.find((item, index) => index == this.selectedListItemIndex).nativeElement]);
  }


  // -----------------------------( On LIST ITEM EDIT )------------------------------ \\
  onListItemEdit() {
    if (!this.editIcon.isDisabled) {
      this.editListItem();
    }
  }


  // -----------------------------( EDIT LIST ITEM )------------------------------ \\
  editListItem() {
    if(this.listOptions.onEditItem != null) {
      this.listOptions.onEditItem.apply(this.listOptions.currentObj, [this.rowItem.find((item, index) => index == this.selectedListItemIndex).nativeElement, this.selectedListItemIndex]);
    }
  }


  // -----------------------------( ON LIST ITEM DELETE )------------------------------ \\
  onListItemDelete() {
    if (!this.deleteIcon.isDisabled) {
      this.itemDeletionPending = true;
      this.listOptions.onDeleteItem.apply(this.listOptions.currentObj);
    }
  }


  // -----------------------------( DELETE LIST ITEM )------------------------------ \\
  deleteListItem() {
    let listItemCopy: any;
    let deletedListItemIndex: number;
    let deletedListItems: Array<ListItem> = [];

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
        // Make a copy of all the list items we're deleting so that the database can be updated accordingly
        deletedListItems.push(this.listItems[deletedListItemIndex]);

        // Clear the selection properties
        // (In case the list item is still being referenced i.e. in media List where a media item gets moved)
        this.listItems[deletedListItemIndex].selected = false;
        this.listItems[deletedListItemIndex].selectType = null;

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
          this.editIcon.isDisabled = false;
          // Set focus to that selected list item
          this.setListItemFocus(this.selectedListItemIndex);
        }, 20);

        // If there is NOT a next available list item that can be selected
      } else {
        // Make no list item marked as selected
        this.selectedListItemIndex = null;
        this.deleteIcon.isDisabled = true;
        this.pivotIndex = null;
        this.removeEventListeners();
      }
    }

    // If a list item was unselected
    if (this.unselectedListItemIndex != null) {
      window.setTimeout(() => {
        // Unselect that list item again
        this.unselectedListItemIndex = newSelectedListItemIndex;
        this.deleteIcon.isDisabled = true;
        // Re-establish the pivot index
        this.pivotIndex = this.unselectedListItemIndex;
        // Set focus to that unselected list item
        this.setListItemFocus(this.unselectedListItemIndex);
      }, 20);
    }
    // Now that the list item(s) have been deleted,
    // let it be known that item deletion is no longer pending
    this.itemDeletionPending = false;
    return deletedListItems;
  }


  // -----------------------------( ON PROMPT CANCEL )------------------------------ \\
  onPromptCancel() {
    this.itemDeletionPending = false;
    this.setListItemFocus(this.selectedListItemIndex);
  }


  // -----------------------------( SET CONTEXT MENU )------------------------------ \\
  setContextMenu(e: MouseEvent) {
    // As long as the right mouse button is being pressed
    if (e.which == 3) {
      // Build the context menu
      this.buildContextMenu(e)
    }
  }


  // -----------------------------( BUILD CONTEXT MENU )------------------------------ \\
  buildContextMenu(e: MouseEvent) {
    if (this.listOptions != null) {
      // Build the context menu
      this.menuService.buildMenu(this.listOptions.currentObj, e.clientX + 3, e.clientY, this.listOptions.menuOptions.apply(this.listOptions.currentObj));
    }
  }


  // -----------------------------( ESCAPE )------------------------------ \\
  escape() {
    // As long as the context menu and the prompt is NOT open
    if (!this.menuService.menu.isVisible && !this.promptService.show) {
      // Then remove all listeners and selections
      this.removeEventListeners();
    }
  }


  // -----------------------------( ARROW UP )------------------------------ \\
  arrowUp() {
    let index = this.selectedListItemIndex != null ? this.selectedListItemIndex : this.unselectedListItemIndex;

    if (index > 0) {
      index--;
      this.onListItemDown(index);
    }
  }


  // -----------------------------( ARROW DOWN )------------------------------ \\
  arrowDown() {
    let index = this.selectedListItemIndex != null ? this.selectedListItemIndex : this.unselectedListItemIndex;

    if (index < this.listItems.length - 1) {
      index++;
      this.onListItemDown(index);
    }
  }
}
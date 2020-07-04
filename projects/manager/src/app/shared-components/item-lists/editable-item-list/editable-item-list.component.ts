import { Component, Output, EventEmitter } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { SelectType } from '../../../classes/list-item-select-type';
import { ListItem } from '../../../classes/list-item';

@Component({
  selector: 'editable-item-list',
  templateUrl: './editable-item-list.component.html',
  styleUrls: ['../item-list/item-list.component.scss']
})
export class EditableItemListComponent extends ItemListComponent {
  public indexOfEditedListItem: number = null;
  public selectType = SelectType;
  @Output() postItemName: EventEmitter<ListItem> = new EventEmitter();
  @Output() updateItemName: EventEmitter<ListItem> = new EventEmitter();

  // -----------------------------( SET SHORTCUT KEYS )------------------------------ \\
  setShortcutKeys(event: KeyboardEvent) {
    if (event.keyCode === 13) this.enter();
    if (!this.editIcon.isDisabled && event.ctrlKey && event.altKey && event.keyCode === 69) this.onListItemEdit()
    super.setShortcutKeys(event);
  }


  // -----------------------------( ENTER )------------------------------ \\
  enter() {
    event.preventDefault();
    // If a list item is being edited
    if (this.indexOfEditedListItem != null) {
      // Evaluate the state of the edit and then act accordingly
      this.evaluateEdit();
    }
  }


  // -----------------------------( EVALUATE EDIT )------------------------------ \\
  evaluateEdit(isEscape?: boolean, isBlur?: boolean) {
    let listItem = this.rowItem.find((item, index) => index == this.indexOfEditedListItem).nativeElement;
    let listItemTrimmed = listItem.textContent.trim();

    // Set the focus to the list item just in case it lost it on a mouse down
    listItem.focus();

    // If the list item is NOT empty
    if (listItemTrimmed.length > 0) {

      // If we pressed the (Escape) key
      if (isEscape) {

        // If we were adding a new list item
        if (this.newListItem) {
          // Remove the new list item
          this.listItems.splice(this.indexOfEditedListItem, 1);
          this.indexOfEditedListItem = null;

          // If we were NOT adding a new list item
        } else {

          // As long as the list item named is different from what it was before the edit
          if (listItem.textContent != this.listItems[this.indexOfEditedListItem].name) {
            // Reset the list item back to the way it was before the edit
            listItem.textContent = this.listItems[this.indexOfEditedListItem].name;
          }
        }

        // If we did NOT press the (Escape) key
        // But the (Enter) key was pressed or the list item was (Blurred)
      } else {

        // As long as the list item named is different from what it was before the edit
        if (listItem.textContent != this.listItems[this.indexOfEditedListItem].name) {
          // Update the name property
          this.listItems[this.indexOfEditedListItem].name = listItemTrimmed;
          // Set the list item name
          this.setListItemName();
          // Update the name in the list
          listItem.textContent = this.listItems[this.indexOfEditedListItem].name;
        }
      }


      // Reset
      this.selectedListItemIndex = this.indexOfEditedListItem;
      this.newListItem = false;
      this.addIcon.isDisabled = false;
      this.editIcon.isDisabled = false;
      this.deleteIcon.isDisabled = false;
      this.indexOfEditedListItem = null;
      this.pivotIndex = this.selectedListItemIndex;
      this.listItems[this.selectedListItemIndex].selected = true;


      // But if the list item is empty
    } else {


      // If we pressed the (Escape) key or the list item was (Blurred)
      if (isEscape || isBlur) {

        // If we were adding a new list item
        if (this.newListItem) {
          // Remove the new list item
          this.listItems.splice(this.indexOfEditedListItem, 1);
          this.indexOfEditedListItem = null;

          // If we were NOT adding a new list item
        } else {

          // Reset the list item back to the way it was before the edit
          listItem.textContent = this.listItems[this.indexOfEditedListItem].name;
        }
        // Reset
        this.selectedListItemIndex = this.indexOfEditedListItem;
        this.newListItem = false;
        this.addIcon.isDisabled = false;
        this.editIcon.isDisabled = false;
        this.deleteIcon.isDisabled = false;
        this.indexOfEditedListItem = null;
        this.pivotIndex = this.selectedListItemIndex;
        this.listItems[this.selectedListItemIndex].selected = true;
      }
    }
  }


  // -----------------------------( SET LIST ITEM NAME )------------------------------ \\
  setListItemName() {
    // If we're naming a new item
    if (this.newListItem) {
      this.postItemName.emit(this.listItems[this.indexOfEditedListItem]);

      // If we're editing an existing item
    } else {
      this.updateItemName.emit(this.listItems[this.indexOfEditedListItem])
    }
  }


  // -----------------------------( ON INNER WINDOW BLUR )------------------------------ \\
  onInnerWindowBlur = () => {
    // * When the focus gets set to something that is outside the inner-window * \\

    // If a list item is being edited or added
    if (this.indexOfEditedListItem != null) {
      // Evaluate the state of the edit and then act accordingly
      this.evaluateEdit();

      // If a list item is NOT being edited
    } else {

      // Then remove all listeners and selections
      this.removeEventListeners();
    }
  }


  // -----------------------------( SET LIST ITEM BLUR )------------------------------ \\
  setListItemBlur() {
    // If a list item is being edited or added
    if (this.indexOfEditedListItem != null) {

      // Evaluate the state of the edit and then act accordingly
      this.evaluateEdit(null, true);

      // If a list item is NOT being edited
    } else {

      super.setListItemBlur();
    }
  }


  // -----------------------------( SET LIST ITEM SELECTION )------------------------------ \\
  setListItemSelection(index: number) {
    // If a list item is NOT being edited
    if (this.indexOfEditedListItem == null) {

      // Set the selection
      super.setListItemSelection(index)

      // If a list item is being edited and a list item that is NOT being edited is selected
    } else if (index != this.indexOfEditedListItem) {
      // Evaluate the state of the edit and then act accordingly
      this.evaluateEdit();
    }
  }


  // -----------------------------( ON LIST ITEM DOUBLE CLICK )------------------------------ \\
  onListItemDoubleClick() {
    // As long a list item is NOT already being edited
    if (this.indexOfEditedListItem == null) {
      super.onListItemDoubleClick();
    }
  }


  // -----------------------------( REMOVE FOCUS )------------------------------ \\
  removeFocus() {
    this.indexOfEditedListItem = null;
    super.removeFocus();
  }


  // -----------------------------( ADD LIST ITEM )------------------------------ \\
  addListItem() {
    this.addEventListeners();
    this.newListItem = true;
    this.addIcon.isDisabled = true;
    this.editIcon.isDisabled = true;
    this.deleteIcon.isDisabled = true;
    this.indexOfEditedListItem = 0;
    this.selectedListItemIndex = null;
    this.listItems.unshift({ id: "", name: "", selected: false, selectType: null });

    for (let i = 0; i < this.listItems.length; i++) {
      this.listItems[i].selected = false;
      this.listItems[i].selectType = null;
    }

    window.setTimeout(() => {
      this.setListItemFocus(this.indexOfEditedListItem);
    });
  }


  // -----------------------------( EDIT LIST ITEM )------------------------------ \\
  editListItem() {
    this.indexOfEditedListItem = this.selectedListItemIndex;
    this.addIcon.isDisabled = true;
    this.editIcon.isDisabled = true;
    this.deleteIcon.isDisabled = true;
    this.selectedListItemIndex = null;

    for (let i = 0; i < this.listItems.length; i++) {
      this.listItems[i].selected = false;
      this.listItems[i].selectType = null;
    }



    window.setTimeout(() => {
      let listItem = this.rowItem.find((item, index) => index == this.indexOfEditedListItem);
      listItem.nativeElement.focus();
      let range = document.createRange();
      range.selectNodeContents(listItem.nativeElement);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });
  }


  // -----------------------------( SET CONTEXT MENU )------------------------------ \\
  setContextMenu(e: MouseEvent) {
    // As long as a list item is NOT being edited
    if (this.indexOfEditedListItem == null) {
      // Build the context menu
      super.setContextMenu(e)
    }
  }


  // -----------------------------( ESCAPE )------------------------------ \\
  escape() {
    // If a list item is being edited
    if (this.indexOfEditedListItem != null) {
      // Evaluate the state of the edit and then act accordingly
      this.evaluateEdit(true);

      // If a list item is NOT being edited
    } else {
      super.escape();
    }
  }
}
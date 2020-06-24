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
  @Output() postItem: EventEmitter<ListItem> = new EventEmitter();
  @Output() updateItem: EventEmitter<ListItem> = new EventEmitter();

  // -----------------------------( SET SHORTCUT KEYS )------------------------------ \\
  setShortcutKeys(event: KeyboardEvent) {
    if (event.keyCode === 13) this.enter();
    if (!this.editIcon.isDisabled && event.ctrlKey && event.altKey && event.keyCode === 69) this.editListItem()
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
  evaluateEdit(isEscape?: boolean) {
    let listItem = this.rowItem.find((item, index) => index == this.indexOfEditedListItem).nativeElement;
    let listItemTrimmed = listItem.textContent.trim();

    // If the list item is NOT empty
    if (listItemTrimmed.length > 0) {

      // Set the focus to the list item just in case it lost it on a mouse down
      this.setFocusToListItem(listItem);


      // Commit the edit
      this.selectedListItemIndex = this.indexOfEditedListItem;
      this.addIcon.isDisabled = false;
      this.editIcon.isDisabled = false;
      this.deleteIcon.isDisabled = false;
      this.indexOfEditedListItem = null;
      this.unselectedListItemIndex = null;
      this.pivotIndex = this.selectedListItemIndex;
      this.listItems[this.selectedListItemIndex].selected = true;

      // Name the list item
      this.nameListItem(listItem, listItemTrimmed, isEscape);

      this.newListItem = false;

      // If the list item is empty
    } else {

      // If we were adding a list item
      if (this.newListItem) {
        // Remove that list item
        this.newListItem = false;
        this.unselectedListItemIndex = null;
        this.listItems.splice(this.indexOfEditedListItem, 1);

        // If we were NOT adding a list item
      } else {

        // Reset the list item back to the way it was before the edit
        this.editIcon.isDisabled = false;
        this.deleteIcon.isDisabled = false;
        this.selectedListItemIndex = this.indexOfEditedListItem;
        this.listItems[this.selectedListItemIndex].selected = true;
        listItem.textContent = this.listItems[this.indexOfEditedListItem].name;
      }
      this.addIcon.isDisabled = false;
      this.indexOfEditedListItem = null;
    }
  }


  // -----------------------------( SET FOCUS TO LIST ITEM )------------------------------ \\
  setFocusToListItem(listItem) {
    listItem.focus();
  }


  // -----------------------------( NAME LIST ITEM )------------------------------ \\
  nameListItem(listItem, listItemTrimmed, isEscape?: boolean) {
    // As long as we did NOT press the (Escape) key, update the name property
    if (!isEscape) {
      this.listItems[this.selectedListItemIndex].name = listItemTrimmed;
      if (this.newListItem) {
        this.postItem.emit(this.listItems[this.selectedListItemIndex]);
      } else {
        this.updateItem.emit(this.listItems[this.selectedListItemIndex])
      }
    }
    // Update the name in the list
    listItem.textContent = this.listItems[this.selectedListItemIndex].name;
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
      this.evaluateEdit();

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


  // -----------------------------( SET LIST ITEM ADD )------------------------------ \\
  setListItemAdd() {
    this.addEventListeners();
    this.newListItem = true;
    this.addIcon.isDisabled = true;
    this.editIcon.isDisabled = true;
    this.deleteIcon.isDisabled = true;
    this.indexOfEditedListItem = 0;
    this.selectedListItemIndex = null;
    this.listItems.unshift({ id: "", name: "", selected: false, selectType: null, loading: false });

    for (let i = 0; i < this.listItems.length; i++) {
      this.listItems[i].selected = false;
      this.listItems[i].selectType = null;
    }

    window.setTimeout(() => {
      this.rowItem.find((item, index) => index == this.indexOfEditedListItem).nativeElement.focus();
    });
  }


  // -----------------------------( SET LIST ITEM EDIT )------------------------------ \\
  setListItemEdit() {
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
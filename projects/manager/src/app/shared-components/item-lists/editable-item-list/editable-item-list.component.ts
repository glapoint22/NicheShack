import { Component } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'editable-item-list',
  templateUrl: './editable-item-list.component.html',
  styleUrls: ['../item-list/item-list.component.scss']
})
export class EditableItemListComponent extends ItemListComponent {
  public indexOfEditedListItem: number = null;


  // -----------------------------( SET SHORTCUT KEYS )------------------------------ \\
  setShortcutKeys(event: KeyboardEvent) {
    if (event.keyCode === 13) this.enter();
    if (!this.isEditDisabled && event.ctrlKey && event.altKey && event.keyCode === 69) this.editListItem()
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
    let listItem = this.listItem.find((item, index) => index == this.indexOfEditedListItem).nativeElement;
    let listItemTrimmed = listItem.textContent.trim();

    // If the list item is NOT empty
    if (listItemTrimmed.length > 0) {

      // Commit the edit
      this.selectedListItemIndex = this.indexOfEditedListItem;
      this.newListItem = false;
      this.isAddDisabled = false;
      this.isEditDisabled = false;
      this.isDeleteDisabled = false;
      this.indexOfEditedListItem = null;
      this.unselectedListItemIndex = null;
      this.pivotIndex = this.selectedListItemIndex;
      this.listItems[this.selectedListItemIndex].selected = true;
      if (!isEscape) this.listItems[this.selectedListItemIndex].name = listItemTrimmed;
      listItem.textContent = this.listItems[this.selectedListItemIndex].name;

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
        this.isEditDisabled = false;
        this.isDeleteDisabled = false;
        this.selectedListItemIndex = this.indexOfEditedListItem;
        this.listItems[this.selectedListItemIndex].selected = true;
        listItem.textContent = this.listItems[this.indexOfEditedListItem].name;
      }
      this.isAddDisabled = false;
      this.indexOfEditedListItem = null;
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


  // -----------------------------( ADD LIST ITEM )------------------------------ \\
  addListItem() {
    if (!this.isAddDisabled) {
      this.addEventListeners();
      this.newListItem = true;
      this.isAddDisabled = true;
      this.isEditDisabled = true;
      this.isDeleteDisabled = true;
      this.indexOfEditedListItem = 0;
      this.selectedListItemIndex = null;
      this.listItems.unshift({ name: "", selected: false, selectType: null });

      for (let i = 0; i < this.listItems.length; i++) {
        this.listItems[i].selected = false;
        this.listItems[i].selectType = null;
      }

      window.setTimeout(() => {
        this.listItem.find((item, index) => index == this.indexOfEditedListItem).nativeElement.focus();
      });
    }
  }


  // -----------------------------( EDIT LIST ITEM )------------------------------ \\
  editListItem() {
    if (!this.isEditDisabled) {
      this.indexOfEditedListItem = this.selectedListItemIndex;
      this.isAddDisabled = true;
      this.isEditDisabled = true;
      this.isDeleteDisabled = true;
      this.selectedListItemIndex = null;

      for (let i = 0; i < this.listItems.length; i++) {
        this.listItems[i].selected = false;
        this.listItems[i].selectType = null;
      }

      window.setTimeout(() => {
        let listItem = this.listItem.find((item, index) => index == this.indexOfEditedListItem);
        listItem.nativeElement.focus();
        let range = document.createRange();
        range.selectNodeContents(listItem.nativeElement);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });
    }
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
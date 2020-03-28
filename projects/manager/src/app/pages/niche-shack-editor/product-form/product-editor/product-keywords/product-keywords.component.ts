import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { MenuService } from 'projects/manager/src/app/services/menu.service';

@Component({
  selector: 'product-keywords',
  templateUrl: './product-keywords.component.html',
  styleUrls: ['./product-keywords.component.scss', '../product-editor.component.scss']
})
export class ProductKeywordsComponent implements OnInit {
  constructor(public menuService: MenuService) { }
  // Private
  private lastFocusedKeyword: any;
  private pivotIndex: number = null;
  private ctrlDown: boolean = false;
  private shiftDown: boolean = false;
  private newKeyword: boolean = false;
  private eventListenersAdded: boolean = false;
  // Public
  public keywords: any[] = [];
  public isAddDisabled: boolean = false;
  public isEditDisabled: boolean = true;
  public overIconButton: boolean = false;
  public isDeleteDisabled: boolean = true;
  public editedKeywordIndex: number = null;
  public selectedKeywordIndex: number = null;
  public unselectedKeywordIndex: number = null;
  @ViewChildren('keyword') keyword: QueryList<ElementRef>;
  @ViewChildren('iconButton') iconButton: QueryList<ElementRef>;


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.keywords = [
      { name: "Gumpy", selected: false, selectType: null },
      { name: "Ice Cream", selected: false, selectType: null },
      { name: "Chocolate", selected: false, selectType: null },
      { name: "Vanilla", selected: false, selectType: null },
      { name: "Strawberry", selected: false, selectType: null },
      { name: "Sundae", selected: false, selectType: null },
      { name: "Ice Cream Cone", selected: false, selectType: null },
      { name: "Mint Chocolate Chip Topped With Hot Fudge and Sprinkles", selected: false, selectType: null },
      // { name: "Flavor of the Day", selected: false, selectType: null }
    ]
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
  private onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === 13) this.enter();
    if (event.keyCode === 46) this.deleteKeyword();
    if (event.keyCode === 27) this.escape();
    if (event.keyCode === 38) this.arrowUp();
    if (event.keyCode === 40) this.arrowDown();
    if (event.ctrlKey) this.ctrlDown = true;
    if (event.shiftKey) this.shiftDown = true;
    if (event.ctrlKey && event.shiftKey && event.keyCode === 75) this.editKeyword();
  };


  // -----------------------------( ON KEY UP )------------------------------ \\
  private onKeyUp = (event: KeyboardEvent) => {
    if (event.keyCode === 16) this.shiftDown = false;
    if (event.keyCode === 17) this.ctrlDown = false;
  }


  // -----------------------------( ON INNER WINDOW BLUR )------------------------------ \\
  private onInnerWindowBlur = () => {
    // * When the focus gets set to something that is outside the inner-window * \\
    
    // If a keyword is being edited or added
    if (this.editedKeywordIndex != null) {
      // Evaluate the state of the edit and then act accordingly
      this.evaluateEdit();

      // If a keyword is NOT being edited
    } else {

      // Then remove all listeners and selections
      this.removeEventListeners();
    }
  }


  // -----------------------------( ON MOUSE DOWN )------------------------------ \\
  private onMouseDown = () => {
    // As long as the context menu is open
    if (this.menuService.menuOpen
      // and we're NOT clicking on an icon button
      && !this.overIconButton) {

      window.setTimeout(() => {
        // check to see if the context menu is now closed, if it is
        if (!this.menuService.menuOpen
          // and we're not selecting a keyword
          && document.activeElement != this.lastFocusedKeyword) {

          // Then remove all listeners and selections
          this.removeEventListeners();
        }
      }, 20)
    }
  }


  // -----------------------------( ON ELEMENT BLUR )------------------------------ \\
  onElementBlur() {
    window.setTimeout(() => {
      // As long as a content element isn't losing focus becaus another content element is receiving focus
      if (document.activeElement != this.lastFocusedKeyword
        // and the context menu is NOT open
        && !this.menuService.menuOpen
        // and we're NOT clicking on an icon button
        && !this.overIconButton) {
          
        // If a keyword is being edited or added
        if (this.editedKeywordIndex != null) {
          // Evaluate the state of the edit and then act accordingly
          this.evaluateEdit();

          // If a keyword is NOT being edited
        } else {

          // Then remove all listeners and selections
          this.removeEventListeners();
        }
      }
    })
  }


  // -----------------------------( ON ICON BUTTON MOUSE OUT )------------------------------ \\
  onIconButtonMouseOut() {
    this.overIconButton = false;

    // * A fail safe that puts the focus back to the selected keyword if a mouseup occurs outside the click bounds of an icon button * \\ 

    // As long as the context menu is NOT open
    if (!this.menuService.menuOpen) {
      // If a keyword is selected
      if (this.selectedKeywordIndex != null) {
        // Set focus to that keyword
        this.keyword.find((item, index) => index == this.selectedKeywordIndex).nativeElement.focus();
      }
    }
  }


  // -----------------------------( ON KEYWORD DOWN )------------------------------ \\
  onKeywordDown(index: number) {

    window.setTimeout(() => {
      this.lastFocusedKeyword = document.activeElement;

      // If a keyword is NOT being edited
      if (this.editedKeywordIndex == null) {
        // Set the selection
        this.setKeywordSelection(index)

        // If a keyword is being edited and a keyword that is NOT being edited is selected
      } else if (index != this.editedKeywordIndex) {
        // Evaluate the state of the edit and then act accordingly
        this.evaluateEdit();
      }
    })
  }


  // -----------------------------( SET KEYWORD SELECTION )------------------------------ \\
  setKeywordSelection(index: number) {
    this.addEventListeners();
    this.isEditDisabled = false;
    this.isDeleteDisabled = false;
    this.selectedKeywordIndex = index;
    this.unselectedKeywordIndex = null;
    // Define what keywords are selected
    this.setKeywordSelected(index);
    // Then define what the selection type is for each keyword
    this.setKeywordSelectType();
  }


  // -----------------------------( SET KEYWORD SELECTED )------------------------------ \\ 
  setKeywordSelected(index: number) {
    // If the shift key is down
    if (this.shiftDown) {
      this.setKeywordSelectedShiftKey();

      // If the ctrl key is down 
    } else if (this.ctrlDown) {
      this.setKeywordSelectedCtrlKey(index);

      // If NO modifier key is down
    } else {
      this.keywordDownNoModifierKey(index);
    }
    // Set edit on or off
    this.isEditDisabled = this.keywords.map(e => e.selected).indexOf(true) == this.keywords.map(e => e.selected).lastIndexOf(true) && this.unselectedKeywordIndex == null ? false : true;
  }


  // -----------------------------( SET KEYWORD SELECT TYPE )------------------------------ \\ 
  setKeywordSelectType() {
    // If there is only one keyword in the list
    if (this.keywords.length == 1) {
      // Set the type to whole
      this.keywords[0].selectType = "whole";

      // If there is more than one keyword
    } else {

      // First keyword
      this.keywords[0].selectType = this.keywords[0].selected ? this.keywords[1].selected ? "top" : this.unselectedKeywordIndex == 1 ? "top" : "whole" : null;

      // Every keyword in between
      for (let i = 1; i < this.keywords.length - 1; i++) {
        // Set the select type based on the following:
        this.keywords[i].selectType =

          // If a keyword is marked as selected
          this.keywords[i].selected ?

            // If the keyword before is NOT selected and the keyword after IS selected
            !this.keywords[i - 1].selected && this.keywords[i + 1].selected ?
              "top" :

              // If the keyword before IS selected and the keyword after is NOT selected
              this.keywords[i - 1].selected && !this.keywords[i + 1].selected ?

                // And that keyword after is unselected with the unselect
                i + 1 == this.unselectedKeywordIndex ?
                  "middle" :

                  // But if its just NOT selected
                  "bottom" :

                // If the keyword before is NOT selected and the keyword after is also NOT selected
                !this.keywords[i - 1].selected && !this.keywords[i + 1].selected ?

                  // And that keyword after is unselected with the unselect
                  i + 1 == this.unselectedKeywordIndex ?
                    "top" :

                    // But if its just NOT selected
                    "whole" :

                  // If the keyword before IS selected and the keyword after is also selected
                  "middle" :

            // If a keyword is NOT selected
            null;
      }

      // Last keyword
      this.keywords[this.keywords.length - 1].selectType = this.keywords[this.keywords.length - 1].selected ? this.keywords[this.keywords.length - 2].selected ? "bottom" : "whole" : null;
    }
  }


  // -----------------------------( SET KEYWORD SELECTED SHIFT KEY )------------------------------ \\
  setKeywordSelectedShiftKey() {
    // Clear the selection from all keywords
    for (let i = 0; i < this.keywords.length; i++) {
      this.keywords[i].selected = false;
    }

    // If the selection is after the pivot
    if (this.selectedKeywordIndex > this.pivotIndex) {

      // Select all the keywords from the pivot down to the selection
      for (let i = this.pivotIndex; i <= this.selectedKeywordIndex; i++) {
        this.keywords[i].selected = true;
      }

      // If the selection is before the pivot 
    } else {

      // Select all the keywords from the pivot up to the selection
      for (let i = this.pivotIndex; i >= this.selectedKeywordIndex; i--) {
        this.keywords[i].selected = true;
      }
    }
  }


  // -----------------------------( SET KEYWORD SELECTED CTRL KEY )------------------------------ \\
  setKeywordSelectedCtrlKey(index: number) {
    // If the keyword we are pressing down on is already selected
    if (this.keywords[index].selected) {

      // Unselect that keyword
      this.keywords[index].selected = false;
      this.unselectedKeywordIndex = index;
      this.selectedKeywordIndex = null;
      // If no other keyword is selected
      if (this.keywords.map(e => e.selected).indexOf(true) == -1) {
        // Then there is nothing to delete, so disable the ability to delete
        this.isDeleteDisabled = true;

        // But if there is still a keyword that is selected
      } else {
        // Then enable the ability to delete a keyword
        this.isDeleteDisabled = false;
      }

      // If the keyword we are pressing down on is NOT yet selected
    } else {

      // Select that keyword
      this.keywords[index].selected = true;
      this.unselectedKeywordIndex = null;
      this.selectedKeywordIndex = index;
    }
    // Define the pivot index
    this.pivotIndex = index;
  }


  // -----------------------------( KEYWORD DOWN NO MODIFIER KEY )------------------------------ \\
  keywordDownNoModifierKey(index: number) {
    // Clear all the selected
    for (let i = 0; i < this.keywords.length; i++) this.keywords[i].selected = false;
    // Set the selected
    this.keywords[index].selected = true;
    // Define the pivot index
    this.pivotIndex = index;
  }


  // -----------------------------( EVALUATE EDIT )------------------------------ \\
  evaluateEdit() {
    let keyword = this.keyword.find((item, index) => index == this.editedKeywordIndex).nativeElement;
    let keywordTrimmed = keyword.textContent.trim();
    
    // If the keyword is NOT empty
    if (keywordTrimmed.length > 0) {

      // Commit the edit
      this.selectedKeywordIndex = this.editedKeywordIndex;
      this.newKeyword = false;
      this.isAddDisabled = false;
      this.isEditDisabled = false;
      this.isDeleteDisabled = false;
      this.editedKeywordIndex = null;
      this.unselectedKeywordIndex = null;
      this.pivotIndex = this.selectedKeywordIndex;
      this.keywords[this.selectedKeywordIndex].selected = true;
      this.keywords[this.selectedKeywordIndex].name = keywordTrimmed;
      keyword.textContent = this.keywords[this.selectedKeywordIndex].name;

      // If the keyword is empty
    } else {

      // If we were adding a keyword
      if (this.newKeyword) {
        // Remove that keyword
        this.newKeyword = false;
        this.unselectedKeywordIndex = null;
        this.keywords.splice(this.editedKeywordIndex, 1);

        // If we were NOT adding a keyword
      } else {

        // Reset the keyword back to the way it was before the edit
        this.isEditDisabled = false;
        this.isDeleteDisabled = false;
        this.selectedKeywordIndex = this.editedKeywordIndex;
        this.keywords[this.selectedKeywordIndex].selected = true;
        keyword.textContent = this.keywords[this.editedKeywordIndex].name;
      }
      this.isAddDisabled = false;
      this.editedKeywordIndex = null;
    }
  }


  // -----------------------------( ON KEYWORD DOUBLE CLICK )------------------------------ \\
  onKeywordDoubleClick() {
    if (!this.shiftDown && !this.ctrlDown) {
      if (this.editedKeywordIndex == null) {
        this.editKeyword()
      }
    }
  }


  // -----------------------------( REMOVE FOCUS )------------------------------ \\
  removeFocus() {
    this.pivotIndex = null;
    this.isEditDisabled = true;
    this.isDeleteDisabled = true;
    this.editedKeywordIndex = null;
    this.selectedKeywordIndex = null;
    this.unselectedKeywordIndex = null;

    for (let i = 0; i < this.keywords.length; i++) {
      this.keywords[i].selected = false;
      this.keywords[i].selectType = null;
    }
  }


  // -----------------------------( ADD KEYWORD )------------------------------ \\
  addKeyword() {
    if (!this.isAddDisabled) {
      this.addEventListeners();
      this.newKeyword = true;
      this.isAddDisabled = true;
      this.isEditDisabled = true;
      this.isDeleteDisabled = true;
      this.editedKeywordIndex = 0;
      this.selectedKeywordIndex = null;
      this.keywords.unshift({ name: "", selected: false, selectType: null });

      for (let i = 0; i < this.keywords.length; i++) {
        this.keywords[i].selected = false;
        this.keywords[i].selectType = null;
      }

      window.setTimeout(() => {
        this.keyword.find((item, index) => index == this.editedKeywordIndex).nativeElement.focus();
      });
    }
  }


  // -----------------------------( EDIT KEYWORD )------------------------------ \\
  editKeyword() {
    if (!this.isEditDisabled) {
      this.editedKeywordIndex = this.selectedKeywordIndex;
      this.isAddDisabled = true;
      this.isEditDisabled = true;
      this.isDeleteDisabled = true;
      this.selectedKeywordIndex = null;

      for (let i = 0; i < this.keywords.length; i++) {
        this.keywords[i].selected = false;
        this.keywords[i].selectType = null;
      }

      window.setTimeout(() => {
        let keyword = this.keyword.find((item, index) => index == this.editedKeywordIndex);
        keyword.nativeElement.focus();
        let range = document.createRange();
        range.selectNodeContents(keyword.nativeElement);
        let sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      });
    }
  }


  // -----------------------------( DELETE )------------------------------ \\
  deleteKeyword() {
    if (!this.isDeleteDisabled) {
      let keywordCopy: any;
      let deletedKeywordIndex: number;

      // If a keyword is selected
      if (this.selectedKeywordIndex != null) {
        // Loop through the list of keywords starting with the selected keyword
        for (let i = this.selectedKeywordIndex + 1; i < this.keywords.length; i++) {
          // If we come across a keyword that is NOT selected
          if (!this.keywords[i].selected) {
            // Make a copy of that keyword so it can be used as the newly selected keyword when all the other keywords are deleted
            keywordCopy = this.keywords[i];
            break;
          }
        }
      }

      // But if a keyword is unselected
      if (this.unselectedKeywordIndex != null) {
        // Make a copy of that keyword so it can remain as the unselected keyword when all the other keywords are deleted
        keywordCopy = this.keywords[this.unselectedKeywordIndex];
      }


      // Now delete all the selected keywords
      do {
        // Find a keyword in the list that is marked as selected
        deletedKeywordIndex = this.keywords.map(e => e.selected).indexOf(true);
        // As long as a keyword that is marked as selected is found
        if (deletedKeywordIndex != -1) {
          // Remove that keyword
          this.keywords.splice(deletedKeywordIndex, 1);
        }
      }
      // Loop until all the keywords marked as selected are deleted
      while (deletedKeywordIndex != -1);


      // Now get the new index by finding what index the coppied keyword resides at
      let newSelectedKeywordIndex = this.keywords.indexOf(keywordCopy);

      // If a keyword was selected
      if (this.selectedKeywordIndex != null) {
        // And there is a next available keyword that can be selected
        if (newSelectedKeywordIndex != -1) {
          // Select that keyword
          this.selectedKeywordIndex = newSelectedKeywordIndex;
          this.keywords[this.selectedKeywordIndex].selected = true;
          // Re-establish the pivot index
          this.pivotIndex = this.selectedKeywordIndex;

          window.setTimeout(() => {
            this.keyword.find((item, index) => index == this.selectedKeywordIndex).nativeElement.focus();
          });

          // If there is NOT a next available keyword that can be selected
        } else {
          // Make no keyword marked as selected
          this.selectedKeywordIndex = null;
          this.isDeleteDisabled = true;
          this.pivotIndex = null;
        }
      }

      // If a keyword was unselected
      if (this.unselectedKeywordIndex != null) {
        // Unselect that keyword again
        this.unselectedKeywordIndex = newSelectedKeywordIndex;
        this.isDeleteDisabled = true;
        // Re-establish the pivot index
        this.pivotIndex = this.unselectedKeywordIndex;

        window.setTimeout(() => {
          this.keyword.find((item, index) => index == this.unselectedKeywordIndex).nativeElement.focus();
        });
      }


    }
  }


  // -----------------------------( SET CONTEXT MENU )------------------------------ \\
  setContextMenu(e: MouseEvent) {
    // As long as the right mouse button is being pressed
    if (e.which == 3
      // and a keyword is NOT being edited
      && this.editedKeywordIndex == null) {

      // Build the context menu
      this.menuService.buildMenu(this, e.clientX - 280, e.clientY - 92,
        // Cut
        this.menuService.option("Add Keyword", "Ctrl+Alt+K", this.isAddDisabled, this.addKeyword),
        // Copy
        this.menuService.option("Edit Keyword", "Ctrl+Shift+K", this.isEditDisabled, this.editKeyword),
        // Paste
        this.menuService.option("Delete Keyword", "Delete", this.isDeleteDisabled, this.deleteKeyword));
    }
  }


  // -----------------------------( ENTER )------------------------------ \\
  enter() {
    event.preventDefault();
    // If a keyword is being edited
    if (this.editedKeywordIndex != null) {
      // Evaluate the state of the edit and then act accordingly
      this.evaluateEdit();
    }
  }


  // -----------------------------( ESCAPE )------------------------------ \\
  escape() {
    // If a keyword is being edited
    if (this.editedKeywordIndex != null) {
      // Evaluate the state of the edit and then act accordingly
      this.evaluateEdit();

      // If a keyword is NOT being edited
    } else {

      // As long as the context menu is NOT open
      if (!this.menuService.menuOpen) {
        // Then remove all listeners and selections
        this.removeEventListeners();
      }
    }
  }


  // -----------------------------( ARROW UP )------------------------------ \\
  arrowUp() {
    let index = this.selectedKeywordIndex != null ? this.selectedKeywordIndex : this.unselectedKeywordIndex;

    if (index > 0) {
      index--;
      this.setKeywordSelection(index);
    }
  }


  // -----------------------------( ARROW DOWN )------------------------------ \\
  arrowDown() {
    let index = this.selectedKeywordIndex != null ? this.selectedKeywordIndex : this.unselectedKeywordIndex;

    if (index < this.keywords.length - 1) {
      index++;
      this.setKeywordSelection(index);
    }
  }
}
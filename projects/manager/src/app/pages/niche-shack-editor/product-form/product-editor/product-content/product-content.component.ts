import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { ProductContent } from 'projects/manager/src/app/classes/product-content';
import { MenuService } from 'projects/manager/src/app/services/menu.service';

@Component({
  selector: 'product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.scss']
})
export class ProductContentComponent implements OnInit {
  // Private
  private copied: string = "";
  private eventListenersAdded: boolean = false;
  private pricePointClipboard: any = { pricePoint: {}, pricePointOptions: [] };
  private itemClipboard: any = { type: "", description: "", showPlaceholder: false, pricePointOptions: [] };
  // Public
  public selectedRowIndex: number = null;
  public overIconButton: boolean = false;
  public selectedColumnIndex: number = null;
  public selectedItemDescriptionIndex: number;
  public selectedPricePointOptionRowIndex: number = null;
  public selectedPricePointOptionColumnIndex: number = null;
  public productContent: ProductContent = new ProductContent();
  constructor(public _FormService: FormService, public menuService: MenuService) { }


  @ViewChildren('itemType') itemType: QueryList<ElementRef>;
  @ViewChildren('itemDesc') itemDesc: QueryList<ElementRef>;
  @ViewChildren('pricePoint') pricePoint: QueryList<ElementRef>;
  @ViewChildren('rowSelector') rowSelector: QueryList<ElementRef>;
  @ViewChildren('columnSelector') columnSelector: QueryList<ElementRef>;
  @ViewChildren('pricePointOption') pricePointOption: QueryList<ElementRef>;


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    // this.productContent.items.push({ type: "assets/no-content-type.png", description: "", showPlaceholder: true, pricePointOptions: [true] });
    // this.productContent.pricePoints.push({ textBefore: "", wholeNumber: "0", decimal: "00", textAfter: "" });



    this.productContent.pricePoints.push({ textBefore: "", wholeNumber: "49", decimal: "99", textAfter: "" });
    this.productContent.pricePoints.push({ textBefore: "", wholeNumber: "99", decimal: "99", textAfter: "" });
    this.productContent.pricePoints.push({ textBefore: "", wholeNumber: "149", decimal: "99", textAfter: "" });
    this.productContent.pricePoints.push({ textBefore: "", wholeNumber: "199", decimal: "99", textAfter: "" });
    this.productContent.pricePoints.push({ textBefore: "", wholeNumber: "249", decimal: "99", textAfter: "" });


    this.productContent.items.push({ type: "images/pdf.png", description: "Gumpy's Ice Cream Machine Manual", showPlaceholder: false, pricePointOptions: [false, true, true, true, false] });
    this.productContent.items.push({ type: "images/video.png", description: "Gumpy's Ice Cream Machine Quick Start Video Guide", showPlaceholder: false, pricePointOptions: [true, true, false, false, true] });
    this.productContent.items.push({ type: "images/audio.png", description: "Gumpy's Ice Cream Machine Instructional Audio Guide", showPlaceholder: false, pricePointOptions: [false, false, true, true, false] });
    this.productContent.items.push({ type: "images/software.png", description: "Gumpy's Ice Cream Machine Software", showPlaceholder: false, pricePointOptions: [true, true, true, true, true] });

  }


  // -----------------------------( ADD EVENT LISTENERS )------------------------------ \\
  addEventListeners() {
    if (!this.eventListenersAdded) {
      this.eventListenersAdded = true;
      window.addEventListener('keydown', this.onKeydown);
      window.addEventListener('blur', this.onInnerWindowBlur);
      window.addEventListener('mousedown', this.onMouseDown);
    }
    // Remove the selected index from the current element so that the next element can have the selection
    this.removeSelectedIndex();
  }


  // -----------------------------( REMOVE EVENT LISTENERS )------------------------------ \\
  removeEventListeners() {
    this.removeSelectedIndex();
    this.eventListenersAdded = false;
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('blur', this.onInnerWindowBlur);
    window.removeEventListener('mousedown', this.onMouseDown);
  }


  // -----------------------------( ON KEY DOWN )------------------------------ \\
  private onKeydown = (event: KeyboardEvent) => {
    if (!this._FormService.showMediaForm && !this._FormService.showPricePointForm) {
      if (event.keyCode === 13) this.enter();
      if (event.keyCode === 46) this.delete();
      if (event.keyCode === 27) this.escape();
      if (event.keyCode === 38) this.arrowUp();
      if (event.keyCode === 40) this.arrowDown();
      if (event.keyCode === 37) this.arrowLeft();
      if (event.keyCode === 39) this.arrowRight();
      if (event.ctrlKey && event.keyCode === 88) this.cut();
      if (event.keyCode === 9 && !event.shiftKey) this.tab();
      if (event.ctrlKey && event.keyCode === 67) this.copy();
      if (event.ctrlKey && event.keyCode === 86) this.paste();
      if (event.shiftKey && event.keyCode === 9) this.shiftTab();
    }
  };


  // -----------------------------( ON INNER WINDOW BLUR )------------------------------ \\
  private onInnerWindowBlur = () => {
    // When the focus gets set to something that is outside the inner-window, then remove all listeners and selections
    this.removeEventListeners();
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
          // and we're not selecting a content element
          && document.activeElement != this.productContent.lastFocusedElement) {

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
      if (document.activeElement != this.productContent.lastFocusedElement
        // and the Media Browser form is NOT open
        && !this._FormService.showMediaForm
        // and the Price Point form is NOT open
        && !this._FormService.showPricePointForm
        // and the context menu is NOT open
        && !this.menuService.menuOpen
        // and we're NOT clicking on an icon button
        && !this.overIconButton) {

        // Then remove all listeners and selections
        this.removeEventListeners();
      }
    })
  }


  // -----------------------------( ON ICON BUTTON MOUSE OUT )------------------------------ \\
  onIconButtonMouseOut() {
    this.overIconButton = false;

    // * A fail safe that puts the focus back to the selected price point or item if a mouseup occurs outside the click bounds of an icon button *\\ 

    // As long as the context menu is NOT open
    if (!this.menuService.menuOpen) {

      // If a price point is selected
      if (this.selectedColumnIndex != null) {
        // Set focus to that price point
        this.columnSelector.find((item, index) => index == this.selectedColumnIndex).nativeElement.focus();


        // If we're copying an Item
      } else if (this.selectedRowIndex != null) {
        // Set focus to that item
        this.rowSelector.find((item, index) => index == this.selectedRowIndex).nativeElement.focus();
      }
    }
  }


  // -----------------------------( ON COLUMN SELECTOR FOCUS )------------------------------ \\
  onColumnSelectorFocus(columnIndex: number) {
    this.addEventListeners();
    this.selectedColumnIndex = columnIndex;
    this.productContent.lastFocusedElement = document.activeElement;
  }


  // -----------------------------( ON ROW SELECTOR FOCUS )------------------------------ \\
  onRowSelectorFocus(rowIndex: number) {
    this.addEventListeners();
    this.selectedRowIndex = rowIndex;
    this.productContent.lastFocusedElement = document.activeElement;
  }


  // -----------------------------( ON PRICE POINT FOCUS )------------------------------ \\
  onPricePointFocus(columnIndex: number) {
    this.addEventListeners();
    this.productContent.selectedPricePointIndex = columnIndex;
    this.productContent.lastFocusedElement = document.activeElement;
  }


  // -----------------------------( ON PRICE POINT CLICK )------------------------------ \\
  onPricePointClick() {
    this._FormService.showPricePointForm = true;
    this._FormService.productContent = this.productContent;
  }


  // -----------------------------( ON ITEM TYPE FOCUS )------------------------------ \\
  onItemTypeFocus(rowIndex: number) {
    this.addEventListeners();
    this.productContent.selectedItemTypeIndex = rowIndex;
    this.productContent.lastFocusedElement = document.activeElement;
  }


  // -----------------------------( ON ITEM TYPE CLICK )------------------------------ \\
  onItemTypeClick() {
    this._FormService.showMediaForm = true;
    this._FormService.productContent = this.productContent;
  }


  // -----------------------------( ON ITEM DESCRIPTION FOCUS )------------------------------ \\
  onItemDescriptionFocus(rowIndex: number) {
    this.addEventListeners();
    this.selectedItemDescriptionIndex = rowIndex;
    this.productContent.lastFocusedElement = document.activeElement;
  }


  // -----------------------------( SET ITEM DESCRIPTION )------------------------------ \\
  setItemDescription(rowIndex: number, itemDescription: HTMLTableCellElement, event) {
    // Update the item description
    this.productContent.items[rowIndex].description = event.target.textContent;

    // Set the placeholder
    if (itemDescription.textContent.length == 0) {
      this.productContent.items[rowIndex].showPlaceholder = true;
    } else {
      this.productContent.items[rowIndex].showPlaceholder = false;
    }
  }


  // -----------------------------( ON PRICE POINT OPTION FOCUS )------------------------------ \\
  onPricePointOptionFocus(columnIndex: number, rowIndex: number) {
    this.addEventListeners();
    this.selectedPricePointOptionRowIndex = rowIndex;
    this.selectedPricePointOptionColumnIndex = columnIndex;
    this.productContent.lastFocusedElement = document.activeElement;
  }


  // -----------------------------( ON PRICE POINT OPTION CLICK )------------------------------ \\
  onPricePointOptionClick() {
    this.productContent.items[this.selectedPricePointOptionRowIndex].pricePointOptions[this.selectedPricePointOptionColumnIndex] = !this.productContent.items[this.selectedPricePointOptionRowIndex].pricePointOptions[this.selectedPricePointOptionColumnIndex];
  }


  // -----------------------------( REMOVE FOCUS )------------------------------ \\
  removeSelectedIndex() {
    this.selectedRowIndex = null;
    this.selectedColumnIndex = null;
    this.selectedItemDescriptionIndex = null;
    this.selectedPricePointOptionRowIndex = null;
    this.selectedPricePointOptionColumnIndex = null;
    this.productContent.selectedItemTypeIndex = null;
    this.productContent.selectedPricePointIndex = null;
    window.getSelection().removeAllRanges();
  }


  // -----------------------------( SET CONTEXT MENU )------------------------------ \\
  setContextMenu(e: MouseEvent) {
    // As long as the right mouse button is being pressed
    if (e.which == 3) {

      // Define the menu options based on which selector type is being right clicked
      let selectorType: string = this.selectedColumnIndex != null ? "Price Point" : this.selectedRowIndex != null ? "Item" : null;
      let direction1: string = selectorType == "Price Point" ? "Left" : "Above";
      let direction2: string = selectorType == "Price Point" ? "Right" : "Below";
      let isPasteDisabled: boolean = (selectorType == 'Price Point' && this.copied == 'Price Point') || (selectorType == 'Item' && this.copied == 'Item') ? false : true;
      let isDeleteDisabled: boolean = (selectorType == 'Price Point' && this.productContent.items[0].pricePointOptions.length > 1) || (selectorType == 'Item' && this.productContent.items.length > 1) ? false : true;
      let contextMenuLeft: number = e.clientX + (selectorType == "Price Point" ? 0 : -235);


      // Build the context menu
      this.menuService.buildMenu(this, contextMenuLeft, e.clientY - 235,
        // Cut
        this.menuService.option("Cut", "Ctrl+X", isDeleteDisabled, this.cut),
        // Copy
        this.menuService.option("Copy", "Ctrl+C", false, this.copy),
        // Paste
        this.menuService.option("Paste", "Ctrl+V", isPasteDisabled, this.paste),
        // Paste Special
        this.menuService.subMenu("Paste Special", isPasteDisabled,
          // Paste New Left/Above
          this.menuService.option("Paste New " + selectorType + " " + direction1, null, false, this.pasteSpecial, direction1),
          // Paste New Right/Below
          this.menuService.option("Paste New " + selectorType + " " + direction2, null, false, this.pasteSpecial, direction2)),
        // Divider
        this.menuService.divider(),
        // Insert Left/Above
        this.menuService.option("Insert " + direction1, null, false, this.insert, direction1),
        // Insert Right/Below
        this.menuService.option("Insert " + direction2, null, false, this.insert, direction2),
        // Clear Values
        this.menuService.option("Clear " + selectorType + " Values", null, false, this.clearValues),
        // Delete
        this.menuService.option("Delete " + selectorType, null, isDeleteDisabled, this.delete)
      )
    }
  }


  // -----------------------------( INSERT )------------------------------ \\
  insert(direction: string) {
    // If we're inserting a new Price Point
    if (this.selectedColumnIndex != null) {
      this.selectedColumnIndex = this.selectedColumnIndex + (direction == "Left" ? 0 : 1);

      // Add the new Price Point either to the left or right of the selected price point
      this.productContent.pricePoints.splice(this.selectedColumnIndex, 0, { textBefore: "", wholeNumber: "0", decimal: "00", textAfter: "" });
      // Add the price point options to the new Price Point
      for (let i = 0; i < this.productContent.items.length; i++) {
        this.productContent.items[i].pricePointOptions.splice(this.selectedColumnIndex, 0, false);
      }

      window.setTimeout(() => {
        this.columnSelector.find((item, index) => index == this.selectedColumnIndex).nativeElement.focus();
      })

      // If we're inserting a new Item
    } else if (this.selectedRowIndex != null) {
      let pricePointOptionsCount = this.productContent.items[this.selectedRowIndex].pricePointOptions.length;
      this.selectedRowIndex = this.selectedRowIndex + (direction == "Above" ? 0 : 1);

      // Add the new Item either above or below the selected item
      this.productContent.items.splice(this.selectedRowIndex, 0, { type: "assets/no-content-type.png", description: "", showPlaceholder: true, pricePointOptions: [] });
      // Add the price point options to the new item
      for (let i = 0; i < pricePointOptionsCount; i++) {
        this.productContent.items[this.selectedRowIndex].pricePointOptions.push(false);
      }

      window.setTimeout(() => {
        this.rowSelector.find((item, index) => index == this.selectedRowIndex).nativeElement.focus();
      })
    }
  }


  // -----------------------------( CLEAR VALUES )------------------------------ \\
  clearValues() {
    // If we're clearing a Price Point's values
    if (this.selectedColumnIndex != null) {

      // Set the price back to default
      this.productContent.pricePoints[this.selectedColumnIndex] = { textBefore: "", wholeNumber: "0", decimal: "00", textAfter: "" };

      // Set all the price point option values as being unchecked
      for (let i = 0; i < this.productContent.items.length; i++) {
        this.productContent.items[i].pricePointOptions[this.selectedColumnIndex] = false;
      }

      window.setTimeout(() => {
        this.columnSelector.find((item, index) => index == this.selectedColumnIndex).nativeElement.focus();
      })


      // If we're clearing an Item's values
    } else if (this.selectedRowIndex != null) {

      // Set the item's values back to the original default settings
      this.productContent.items[this.selectedRowIndex].type = "assets/no-content-type.png";
      this.productContent.items[this.selectedRowIndex].description = "";
      this.productContent.items[this.selectedRowIndex].showPlaceholder = true;

      // Set all the price point option values to false
      for (let i = 0; i < this.productContent.items[this.selectedRowIndex].pricePointOptions.length; i++) {
        this.productContent.items[this.selectedRowIndex].pricePointOptions[i] = false;
      }

      window.setTimeout(() => {
        this.rowSelector.find((item, index) => index == this.selectedRowIndex).nativeElement.focus();
      })
    }
  }


  // -----------------------------( ENTER )------------------------------ \\
  enter() {
    if (this.productContent.selectedItemTypeIndex != null) {
      this.productContent.lastFocusedElement = this.itemType.find((item, index) => index == this.productContent.selectedItemTypeIndex).nativeElement;
      this.onItemTypeClick();
    }
    if (this.selectedPricePointOptionRowIndex != null) this.onPricePointOptionClick();
    if (this.productContent.selectedPricePointIndex != null) {
      this.productContent.lastFocusedElement = this.pricePoint.find((item, index) => index == this.productContent.selectedPricePointIndex).nativeElement;
      this.onPricePointClick();
    }
    if (this.selectedItemDescriptionIndex != null) {
      event.preventDefault();
      let item = this.itemDesc.find((item, index) => index == this.selectedItemDescriptionIndex);
      item.nativeElement.focus();
      let range = document.createRange();
      range.selectNodeContents(item.nativeElement);
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }


  // -----------------------------( DELETE )------------------------------ \\
  delete() {
    // If we're deleting a Price Point
    if (this.selectedColumnIndex != null && this.productContent.items[0].pricePointOptions.length > 1) {

      // Delete the Price Point at the specified index
      this.productContent.pricePoints.splice(this.selectedColumnIndex, 1);
      // And delete all the price point options from the deleted Price Point as well
      for (let i = 0; i < this.productContent.items.length; i++) {
        this.productContent.items[i].pricePointOptions.splice(this.selectedColumnIndex, 1);
      }

      window.setTimeout(() => {
        // If we're NOT deleting the last price point
        if (this.selectedColumnIndex < this.productContent.items[0].pricePointOptions.length) {
          // Set focus to the price point that now has the index of what the deleted price point once had
          this.columnSelector.find((item, index) => index == this.selectedColumnIndex).nativeElement.focus();

          // If we are deleting the last price point
        } else {

          // Then remove all listeners and selections
          this.removeEventListeners();
        }
      })


      // If we're deleting an Item
    } else if (this.selectedRowIndex != null && this.productContent.items.length > 1) {

      // Delete the item at the specified index
      this.productContent.items.splice(this.selectedRowIndex, 1);

      window.setTimeout(() => {
        // If we're NOT deleting the last item
        if (this.selectedRowIndex < this.productContent.items.length) {
          // Set focus to the item that now has the index of what the deleted item once had
          this.rowSelector.find((item, index) => index == this.selectedRowIndex).nativeElement.focus();

          // If we are deleting the last item
        } else {

          // Then remove all listeners and selections
          this.removeEventListeners();
        }
      })
    }
  }


  // -----------------------------( ESCAPE )------------------------------ \\
  escape() {
    // If an item description is selected and the inner text is selected
    if (this.selectedItemDescriptionIndex != null && window.getSelection().anchorNode != null && (window.getSelection().anchorNode.nodeType == 3 || !window.getSelection().isCollapsed)) {
      // Remove the text selection
      window.getSelection().removeAllRanges();

      // For everything else
    } else {

      // As long as the context menu is NOT open
      if (!this.menuService.menuOpen) {
        // Remove all listeners and selections
        this.removeEventListeners();
      }
    }
  }


  // -----------------------------( ARROW UP )------------------------------ \\
  arrowUp() {
    // If we're on a row selector
    if (this.selectedRowIndex != null) {
      if (this.selectedRowIndex > 0) {
        this.selectedRowIndex--;
      }
    }

    // If we're on an item type
    if (this.productContent.selectedItemTypeIndex != null) {
      if (this.productContent.selectedItemTypeIndex > 0) {
        this.productContent.selectedItemTypeIndex--;
      }
    }

    // If we're on an item description
    if (this.selectedItemDescriptionIndex != null) {
      if (this.selectedItemDescriptionIndex > 0) {
        this.selectedItemDescriptionIndex--;
      }
    }

    // If we're on a price point option
    if (this.selectedPricePointOptionRowIndex != null) {
      if (this.selectedPricePointOptionRowIndex > 0) {
        this.selectedPricePointOptionRowIndex--;
        return
      }
    }

    // If we're leaving a price point option and entering a price point
    if (this.selectedPricePointOptionRowIndex == 0) {
      this.productContent.selectedPricePointIndex = this.selectedPricePointOptionColumnIndex;
      this.selectedPricePointOptionRowIndex = null;
      return
    }

    // If we're leaving a price point and entering a column selector
    if (this.productContent.selectedPricePointIndex != null) {
      this.selectedColumnIndex = this.productContent.selectedPricePointIndex;
      this.productContent.selectedPricePointIndex = null;
    }
  }


  // -----------------------------( ARROW DOWN )------------------------------ \\
  arrowDown() {
    // If we're on a row selector
    if (this.selectedRowIndex != null) {
      if (this.selectedRowIndex < this.productContent.items.length - 1) {
        this.selectedRowIndex++;
      }
    }

    // If we're on an item type
    if (this.productContent.selectedItemTypeIndex != null) {
      if (this.productContent.selectedItemTypeIndex < this.productContent.items.length - 1) {
        this.productContent.selectedItemTypeIndex++;
      }
    }

    // If we're on an item description
    if (this.selectedItemDescriptionIndex != null) {
      if (this.selectedItemDescriptionIndex < this.productContent.items.length - 1) {
        this.selectedItemDescriptionIndex++;
      }
    }

    // If we're leaving a column selector and entering a price point
    if (this.selectedColumnIndex != null) {
      this.productContent.selectedPricePointIndex = this.selectedColumnIndex;
      this.selectedColumnIndex = null;
      return
    }

    // If we're leaving a price point and entering a price point option
    if (this.productContent.selectedPricePointIndex != null) {
      this.selectedPricePointOptionColumnIndex = this.productContent.selectedPricePointIndex;
      this.productContent.selectedPricePointIndex = null;
      this.selectedPricePointOptionRowIndex = 0;
      return
    }

    // If we're on a price point option
    if (this.selectedPricePointOptionRowIndex != null) {
      if (this.selectedPricePointOptionRowIndex < this.productContent.items.length - 1) {
        this.selectedPricePointOptionRowIndex++;
      }
    }
  }


  // -----------------------------( ARROW LEFT )------------------------------ \\
  arrowLeft() {
    // If we're on a column selector
    if (this.selectedColumnIndex != null) {
      if (this.selectedColumnIndex > 0) {
        this.selectedColumnIndex--;
      }
    }

    // If we're on a price point
    if (this.productContent.selectedPricePointIndex != null) {
      if (this.productContent.selectedPricePointIndex > 0) {
        this.productContent.selectedPricePointIndex--;
      }
    }

    // If we're on a price point option
    if (this.selectedPricePointOptionColumnIndex != null) {
      if (this.selectedPricePointOptionColumnIndex > 0) {
        this.selectedPricePointOptionColumnIndex--;
        return
      }
    }

    // If we're leaving a price point option and entering an item description
    if (this.selectedPricePointOptionColumnIndex == 0) {
      this.selectedItemDescriptionIndex = this.selectedPricePointOptionRowIndex;
      this.selectedPricePointOptionColumnIndex = null;
      return
    }

    // If we're leaving an item description and entering an item type
    if (this.selectedItemDescriptionIndex != null) {
      this.productContent.selectedItemTypeIndex = this.selectedItemDescriptionIndex;
      this.selectedItemDescriptionIndex = null;
      return
    }

    // If we're leaving an item type and entering a row selector
    if (this.productContent.selectedItemTypeIndex != null) {
      this.selectedRowIndex = this.productContent.selectedItemTypeIndex;
      this.productContent.selectedItemTypeIndex = null;
    }
  }


  // -----------------------------( ARROW RIGHT )------------------------------ \\
  arrowRight() {
    // If we're on a column selector
    if (this.selectedColumnIndex != null) {
      if (this.selectedColumnIndex < this.productContent.pricePoints.length - 1) {
        this.selectedColumnIndex++;
      }
    }

    // If we're on a price point
    if (this.productContent.selectedPricePointIndex != null) {
      if (this.productContent.selectedPricePointIndex < this.productContent.pricePoints.length - 1) {
        this.productContent.selectedPricePointIndex++;
      }
    }

    // If we're leaving a row selector and entering an item type
    if (this.selectedRowIndex != null) {
      this.productContent.selectedItemTypeIndex = this.selectedRowIndex;
      this.selectedRowIndex = null;
      return
    }

    // If we're leaving an item type and entering an item description
    if (this.productContent.selectedItemTypeIndex != null) {
      this.selectedItemDescriptionIndex = this.productContent.selectedItemTypeIndex;
      this.productContent.selectedItemTypeIndex = null;
      return
    }

    // If we're leaving an item description and entering a price point option
    if (this.selectedItemDescriptionIndex != null) {
      this.selectedPricePointOptionRowIndex = this.selectedItemDescriptionIndex;
      this.selectedItemDescriptionIndex = null;
      this.selectedPricePointOptionColumnIndex = 0;
      return
    }

    // If we're on a price point option
    if (this.selectedPricePointOptionColumnIndex != null) {
      if (this.selectedPricePointOptionColumnIndex < this.productContent.pricePoints.length - 1) {
        this.selectedPricePointOptionColumnIndex++;
      }
    }
  }


  // -----------------------------( CUT )------------------------------ \\
  cut() {
    this.copy();
    this.delete();
  }


  // -----------------------------( TAB )------------------------------ \\
  tab() {
    this.arrowRight();
    event.preventDefault();
  }


  // -----------------------------( COPY )------------------------------ \\
  copy() {
    // If we're copying a price point
    if (this.selectedColumnIndex != null) {

      // Copy the price point value
      this.pricePointClipboard.pricePoint = {
        textBefore: this.productContent.pricePoints[this.selectedColumnIndex].textBefore,
        wholeNumber: this.productContent.pricePoints[this.selectedColumnIndex].wholeNumber,
        decimal: this.productContent.pricePoints[this.selectedColumnIndex].decimal,
        textAfter: this.productContent.pricePoints[this.selectedColumnIndex].textAfter
      };

      // Reset the price point array
      this.pricePointClipboard.pricePointOptions = [];
      // Copy all the price point option values
      for (let i = 0; i < this.productContent.items.length; i++) {
        this.pricePointClipboard.pricePointOptions.push(this.productContent.items[i].pricePointOptions[this.selectedColumnIndex]);
      }
      this.copied = "Price Point";

      window.setTimeout(() => {
        this.columnSelector.find((item, index) => index == this.selectedColumnIndex).nativeElement.focus();
      })

      // If we're copying an Item
    } else if (this.selectedRowIndex != null) {

      // Copy the item's values
      this.itemClipboard.type = this.productContent.items[this.selectedRowIndex].type;
      this.itemClipboard.description = this.productContent.items[this.selectedRowIndex].description;
      this.itemClipboard.showPlaceholder = this.productContent.items[this.selectedRowIndex].showPlaceholder;
      // Reset the price point array
      this.itemClipboard.pricePointOptions = [];
      // Copy all the price point option values
      for (let i = 0; i < this.productContent.items[this.selectedRowIndex].pricePointOptions.length; i++) {
        this.itemClipboard.pricePointOptions.push(this.productContent.items[this.selectedRowIndex].pricePointOptions[i]);
      }
      this.copied = "Item";

      window.setTimeout(() => {
        this.rowSelector.find((item, index) => index == this.selectedRowIndex).nativeElement.focus();
      })
    }
  }


  // -----------------------------( PASTE )------------------------------ \\
  paste() {
    // If we're pasting a price point
    if (this.selectedColumnIndex != null && this.copied == "Price Point") {
      // If the copied price point length is greater than the current price point length, then use the current price point length, otherwise, use the copied price point length
      let pricePointOptionsLength = this.pricePointClipboard.pricePointOptions.length > this.productContent.items.length ? this.productContent.items.length : this.pricePointClipboard.pricePointOptions.length;

      // Paste the price point value
      this.productContent.pricePoints[this.selectedColumnIndex].textBefore = this.pricePointClipboard.pricePoint.textBefore;
      this.productContent.pricePoints[this.selectedColumnIndex].wholeNumber = this.pricePointClipboard.pricePoint.wholeNumber;
      this.productContent.pricePoints[this.selectedColumnIndex].decimal = this.pricePointClipboard.pricePoint.decimal;
      this.productContent.pricePoints[this.selectedColumnIndex].textAfter = this.pricePointClipboard.pricePoint.textAfter;

      // Paste all the price point option values
      for (let i = 0; i < pricePointOptionsLength; i++) {
        this.productContent.items[i].pricePointOptions[this.selectedColumnIndex] = this.pricePointClipboard.pricePointOptions[i];
      }

      window.setTimeout(() => {
        this.columnSelector.find((item, index) => index == this.selectedColumnIndex).nativeElement.focus();
      })

      // If we're pasting an Item
    } else if (this.selectedRowIndex != null && this.copied == "Item") {

      // If the copied price point length is greater than the current price point length, then use the current price point length, otherwise, use the copied price point length
      let pricePointOptionsLength = this.itemClipboard.pricePointOptions.length > this.productContent.items[this.selectedRowIndex].pricePointOptions.length ? this.productContent.items[this.selectedRowIndex].pricePointOptions.length : this.itemClipboard.pricePointOptions.length;

      // Paste the item's values
      this.productContent.items[this.selectedRowIndex].type = this.itemClipboard.type;
      this.productContent.items[this.selectedRowIndex].description = this.itemClipboard.description;
      this.productContent.items[this.selectedRowIndex].showPlaceholder = this.itemClipboard.showPlaceholder;
      // Paste all the price point option values
      for (let i = 0; i < pricePointOptionsLength; i++) {
        this.productContent.items[this.selectedRowIndex].pricePointOptions[i] = this.itemClipboard.pricePointOptions[i];
      }

      window.setTimeout(() => {
        this.rowSelector.find((item, index) => index == this.selectedRowIndex).nativeElement.focus();
      })
    }
  }


  // -----------------------------( PASTE SPECIAL )------------------------------ \\
  pasteSpecial(direction: string) {
    this.insert(direction);
    this.paste();
  }


  // -----------------------------( SHIFT TAB )------------------------------ \\
  shiftTab() {
    this.arrowLeft();
    event.preventDefault();
  }
}
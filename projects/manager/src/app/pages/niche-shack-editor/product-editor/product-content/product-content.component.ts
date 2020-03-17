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
  constructor(public _FormService: FormService, public menuService: MenuService) { }
  public productContent: ProductContent = new ProductContent();
  public selectedColumnIndex: number = null;
  public selectedRowIndex: number = null;
  public selectedItemDescriptionIndex: number;
  public selectedPricePointOptionColumnIndex: number = null;
  public selectedPricePointOptionRowIndex: number = null;
  public overTable: boolean = false;
  private eventListenersSet: boolean = false;
  private copied: string = "";
  private pricePointClipboard: any = { pricePoint: {}, pricePointOptions: [] };
  private itemClipboard: any = { type: "", description: "", showPlaceholder: false, pricePointOptions: [] };
  @ViewChildren('itemDesc') itemDesc: QueryList<ElementRef>;


  // -----------------------------( NG ON INIT )------------------------------ \\
  ngOnInit() {
    this.productContent.items.push({ type: "assets/no-content-type.png", description: "", showPlaceholder: true, pricePointOptions: [true] });
    this.productContent.pricePoints.push({ textBefore: "", wholeNumber: "0", decimal: "00", textAfter: "" });
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


  // -----------------------------( ON MOUSE DOWN )------------------------------ \\
  private onMousedown = () => {
    if (!this.overTable && !this._FormService.showMediaForm && !this._FormService.showPricePointForm) {
      this.unsetEventListeners();
    }
  };




  // -----------------------------( SET EVENT LISTENERS )------------------------------ \\
  setEventListeners() {
    if (!this.eventListenersSet) {
      this.eventListenersSet = true;
      window.addEventListener('keydown', this.onKeydown);
      window.addEventListener('mousedown', this.onMousedown);
    }
    this.removeFocus();
  }


  // -----------------------------( UNSET EVENT LISTENERS )------------------------------ \\
  unsetEventListeners() {
    this.removeFocus();
    this.eventListenersSet = false;
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('mousedown', this.onMousedown);
  }


  // -----------------------------( ON COLUMN SELECTOR DOWN )------------------------------ \\
  onColumnSelectorDown(columnIndex: number) {
    this.setEventListeners();
    this.selectedColumnIndex = columnIndex;
  }


  // -----------------------------( ON ROW SELECTOR DOWN )------------------------------ \\
  onRowSelectorDown(rowIndex: number) {
    this.setEventListeners();
    this.selectedRowIndex = rowIndex;
  }


  // -----------------------------( ON PRICE POINT DOWN )------------------------------ \\
  onPricePointDown(columnIndex: number) {
    this.setEventListeners();
    this.productContent.selectedPricePointIndex = columnIndex;
  }


  // -----------------------------( ON PRICE POINT CLICK )------------------------------ \\
  onPricePointClick() {
    this._FormService.showPricePointForm = true;
    this._FormService.productContent = this.productContent;
  }


  // -----------------------------( ON ITEM TYPE DOWN )------------------------------ \\
  onItemTypeDown(rowIndex: number) {
    this.setEventListeners();
    this.productContent.selectedItemTypeIndex = rowIndex;
  }


  // -----------------------------( ON ITEM TYPE CLICK )------------------------------ \\
  onItemTypeClick() {
    this._FormService.showMediaForm = true;
    this._FormService.productContent = this.productContent;
  }


  // -----------------------------( ON ITEM DESCRIPTION FOCUS )------------------------------ \\
  onItemDescriptionFocus(rowIndex: number) {
    this.setEventListeners();
    this.selectedItemDescriptionIndex = rowIndex;
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


  // -----------------------------( ON PRICE POINT OPTION DOWN )------------------------------ \\
  onPricePointOptionDown(columnIndex: number, rowIndex: number) {
    this.setEventListeners();
    this.selectedPricePointOptionRowIndex = rowIndex;
    this.selectedPricePointOptionColumnIndex = columnIndex;
  }


  // -----------------------------( ON PRICE POINT OPTION CLICK )------------------------------ \\
  onPricePointOptionClick() {
    this.productContent.items[this.selectedPricePointOptionRowIndex].pricePointOptions[this.selectedPricePointOptionColumnIndex] = !this.productContent.items[this.selectedPricePointOptionRowIndex].pricePointOptions[this.selectedPricePointOptionColumnIndex];
  }


  // -----------------------------( REMOVE FOCUS )------------------------------ \\
  removeFocus() {
    this.selectedRowIndex = null;
    this.selectedColumnIndex = null;
    this.selectedItemDescriptionIndex = null;
    this.selectedPricePointOptionRowIndex = null;
    this.selectedPricePointOptionColumnIndex = null;
    this.productContent.selectedItemTypeIndex = null;
    this.productContent.selectedPricePointIndex = null;
  }



  // -----------------------------( SET CONTEXT MENU )------------------------------ \\
  setContextMenu(e: MouseEvent) {
    // As long as the right mouse button is being pressed
    if (e.which == 3) {

      // Define the menu options based on which selector type is being right clicked
      // let selectorType: string = this.selectedColumnIndex != null ? "Price Point" : this.selectedRowIndex != null ? "Item" : null;
      // let direction1: string = selectorType == "Price Point" ? "Left" : "Above";
      // let direction2: string = selectorType == "Price Point" ? "Right" : "Below";
      // let isPasteDisabled: boolean = (selectorType == 'Price Point' && this.copied == 'Price Point') || (selectorType == 'Item' && this.copied == 'Item') ? false : true;
      // let isDeleteDisabled: boolean = (selectorType == 'Price Point' && this.productContent.items[0].pricePointOptions.length > 1) || (selectorType == 'Item' && this.productContent.items.length > 1) ? false : true;
      // let contextMenuLeft: number = e.clientX + (selectorType == "Price Point" ? 0 : -235);
      // let contextMenuTop: number = e.clientY - 235;






      let selectorType: string = this.selectedColumnIndex != null ? "Price Point" : this.selectedRowIndex != null ? "Item" : null;
      let contextMenuLeft: number = e.clientX + (selectorType == "Price Point" ? 0 : -205);

      this.menuService.buildMenu(this, contextMenuLeft, e.clientY - 130,
        this.menuService.option("Alita", "Ctrl+A", false, null),
        this.menuService.divider(),
        this.menuService.subMenu("Sub Menu 1", false,
          this.menuService.option("Option A", "Ctrl+Shift+A", false, null),
          this.menuService.option("Option B", "Ctrl+Shift+B", false, null),
          this.menuService.subMenu("Sub Menu 2", false,
            this.menuService.option("Option 2A", "Ctrl+Shift+2A", false, null),
            this.menuService.option("Option 2B", "Ctrl+Shift+2B", false, null),
            this.menuService.divider(),
            this.menuService.option("Option 2C", "Ctrl+Shift+2C", false, null)),
          this.menuService.option("Option C", "Ctrl+Shift+C", false, null),
          this.menuService.option("Option D", "Ctrl+Shift+D", false, null),
          this.menuService.divider(),
          this.menuService.subMenu("Sub Menu 3", false,
            this.menuService.option("Option 3A", "Ctrl+Shift+3A", false, null),
            this.menuService.option("Option 3B", "Ctrl+Shift+3B", false, null),
            this.menuService.divider(),
            this.menuService.subMenu("Sub Menu 4", false,
              this.menuService.option("Option 4A", "Ctrl+Shift+4A", false, null),
              this.menuService.option("Option 4B", "Ctrl+Shift+4B", false, null),
              this.menuService.option("Option 4C", "Ctrl+Shift+4C", false, null)),
            this.menuService.option("Option 3C", "Ctrl+Shift+3C", false, null)),
          this.menuService.option("Option E", "Ctrl+Shift+E", false, null),
          this.menuService.option("Option F", "Ctrl+Shift+F", false, null)),
        this.menuService.option("Battle", "Ctrl+B", false, null),
        this.menuService.option("Angel", null, false, null));




























      // // Build the context menu
      // this.menuService.buildMenu(this, contextMenuLeft, contextMenuTop,
      //   // Cut
      //   this.menuService.option("Cut", "Ctrl+X", isDeleteDisabled, this.cut),
      //   // Copy
      //   this.menuService.option("Copy", "Ctrl+C", false, this.copy),
      //   // Paste
      //   this.menuService.option("Paste", "Ctrl+V", isPasteDisabled, this.paste),
      //   // Paste Special
      //   this.menuService.subMenu("Paste Special", isPasteDisabled,
      //     // Paste New Left/Above
      //     this.menuService.option("Paste New " + selectorType + " " + direction1, null, false, this.pasteSpecial, direction1),
      //     // Paste New Right/Below
      //     this.menuService.option("Paste New " + selectorType + " " + direction2, null, false, this.pasteSpecial, direction2)),
      //   // Divider
      //   this.menuService.divider(),
      //   // Insert Left/Above
      //   this.menuService.option("Insert " + direction1, null, false, this.insert, direction1),
      //   // Insert Right/Below
      //   this.menuService.option("Insert " + direction2, null, false, this.insert, direction2),
      //   // Clear Values
      //   this.menuService.option("Clear " + selectorType + " Values", null, false, this.clearValues),
      //   // Delete
      //   this.menuService.option("Delete " + selectorType, null, isDeleteDisabled, this.delete)
      // )
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
    }
  }


  // -----------------------------( ENTER )------------------------------ \\
  enter() {
    if (this.productContent.selectedItemTypeIndex != null) this.onItemTypeClick();
    if (this.selectedPricePointOptionRowIndex != null) this.onPricePointOptionClick();
    if (this.productContent.selectedPricePointIndex != null) this.onPricePointClick();
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

      // If we're deleting an Item
    } else if (this.selectedRowIndex != null && this.productContent.items.length > 1) {

      // Delete the item at the specified index
      this.productContent.items.splice(this.selectedRowIndex, 1);
    }
  }


  // -----------------------------( ESCAPE )------------------------------ \\
  escape() {
    // If an item description is selected
    if (this.selectedItemDescriptionIndex != null
      // and the inner text is selected
      && document.activeElement == this.itemDesc.find((item, index) => index == this.selectedItemDescriptionIndex).nativeElement) {

      // Remove the text selection
      window.getSelection().removeAllRanges();
      // Remove the focus from the cell
      this.itemDesc.find((item, index) => index == this.selectedItemDescriptionIndex).nativeElement.blur();;

      // For everything else
    } else {

      // Just remove the outer selection
      this.unsetEventListeners();
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
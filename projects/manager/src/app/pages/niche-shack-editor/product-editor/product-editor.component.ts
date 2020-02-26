import { Component, OnInit, ViewChild, ElementRef, HostListener, ViewChildren, QueryList } from '@angular/core';
import { FormService } from '../../../services/form.service';
import { ShortcutKeysService } from '../../../services/shortcut-keys.service';

@Component({
  selector: 'product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {
  public showMenu: boolean;
  public product = { items: [], pricePoints: [] };
  public contentType = { selectedIndex: null, product: null };
  public selectedColumnIndex: number = null;
  public selectedRowIndex: number = null;
  public selectedPricePointIndex: number;
  public selectedItemDescriptionIndex: number;
  public selectedPricePointOptionColumnIndex: number = null;
  public selectedPricePointOptionRowIndex: number = null;
  public overTable: boolean = false;
  public contentMenuLeft: number;
  public contentMenuTop: number;
  public showContentMenu: boolean = false;
  public showContentSubMenu: boolean = false;
  public contentSubMenuWidth: number;
  public direction1: string;
  public direction2: string;
  public pasteSpecialOver: boolean = false;
  public pasteEnabled: boolean = false;
  public deleteEnabled: boolean = false;
  private eventListenersSet: boolean = false;
  private copied: string = "";
  private pasteSpecialOptionOverTimeout: number;
  private pasteSpecialOptionOutTimeout: number;
  private contentMenuBlurTimeout: number;
  private pricePointClipboard: any = { pricePoint: "", pricePointOptions: [] };
  private itemClipboard: any = { type: "", description: "", showPlaceholder: false, pricePointOptions: [] };






  @ViewChild('productEditor', { static: false }) productEditor: ElementRef;
  @ViewChild('contentMenu', { static: false }) contentMenu: ElementRef;

  @ViewChildren('itemDesc') itemDesc: QueryList<ElementRef>;

  constructor(public _FormService: FormService, public shortcutKeys: ShortcutKeysService) { }

  ngOnInit() {

    // this.product.pricePoints.push("$0.00");
    // this.product.items.push({ type: "assets/no-content-type.png", description: "", showPlaceholder: true, pricePointOptions: [true] });

    this.product.pricePoints.push("$49.99");
    this.product.pricePoints.push("$99.99");
    this.product.pricePoints.push("$149.99");
    this.product.pricePoints.push("$199.99");
    this.product.pricePoints.push("$249.99");


    this.product.items.push({ type: "images/pdf.png", description: "Gumpy's Ice Cream Machine Manual", showPlaceholder: false, pricePointOptions: [false, true, true, true, false] });
    this.product.items.push({ type: "images/video.png", description: "Gumpy's Ice Cream Machine Quick Start Video Guide", showPlaceholder: false, pricePointOptions: [true, true, false, false, true] });
    this.product.items.push({ type: "images/audio.png", description: "Gumpy's Ice Cream Machine Instructional Audio Guide", showPlaceholder: false, pricePointOptions: [false, false, true, true, false] });
    this.product.items.push({ type: "images/software.png", description: "Gumpy's Ice Cream Machine Software", showPlaceholder: false, pricePointOptions: [true, true, true, true, true] });
  }









  private onKeydown = (event: KeyboardEvent) => {
    if (event.keyCode == 38) this.arrowUp();
    if (event.keyCode == 40) this.arrowDown();
    if (event.keyCode == 37) this.arrowLeft();
    if (event.keyCode == 39) this.arrowRight();
    if (event.keyCode == 13) this.enter();

    if (event.keyCode == 27) this.unsetEventListeners();
    if (this.shortcutKeys.isPressed(event, this.shortcutKeys.ctrl_X)) this.cut();
    if (this.shortcutKeys.isPressed(event, this.shortcutKeys.ctrl_C)) this.copy();
    if (this.shortcutKeys.isPressed(event, this.shortcutKeys.ctrl_V)) this.paste();
  };


  private onMousedown = () => {
    if (!this.overTable) this.unsetEventListeners();
  };







  setEventListeners() {
    if(!this.eventListenersSet) {
      this.eventListenersSet = true;
      window.addEventListener('keydown', this.onKeydown);
      window.addEventListener('mousedown', this.onMousedown);
    }
    this.removeFocus();
  }

  unsetEventListeners() {
    this.removeFocus();
    this.eventListenersSet = false;
    window.removeEventListener('keydown', this.onKeydown);
    window.removeEventListener('mousedown', this.onMousedown);
  }






  onColumnSelectorDown(columnIndex: number) {
    this.setEventListeners();
    this.selectedColumnIndex = columnIndex;
  }


  onRowSelectorDown(rowIndex: number) {
    this.setEventListeners();
    this.selectedRowIndex = rowIndex;
  }


  onPricePointDown(columnIndex: number) {
    this.setEventListeners();
    this.selectedPricePointIndex = columnIndex;
  }


  onPricePointClick() {
    alert("Price Point")
  }


  onContentTypeDown(rowIndex: number) {
    this.setEventListeners();
    this.contentType.selectedIndex = rowIndex;
  }

  onContentTypeClick() {
    this.contentType.product = this.product;
    this._FormService.showContentTypeForm = true;
    this._FormService.contentType = this.contentType;
  }


  onPricePointOptionDown(columnIndex: number, rowIndex: number) {
    this.setEventListeners();
    this.selectedPricePointOptionRowIndex = rowIndex;
    this.selectedPricePointOptionColumnIndex = columnIndex;
  }


  onPricePointOptionClick() {
    this.product.items[this.selectedPricePointOptionRowIndex].pricePointOptions[this.selectedPricePointOptionColumnIndex] = !this.product.items[this.selectedPricePointOptionRowIndex].pricePointOptions[this.selectedPricePointOptionColumnIndex];
  }



  







  removeFocus() {
    this.selectedRowIndex = null;
    this.selectedColumnIndex = null;
    this.showContentSubMenu = false;
    this.selectedPricePointIndex = null;
    this.selectedItemDescriptionIndex = null;
    this.selectedPricePointOptionRowIndex = null;
    this.selectedPricePointOptionColumnIndex = null;
    if(!this._FormService.showContentTypeForm) this.contentType.selectedIndex = null;
 }





 





  setPlaceholder(rowIndex: number, itemDescription: HTMLTableCellElement) {

    if (itemDescription.innerText.length == 0) {
      this.product.items[rowIndex].showPlaceholder = true;
    } else {
      this.product.items[rowIndex].showPlaceholder = false;
    }
  }


  


  


  



  

  


  setContentMenu(e: MouseEvent) {
    if (e.which == 3) {
      let selectorType: string;

      if(this.selectedColumnIndex != null) {
        selectorType = "Price Point";
      }else if(this.selectedRowIndex != null) {
        selectorType = "Item";
      }

      this.contentMenuLeft = ((e.clientX - this.productEditor.nativeElement.getBoundingClientRect().x) + 25);
      this.contentMenuTop = (e.clientY - this.productEditor.nativeElement.getBoundingClientRect().y) - (selectorType == "Price Point" ? 20 : 230);
      this.direction1 = selectorType == "Price Point" ? "Left" : "Above";
      this.direction2 = selectorType == "Price Point" ? "Right" : "Below";
      this.pasteEnabled = (selectorType == 'Price Point' && this.copied == 'Price Point') || (selectorType == 'Item' && this.copied == 'Item') ? true : false;
      this.deleteEnabled = (selectorType == 'Price Point' && this.product.items[0].pricePointOptions.length > 1) || (selectorType == 'Item' && this.product.items.length > 1) ? true : false;
      this.showContentMenu = true;
    }
  }

  onContentMenuFocus() {
    clearTimeout(this.contentMenuBlurTimeout);
  }

  onContentMenuBlur() {
    this.showContentMenu = false;


    this.contentMenuBlurTimeout = window.setTimeout(() => {

      this.showContentSubMenu = false;
      this.pasteSpecialOver = false;
    });

  }




  onPasteSpecialOptionOver() {
    this.pasteSpecialOver = true;

    this.pasteSpecialOptionOverTimeout = window.setTimeout(() => {
      if(this.selectedColumnIndex != null) {
        this.contentSubMenuWidth = 212;
      }else if(this.selectedRowIndex != null) {
        this.contentSubMenuWidth = 180;
      }

      this.showContentSubMenu = true;
    }, 300)
  }

  onPasteSpecialOptionOut() {
    this.pasteSpecialOver = false;

    clearTimeout(this.pasteSpecialOptionOverTimeout);
    this.pasteSpecialOptionOutTimeout = window.setTimeout(() => {

      this.showContentSubMenu = false;
    }, 250)
  }



  onContentSubMenuOver() {
    this.pasteSpecialOver = true;
    clearTimeout(this.pasteSpecialOptionOutTimeout);
  }



  onContentSubMenuFocus() {
    // Give focus back to the content menu
    this.showContentMenu = true;
    this.contentMenu.nativeElement.focus();
  }


  removeContentSubMenu() {
    this.showContentSubMenu = false;
    this.pasteSpecialOver = false;
  }


  cut() {
    this.copy();
    this.delete();
  }



  copy() {
    // If we're copying a price point
    if(this.selectedColumnIndex != null) {
      // Copy the price point value
      this.pricePointClipboard.pricePoint = this.product.pricePoints[this.selectedColumnIndex];
      // Reset the price point array
      this.pricePointClipboard.pricePointOptions = [];
      // Copy all the price point option values
      for (let i = 0; i < this.product.items.length; i++) {
        this.pricePointClipboard.pricePointOptions.push(this.product.items[i].pricePointOptions[this.selectedColumnIndex]);
      }
      this.copied = "Price Point";

      // If we're copying an Item
    }else if(this.selectedRowIndex != null) {

      // Copy the item's values
      this.itemClipboard.type = this.product.items[this.selectedRowIndex].type;
      this.itemClipboard.description = this.product.items[this.selectedRowIndex].description;
      this.itemClipboard.showPlaceholder = this.product.items[this.selectedRowIndex].showPlaceholder;
      // Reset the price point array
      this.itemClipboard.pricePointOptions = [];
      // Copy all the price point option values
      for (let i = 0; i < this.product.items[this.selectedRowIndex].pricePointOptions.length; i++) {
        this.itemClipboard.pricePointOptions.push(this.product.items[this.selectedRowIndex].pricePointOptions[i]);
      }
      this.copied = "Item";
    }
    this.showContentMenu = false;
  }


  paste() {
    // If we're pasting a price point
    if (this.selectedColumnIndex != null && this.copied == "Price Point") {
      // If the copied price point length is greater than the current price point length, then use the current price point length, otherwise, use the copied price point length
      let pricePointOptionsLength = this.pricePointClipboard.pricePointOptions.length > this.product.items.length ? this.product.items.length : this.pricePointClipboard.pricePointOptions.length;

      // Paste the price point value
      this.product.pricePoints[this.selectedColumnIndex] = this.pricePointClipboard.pricePoint;
      // Paste all the price point option values
      for (let i = 0; i < pricePointOptionsLength; i++) {
        this.product.items[i].pricePointOptions[this.selectedColumnIndex] = this.pricePointClipboard.pricePointOptions[i];
      }

      // If we're pasting an Item
    } else if (this.selectedRowIndex != null && this.copied == "Item") {

      // If the copied price point length is greater than the current price point length, then use the current price point length, otherwise, use the copied price point length
      let pricePointOptionsLength = this.itemClipboard.pricePointOptions.length > this.product.items[this.selectedRowIndex].pricePointOptions.length ? this.product.items[this.selectedRowIndex].pricePointOptions.length : this.itemClipboard.pricePointOptions.length;

      // Paste the item's values
      this.product.items[this.selectedRowIndex].type = this.itemClipboard.type;
      this.product.items[this.selectedRowIndex].description = this.itemClipboard.description;
      this.product.items[this.selectedRowIndex].showPlaceholder = this.itemClipboard.showPlaceholder;
      // Paste all the price point option values
      for (let i = 0; i < pricePointOptionsLength; i++) {
        this.product.items[this.selectedRowIndex].pricePointOptions[i] = this.itemClipboard.pricePointOptions[i];
      }
    }
    this.showContentMenu = false;
  }


  pasteSpecial(direction: string) {
    this.insert(direction);
    this.paste();
  }


  // Insert Price Point or Item
  insert(direction: string) {

    // If we're inserting a new Price Point
    if(this.selectedColumnIndex != null) {
      this.selectedColumnIndex = this.selectedColumnIndex + (direction == "Left" ? 0 : 1);

      // Add the new Price Point either to the left or right of the selected price point
      this.product.pricePoints.splice(this.selectedColumnIndex, 0, "$0.00");
      // Add the price point options to the new Price Point
      for (let i = 0; i < this.product.items.length; i++) {
        this.product.items[i].pricePointOptions.splice(this.selectedColumnIndex, 0, false);
      }

      // If we're inserting a new Item
    }else if(this.selectedRowIndex != null) {
      let pricePointOptionsCount = this.product.items[this.selectedRowIndex].pricePointOptions.length;
      this.selectedRowIndex = this.selectedRowIndex + (direction == "Above" ? 0 : 1);

      // Add the new Item either above or below the selected item
      this.product.items.splice(this.selectedRowIndex, 0, { type: "assets/no-content-type.png", description: "", showPlaceholder: true, pricePointOptions: [] });
      // Add the price point options to the new item
      for (let i = 0; i < pricePointOptionsCount; i++) {
        this.product.items[this.selectedRowIndex].pricePointOptions.push(false);
      }
    }
    this.showContentMenu = false;
  }


  delete() {
    // If we're deleting a Price Point
    if(this.selectedColumnIndex != null) {

      // Delete the Price Point at the specified index
      this.product.pricePoints.splice(this.selectedColumnIndex, 1);
      // And delete all the price point options from the deleted Price Point as well
      for (let i = 0; i < this.product.items.length; i++) {
        this.product.items[i].pricePointOptions.splice(this.selectedColumnIndex, 1);
      }

      // If we're deleting an Item
    }else if(this.selectedRowIndex != null) {

      // Delete the item at the specified index
      this.product.items.splice(this.selectedRowIndex, 1);
    }
    this.showContentMenu = false;
  }


  clearValues() {
    // If we're clearing a Price Point's values
    if(this.selectedColumnIndex != null) {

      // Set the price back to zero
      this.product.pricePoints[this.selectedColumnIndex] = "$0.00";

      // Set all the price point option values to false
      for (let i = 0; i < this.product.items.length; i++) {
        this.product.items[i].pricePointOptions[this.selectedColumnIndex] = false;
      }

      // If we're clearing an Item's values
    }else if(this.selectedRowIndex != null) {

      // Set the item's values back to the original default settings
      this.product.items[this.selectedRowIndex].type = "assets/no-content-type.png";
      this.product.items[this.selectedRowIndex].description = "";
      this.product.items[this.selectedRowIndex].showPlaceholder = true;

      // Set all the price point option values to false
      for (let i = 0; i < this.product.items[this.selectedRowIndex].pricePointOptions.length; i++) {
        this.product.items[this.selectedRowIndex].pricePointOptions[i] = false;
      }
    }
    this.showContentMenu = false;
  }


  enter() {
    if(this.contentType.selectedIndex != null) this.onContentTypeClick();
    if(this.selectedPricePointOptionRowIndex != null) this.onPricePointOptionClick();
    if(this.selectedPricePointIndex != null) this.onPricePointClick();
    if (this.selectedItemDescriptionIndex != null) {
      event.preventDefault();
      let item = this.itemDesc.find((item, index) => index == this.selectedItemDescriptionIndex);
      item.nativeElement.focus();
      
    }
  }


  arrowLeft() {

    // If we're on a column selector
    if (this.selectedColumnIndex != null) {
      if (this.selectedColumnIndex > 0) {
        this.selectedColumnIndex--;
      }
    }


    // If we're on a price point
    if (this.selectedPricePointIndex != null) {
      if (this.selectedPricePointIndex > 0) {
        this.selectedPricePointIndex--;
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

    // If we're leaving an item description and entering a content type
    if(this.selectedItemDescriptionIndex != null) {
      this.contentType.selectedIndex = this.selectedItemDescriptionIndex;
      this.selectedItemDescriptionIndex = null;
      return
    }

    // If we're leaving a content type and entering a row selector
    if(this.contentType.selectedIndex != null) {
      this.selectedRowIndex = this.contentType.selectedIndex;
      this.contentType.selectedIndex = null;
    }

  }

  arrowUp() {

    // If we're on a row selector
    if (this.selectedRowIndex != null) {
      if (this.selectedRowIndex > 0) {
        this.selectedRowIndex--;
      }
    }


    // If we're on a content type
    if (this.contentType.selectedIndex != null) {
      if (this.contentType.selectedIndex > 0) {
        this.contentType.selectedIndex--;
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
      this.selectedPricePointIndex = this.selectedPricePointOptionColumnIndex;
      this.selectedPricePointOptionRowIndex = null;
      return
    }

    // If we're leaving a price point and entering a column selector
    if (this.selectedPricePointIndex != null) {
      this.selectedColumnIndex = this.selectedPricePointIndex;
      this.selectedPricePointIndex = null;
    }

  }

  arrowRight() {

    // If we're on a column selector
    if (this.selectedColumnIndex != null) {
      if (this.selectedColumnIndex < this.product.pricePoints.length - 1) {
        this.selectedColumnIndex++;
      }
    }


    // If we're on a price point
    if (this.selectedPricePointIndex != null) {
      if (this.selectedPricePointIndex < this.product.pricePoints.length - 1) {
        this.selectedPricePointIndex++;
      }
    }


    // If we're leaving a row selector and entering a content type
    if (this.selectedRowIndex != null) {
      this.contentType.selectedIndex = this.selectedRowIndex;
      this.selectedRowIndex = null;
      return
    }


    // If we're leaving a content type and entering an item description
    if (this.contentType.selectedIndex != null) {
      this.selectedItemDescriptionIndex = this.contentType.selectedIndex;
      this.contentType.selectedIndex = null;
      return
    }


    // If we're leaving an item description and entering a price point option
    if(this.selectedItemDescriptionIndex != null) {
      this.selectedPricePointOptionRowIndex = this.selectedItemDescriptionIndex;
      this.selectedItemDescriptionIndex = null;
      this.selectedPricePointOptionColumnIndex = 0;
      return
    }


    // If we're on a price point option
    if (this.selectedPricePointOptionColumnIndex != null) {
      if (this.selectedPricePointOptionColumnIndex < this.product.pricePoints.length - 1) {
        this.selectedPricePointOptionColumnIndex++;
      }
    }
  }

  arrowDown() {

    // If we're on a row selector
    if (this.selectedRowIndex != null) {
      if (this.selectedRowIndex < this.product.items.length - 1) {
        this.selectedRowIndex++;
      }
    }

    // If we're on a content type
    if (this.contentType.selectedIndex != null) {
      if (this.contentType.selectedIndex < this.product.items.length - 1) {
        this.contentType.selectedIndex++;
      }
    }

    // If we're on an item description
    if (this.selectedItemDescriptionIndex != null) {
      if (this.selectedItemDescriptionIndex < this.product.items.length - 1) {
        this.selectedItemDescriptionIndex++;
      }
    }

    // If we're leaving a column selector and entering a price point
    if (this.selectedColumnIndex != null) {
      this.selectedPricePointIndex = this.selectedColumnIndex;
      this.selectedColumnIndex = null;
      return
    }

    // If we're leaving a price point and entering a price point option
    if (this.selectedPricePointIndex != null) {
      this.selectedPricePointOptionColumnIndex = this.selectedPricePointIndex;
      this.selectedPricePointIndex = null;
      this.selectedPricePointOptionRowIndex = 0;
      return
    }

    // If we're on a price point option
    if (this.selectedPricePointOptionRowIndex != null) {
      if (this.selectedPricePointOptionRowIndex < this.product.items.length - 1) {
        this.selectedPricePointOptionRowIndex++;
      }
    }
  }







}
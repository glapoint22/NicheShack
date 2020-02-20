import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss']
})
export class ProductEditorComponent implements OnInit {
  public showMenu: boolean;
  public product = { items: [], pricePoints: [] };
  public contentType = { index: null, product: null, selected: [] }
  public selectedColumnIndex: number;
  public selectedRowIndex: number;
  public selectedPricePointOptionColumnIndex: number;
  public selectedPricePointOptionRowIndex: number;
  public overTable: boolean = false;
  public contentMenuLeft: number;
  public contentMenuTop: number;
  public showContentMenu: boolean = false;
  public showContentSubMenu: boolean = false;
  public contentSubMenuWidth: number;
  public selectorType: string;
  public direction1: string;
  public direction2: string;
  private pasteSpecialOptionOverTimeout: number;
  public pasteSpecialOptionOutTimeout: number;
  public pasteSpecialOver: boolean = false;



  @ViewChild('productEditor', { static: false }) productEditor: ElementRef;

  constructor(public _FormService: FormService) { }

  ngOnInit() {

    // this.product.pricePoints.push("$0.00");
    // this.product.items.push({ type: "assets/no-content-type.png", description: "", pricePointOptions: [true], showPlaceholder: true });

    this.product.pricePoints.push("$49.99");
    this.product.pricePoints.push("$99.99");
    this.product.pricePoints.push("$149.99");
    this.product.pricePoints.push("$199.99");
    this.product.pricePoints.push("$249.99");


    this.product.items.push({ type: "images/pdf.png", description: "Gumpy's Ice Cream Machine Manual", pricePointOptions: [false, true, true, true, false], showPlaceholder: false });
    this.product.items.push({ type: "images/video.png", description: "Gumpy's Ice Cream Machine Quick Start Video Guide", pricePointOptions: [true, true, false, false, true], showPlaceholder: false });
    this.product.items.push({ type: "images/audio.png", description: "Gumpy's Ice Cream Machine Instructional Audio Guide", pricePointOptions: [false, false, true, true, false], showPlaceholder: false });
    this.product.items.push({ type: "images/software.png", description: "Gumpy's Ice Cream Machine Software", pricePointOptions: [true, true, true, true, true], showPlaceholder: false });
  }




  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    // If the escape key is pressed
    if (event.keyCode == 27 && !this._FormService.showContentTypeForm) {
      this.removeFocus();
    }
  }


  @HostListener('document:mousedown')
  onMousedown() {
    if (!this.overTable && !this._FormService.showContentTypeForm) {
      this.removeFocus();
    }
  }


  removeFocus() {
    this.selectedRowIndex = null;
    this.selectedColumnIndex = null;
    this.selectedPricePointOptionRowIndex = null;
    this.selectedPricePointOptionColumnIndex = null;
    this.contentType.selected[this.contentType.index] = false;
  }

  setPlaceholder(rowIndex: number, cell: HTMLTableCellElement) {
    
    if(cell.innerText.length == 0) {
      this.product.items[rowIndex].showPlaceholder = true;
    }else {
      this.product.items[rowIndex].showPlaceholder = false;
    }
  }


  onPricePointOptionDown(columnIndex: number, rowIndex: number) {
    this.removeFocus();
    this.selectedPricePointOptionRowIndex = rowIndex;
    this.selectedPricePointOptionColumnIndex = columnIndex;
  }


  onPricePointOptionClick(columnIndex: number, rowIndex: number) {
    this.product.items[rowIndex].pricePointOptions[columnIndex] = !this.product.items[rowIndex].pricePointOptions[columnIndex];
  }


  onColumnSelectorDown(columnIndex: number) {
    this.removeFocus();
    this.selectedColumnIndex = columnIndex;
  }

  

  onRowSelectorDown(rowIndex: number) {
    this.removeFocus();
    this.selectedRowIndex = rowIndex;
  }

  onContentTypeDown(rowIndex: number) {
    this.removeFocus();
    this.contentType.index = rowIndex;
    this.contentType.selected[rowIndex] = true;
  }

  onContentTypeClick() {
    this.contentType.product = this.product;
    this._FormService.showContentTypeForm = true;
    this._FormService.contentType = this.contentType;
  }


  setContentMenu(e: MouseEvent, selectorType: string) {
    if(e.which == 3) {
      this.contentMenuLeft = ((e.clientX - this.productEditor.nativeElement.getBoundingClientRect().x) + 25);
      this.contentMenuTop = ((e.clientY - this.productEditor.nativeElement.getBoundingClientRect().y) - (selectorType == "Price Point" ? 20 : 200));
      this.direction1 = selectorType == "Price Point" ? "Left" : "Above";
      this.direction2 = selectorType == "Price Point" ? "Right" : "Below";
      this.selectorType = selectorType;
      this.showContentMenu = true;
    }
  }

  pasteSpecialOptionOver() {
    this.pasteSpecialOver = true;

    this.pasteSpecialOptionOverTimeout = window.setTimeout(()=> {
      if(this.selectorType == "Price Point") {
        this.contentSubMenuWidth = 250;
      }else {
        this.contentSubMenuWidth = 200;
      }

      this.showContentSubMenu = true;
    },300)
  }

  pasteSpecialOptionOut() {
    this.pasteSpecialOver = false;
    
    
    clearTimeout(this.pasteSpecialOptionOverTimeout);
    this.pasteSpecialOptionOutTimeout = window.setTimeout(()=> {
      
      this.showContentSubMenu = false;
    },250)
  }



  fuckyou() {
    clearTimeout(this.pasteSpecialOptionOutTimeout);
  }

  // Insert Price Point or Item
  insert(direction: string) {

    // If we're inserting a new Price Point
    if(this.selectorType == "Price Point") {
      this.selectedColumnIndex = this.selectedColumnIndex + (direction == "Left" ? 0 : 1);

      // Add the new Price Point either to the left or right of the selected price point
      this.product.pricePoints.splice(this.selectedColumnIndex, 0, "$0.00");
      // Add the price point options to the new Price Point
      for(let i = 0; i < this.product.items.length; i++) {
        this.product.items[i].pricePointOptions.splice(this.selectedColumnIndex, 0, false);
      }

    // If we're inserting a new Item
    }else {
      let pricePointOptionsCount = this.product.items[this.selectedRowIndex].pricePointOptions.length;
      this.selectedRowIndex = this.selectedRowIndex + (direction == "Above" ? 0 : 1);
      
      // Add the new Item either above or below the selected item
      this.product.items.splice(this.selectedRowIndex, 0, { type: "assets/no-content-type.png", description: "", pricePointOptions: [], showPlaceholder: true});
      // Add the price point options to the new item
      for(let i = 0; i < pricePointOptionsCount; i++) {
        this.product.items[this.selectedRowIndex].pricePointOptions.push(false);
      }
    }
    this.showContentMenu = false;
  }


  delete() {
    // If we're deleting a Price Point
    if(this.selectorType == "Price Point") {

      // Delete the Price Point at the specified index
      this.product.pricePoints.splice(this.selectedColumnIndex, 1);
      // And delete all the price point options from the deleted Price Point as well
      for(let i = 0; i < this.product.items.length; i++) {
        this.product.items[i].pricePointOptions.splice(this.selectedColumnIndex, 1);
      }

    // If we're deleting an Item
    }else {
      
      // Delete the item at the specified index
      this.product.items.splice(this.selectedRowIndex, 1);
    }
    this.showContentMenu = false;
  }
 

  clearValues() {
    // If we're clearing a Price Point's values
    if(this.selectorType == "Price Point") {

      // Set the price back to zero
      this.product.pricePoints[this.selectedColumnIndex] = "$0.00";

      // Set all the price point option values to false
      for(let i = 0; i < this.product.items.length; i++) {
        this.product.items[i].pricePointOptions[this.selectedColumnIndex] = false;
      }

  // If we're clearing an Item's values
  }else {

    // Set the item's values back to the original default settings
    this.product.items[this.selectedRowIndex].type = "assets/no-content-type.png";
    this.product.items[this.selectedRowIndex].description = "";
    this.product.items[this.selectedRowIndex].showPlaceholder = true;

    // Set all the price point option values to false
    for(let i = 0; i < this.product.items[this.selectedRowIndex].pricePointOptions.length; i++) {
      this.product.items[this.selectedRowIndex].pricePointOptions[i] = false;
    }
  }
    this.showContentMenu = false;
  }







}
import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
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
  public selectedColumn;
  public selectedRow;
  public selectedPricePointOptionColumn;
  public selectedPricePointOptionRow;
  public overTable: boolean = false;

   


  @ViewChild('table', { static: false }) table: ElementRef;
  constructor(public _FormService: FormService) { }

  ngOnInit() {
    this.product.pricePoints.push("$49.99");
    this.product.pricePoints.push("$99.99");
    this.product.pricePoints.push("$149.99");
    this.product.pricePoints.push("$199.99");
    this.product.pricePoints.push("$249.99");


    this.product.items.push({ type: "images/pdf.png", description: "Gumpy's Ice Cream Machine Manual", pricePointOptions: [false, true, true, true, false] });
    this.product.items.push({ type: "images/video.png", description: "Gumpy's Ice Cream Machine Quick Start Video Guide", pricePointOptions: [true, true, false, false, true] });
    this.product.items.push({ type: "images/audio.png", description: "Gumpy's Ice Cream Machine Instructional Audio Guide", pricePointOptions: [false, false, true, true, false] });
    this.product.items.push({ type: "images/software.png", description: "Gumpy's Ice Cream Machine Software", pricePointOptions: [true, true, true, true, true] });
  }

 
 


  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    // If the escape key is pressed
    if (event.keyCode == 27) {
      this.removeFocus();
    }
  }


  @HostListener('document:mousedown')
  onMousedown() {
    if(!this.overTable) {
      this.removeFocus();
    }
  }


  removeFocus() {
    this.selectedRow = null;
    this.selectedColumn = null;
    this.selectedPricePointOptionRow = null;
    this.selectedPricePointOptionColumn = null;
  }



  togglePricePointOption(column, row) {
    this.removeFocus();
    this.selectedPricePointOptionRow = row;
    this.selectedPricePointOptionColumn = column;
    this.product.items[row].pricePointOptions[column] = !this.product.items[row].pricePointOptions[column];
  }


  onColumnSelectorClick(index) {
    this.removeFocus();
    this.selectedColumn = index;
  }

  onRowSelectorClick(index) {
    this.removeFocus();
    this.selectedRow = index;
  }

  

  showContentTypeForm(i) {
    this.removeFocus();
    this.contentType.index = i;
    this.contentType.product = this.product;
    this.contentType.selected[i] = true;
    this._FormService.contentType = this.contentType;
    this._FormService.showContentTypeForm = true;
  }
}

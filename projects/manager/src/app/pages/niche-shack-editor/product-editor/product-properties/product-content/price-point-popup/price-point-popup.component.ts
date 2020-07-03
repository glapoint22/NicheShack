import { Component, ViewChildren, ElementRef, QueryList, OnInit } from '@angular/core';
import { PopupComponent } from 'projects/manager/src/app/shared-components/popups/popup/popup.component';
import { ProductPricePoint } from 'projects/manager/src/app/classes/product-price-point';
import { Item } from 'projects/manager/src/app/classes/item';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { CoverService } from 'projects/manager/src/app/services/cover.service';
import { MenuService } from 'projects/manager/src/app/services/menu.service';
import { ProductService } from 'projects/manager/src/app/services/product.service';
import { DropdownMenuService } from 'projects/manager/src/app/services/dropdown-menu.service';
import { TempDataService } from 'projects/manager/src/app/services/temp-data.service';

@Component({
  selector: 'price-point-popup',
  templateUrl: './price-point-popup.component.html',
  styleUrls: ['../../../../../../shared-components/popups/popup/popup.component.scss', './price-point-popup.component.scss']
})
export class PricePointPopupComponent extends PopupComponent implements OnInit {
  @ViewChildren('txtInput') txtInput: QueryList<ElementRef>;
  public pricePoint: ProductPricePoint;
  public pricePointListItem: Item;


  constructor(popupService: PopupService, cover: CoverService, menuService: MenuService, dropdownMenuService: DropdownMenuService, dataService: TempDataService, private productService: ProductService) { super(popupService, cover, menuService, dropdownMenuService, dataService) }


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.pricePointPopup = this;
    this.preventNoShow = true;
  }


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    window.addEventListener('keydown', this.onKeydown);
  }


  // -----------------------------( ON KEY DOWN )------------------------------ \\
  private onKeydown = (event: KeyboardEvent) => {
    if (event.keyCode === 13) this.show = false;
    if (event.keyCode === 27) this.blurInput();
    if (event.keyCode === 9 && !event.shiftKey) this.tab();
    if (event.shiftKey && event.keyCode === 9) this.shiftTab();
  }


  // -----------------------------( NUMBERS ONLY )------------------------------ \\
  numbersOnly(index: number) {
    let txtInput = this.txtInput.toArray();
    !(/^[0-9]*$/i).test(txtInput[index].nativeElement.value) ? txtInput[index].nativeElement.value = txtInput[index].nativeElement.value.replace(/[^0-9]/ig, '') : null;
    if (index == 1) this.pricePoint.wholeNumber = this.pricePoint.wholeNumber ? parseInt(txtInput[index].nativeElement.value) : 0;
    if (index == 2) this.pricePoint.decimal = this.pricePoint.decimal ? parseInt(txtInput[index].nativeElement.value) : 0;

    this.productService.setPrice();
  }


  // -----------------------------( TAB )------------------------------ \\
  tab() {
    event.preventDefault();
    let txtInputHasFocus = false;
    let txtInput = this.txtInput.toArray();

    for (let i = 0; i < txtInput.length; i++) {
      if (txtInput[i].nativeElement == document.activeElement) {
        let index = i == txtInput.length - 1 ? 0 : i + 1;
        txtInput[index].nativeElement.select();
        txtInputHasFocus = true;
        break;
      }
    }
    if (!txtInputHasFocus) txtInput[0].nativeElement.select();
  }


  // -----------------------------( SHIFT TAB )------------------------------ \\
  shiftTab() {
    event.preventDefault();
    let txtInputHasFocus = false;
    let txtInput = this.txtInput.toArray();

    for (let i = 0; i < txtInput.length; i++) {
      if (txtInput[i].nativeElement == document.activeElement) {
        let index = i == 0 ? txtInput.length - 1 : i - 1;
        txtInput[index].nativeElement.select();
        txtInputHasFocus = true;
        break;
      }
    }
    if (!txtInputHasFocus) txtInput[txtInput.length - 1].nativeElement.select();
  }


  // -----------------------------( BLUR INPUT )------------------------------ \\
  blurInput() {
    let txtInput = this.txtInput.toArray();
    for (let i = 0; i < txtInput.length; i++) {
      txtInput[i].nativeElement.blur();
    }
  }



  // -----------------------------( SET PRICE POINT LIST ITEM )------------------------------ \\
  setPricePointListItem() {
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    this.pricePointListItem.name = this.pricePoint.textBefore +
      ' ' +
      formatter.format(parseFloat((this.pricePoint.wholeNumber ? this.pricePoint.wholeNumber : 0) + '.' +
        (this.pricePoint.decimal ? this.pricePoint.decimal : 0))) +
      ' ' +
      this.pricePoint.textAfter;
  }
}
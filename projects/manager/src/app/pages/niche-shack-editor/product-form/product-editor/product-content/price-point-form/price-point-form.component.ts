import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'price-point-form',
  templateUrl: './price-point-form.component.html',
  styleUrls: ['./price-point-form.component.scss']
})
export class PricePointFormComponent {
  public decimal: string;
  public textAfter: string;
  public textBefore: string;
  public wholeNumber: string;
  constructor(public _FormService: FormService) { }
  @ViewChildren('txtInput') txtInput: QueryList<ElementRef>;



  // -----------------------------( ON KEY DOWN )------------------------------ \\
  private onKeydown = (event: KeyboardEvent) => {
    if (event.keyCode === 13) this.blurInput();
    if (event.keyCode === 27) this.blurInput();
    if (event.keyCode === 9 && !event.shiftKey) this.tab();
    if (event.shiftKey && event.keyCode === 9) this.shiftTab();
  }



  // -----------------------------( ON FORM OPEN )------------------------------ \\
  onFormOpen() {
    this.decimal = this._FormService.productContent.pricePoints[this._FormService.productContent.selectedPricePointIndex].decimal;
    this.textAfter = this._FormService.productContent.pricePoints[this._FormService.productContent.selectedPricePointIndex].textAfter;
    this.textBefore = this._FormService.productContent.pricePoints[this._FormService.productContent.selectedPricePointIndex].textBefore;
    this.wholeNumber = this._FormService.productContent.pricePoints[this._FormService.productContent.selectedPricePointIndex].wholeNumber;
    window.addEventListener('keydown', this.onKeydown);
  }


  
  // -----------------------------( ON OK )------------------------------ \\
  onOk() {
    this._FormService.showPricePointForm = false;
    this._FormService.productContent.pricePoints[this._FormService.productContent.selectedPricePointIndex].decimal = this.decimal;
    this._FormService.productContent.pricePoints[this._FormService.productContent.selectedPricePointIndex].wholeNumber = this.wholeNumber;
    this._FormService.productContent.pricePoints[this._FormService.productContent.selectedPricePointIndex].textAfter = this.textAfter.trim();
    this._FormService.productContent.pricePoints[this._FormService.productContent.selectedPricePointIndex].textBefore = this.textBefore.trim();
    window.removeEventListener('keydown', this.onKeydown);
    this._FormService.productContent.lastFocusedElement.focus();
  }


  // -----------------------------( ON CANCEL )------------------------------ \\
  onCancel() {
    this._FormService.showPricePointForm = false;
    window.removeEventListener('keydown', this.onKeydown);
    this._FormService.productContent.lastFocusedElement.focus();
  }


  // -----------------------------( NUMBERS ONLY )------------------------------ \\
  numbersOnly(index: number) {
    let txtInput = this.txtInput.toArray();
    !(/^[0-9]*$/i).test(txtInput[index].nativeElement.value) ? txtInput[index].nativeElement.value = txtInput[index].nativeElement.value.replace(/[^0-9]/ig, '') : null;
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
}
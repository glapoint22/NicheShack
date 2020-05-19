import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { PopupComponent } from 'projects/manager/src/app/shared-components/popups/popup/popup.component';

@Component({
  selector: 'price-point-popup',
  templateUrl: './price-point-popup.component.html',
  styleUrls: ['./price-point-popup.component.scss', '../../../../../../shared-components/popups/popup/popup.component.scss']
})
export class PricePointPopupComponent extends PopupComponent {
  @ViewChildren('txtInput') txtInput: QueryList<ElementRef>;


  // -----------------------------( ON POPUP SHOW )------------------------------ \\
  onPopupShow(popup, arrow) {
    super.onPopupShow(popup, arrow);
    window.addEventListener('keydown', this.onKeydown);
  }


  // -----------------------------( ON KEY DOWN )------------------------------ \\
  private onKeydown = (event: KeyboardEvent) => {
    if (event.keyCode === 13) this.blurInput();
    if (event.keyCode === 27) this.blurInput();
    if (event.keyCode === 9 && !event.shiftKey) this.tab();
    if (event.shiftKey && event.keyCode === 9) this.shiftTab();
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
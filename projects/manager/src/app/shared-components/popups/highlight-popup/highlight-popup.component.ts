import { Component, OnInit } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';
import { Color } from '../../../../../../../classes/color';
import { Description } from '../../../classes/description';

@Component({
  selector: 'highlight-popup',
  templateUrl: './highlight-popup.component.html',
  styleUrls: ['../popup/popup.component.scss', './highlight-popup.component.scss']
})
export class HighlightPopupComponent extends PopupComponent implements OnInit {
  public color: Color;
  public description: Description;


  // --------------------------------( NG ON INIT )-------------------------------- \\
  ngOnInit() {
    this.popupService.highlightPopup = this;
  }


  // -------------------------------------------------------------- On Option Click -----------------------------------------------------------
  onOptionClick(changeColor: boolean) {
    // Click of one of the options (remove color / change color)
    if (changeColor) {
      this.popupService.highlightPopup.show = false;
      this.popupService.colorPickerPopup.color = this.color;
      this.popupService.colorPickerPopup.show = true;
      this.description.highlightColor.onColorPickerOpen();
    } else {
      this.description.highlightColor.removeColor();
      this.popupService.highlightPopup.show = false;
    }
  }
}
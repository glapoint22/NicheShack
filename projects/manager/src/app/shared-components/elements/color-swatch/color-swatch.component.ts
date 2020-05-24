import { Component, Input } from '@angular/core';
import { Color } from '../../../classes/color';
import { PopupService } from '../../../services/popup.service';

@Component({
  selector: 'color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.scss']
})

export class ColorSwatchComponent{
  constructor(public popupService: PopupService) {}
  @Input() color: Color;

  
  onClick(sourceElement: HTMLElement) {
    this.popupService.colorPickerPopup.color = this.color;
    this.popupService.sourceElement = sourceElement;
    this.popupService.colorPickerPopup.show = !this.popupService.colorPickerPopup.show;
  }
}
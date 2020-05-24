import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Color } from '../../../classes/color';
import { PopupService } from '../../../services/popup.service';
import { ColorPickerPopupComponent } from '../../popups/color-picker-popup/color-picker-popup.component';

@Component({
  selector: 'color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.scss']
})

export class ColorSwatchComponent implements OnInit {
  @Input() color: Color;
  @Output() onColorPickerOpen: EventEmitter<void> = new EventEmitter();
  @Output() onInit: EventEmitter<ColorPickerPopupComponent> = new EventEmitter();

  constructor(public popupService: PopupService) { }
  

  ngOnInit() {
    this.onInit.emit(this.popupService.colorPickerPopup);
  }


  onClick(sourceElement: HTMLElement) {
    this.popupService.colorPickerPopup.color = this.color;
    this.popupService.sourceElement = sourceElement;
    this.popupService.colorPickerPopup.show = !this.popupService.colorPickerPopup.show;
    this.onColorPickerOpen.emit();
  }
}
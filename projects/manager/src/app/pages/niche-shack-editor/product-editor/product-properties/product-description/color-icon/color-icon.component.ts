import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ColorSwatchComponent } from '../../../../../../shared-components/elements/color-swatch/color-swatch.component';
import { Color } from '../../../../../../classes/color';
import { ColorPickerPopupComponent } from 'projects/manager/src/app/shared-components/popups/color-picker-popup/color-picker-popup.component';

@Component({
  selector: 'color-icon',
  templateUrl: './color-icon.component.html',
  styleUrls: ['./color-icon.component.scss']
})
export class ColorIconComponent extends ColorSwatchComponent implements OnInit {
  @Input() icon: string;
  @Input() title: string;
  @Input() removable: string;
  @Output() onRemoveColor: EventEmitter<void> = new EventEmitter();
  @Output() onInit: EventEmitter<ColorPickerPopupComponent> = new EventEmitter();
  @Output() onColorPickerOpen: EventEmitter<void> = new EventEmitter();
  public showRemoveChange: boolean;

  ngOnInit() {
    this.onInit.emit(this.popupService.colorPickerPopup);
  }

  // Click of the icon
  onClick(sourceElement: HTMLElement) {
    if (this.removable && !this.color.isEqual(Color.zero)) {
      // Show the remove/change options
      this.showRemoveChange = true;
    } else {
      // This will open up the color picker
      this.onColorPickerOpen.emit();
      super.onClick(sourceElement);
    }
  }

  // Click of one of the options (remove color / change color)
  onOptionClick(changeColor: boolean, sourceElement: HTMLElement) {
    if (changeColor) {
      super.onClick(sourceElement);
    } else {
      this.onRemoveColor.emit();
    }

    this.showRemoveChange = false;
  }
}
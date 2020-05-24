import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ColorSwatchComponent } from '../../../../../../shared-components/elements/color-swatch/color-swatch.component';
import { Color } from '../../../../../../classes/color';

@Component({
  selector: 'color-icon',
  templateUrl: './color-icon.component.html',
  styleUrls: ['./color-icon.component.scss']
})
export class ColorIconComponent extends ColorSwatchComponent {
  @Input() icon: string;
  @Input() title: string;
  @Input() removable: string;
  @Output() onRemoveColor: EventEmitter<void> = new EventEmitter();
  public showRemoveChange: boolean;


  // ---------------------------------------------------------------- On Click --------------------------------------------------------------
  onClick(sourceElement: HTMLElement) {
    if (this.removable && !this.color.isEqual(Color.zero)) {
      // Show the remove/change options
      this.showRemoveChange = true;
    } else {
      // This will open up the color picker
      super.onClick(sourceElement);
    }
  }

  



  // -------------------------------------------------------------- On Option Click -----------------------------------------------------------
  onOptionClick(changeColor: boolean, sourceElement: HTMLElement) {
    // Click of one of the options (remove color / change color)
    if (changeColor) {
      super.onClick(sourceElement);
    } else {
      this.onRemoveColor.emit();
    }

    this.showRemoveChange = false;
  }
}
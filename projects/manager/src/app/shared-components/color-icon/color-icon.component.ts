import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ColorSwatchComponent } from '../color-swatch/color-swatch.component';
import { Color } from '../../classes/color';

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

  // Click of the icon
  onClick() {
    if (this.removable && !this.color.isEqual(Color.zero)) {
      // Show the remove/change options
      this.showRemoveChange = true;
    } else {
      // This will open up the color picker
      super.onClick();
    }
  }

  // Click of one of the options (remove color / change color)
  onOptionClick(changeColor: boolean) {
    if (changeColor) {
      super.onClick();
    } else {
      this.onRemoveColor.emit();
    }

    this.showRemoveChange = false;
  }
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Color } from '../../../classes/color';

@Component({
  selector: 'color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.scss']
})

export class ColorSwatchComponent {
  @Input() color: Color;
  @Output() onShowColorPicker: EventEmitter<void> = new EventEmitter();

  
  
  
  onClick() {
    // this._FormService.colorPicker = this.color;
    // this._FormService.showColorPicker = true;
    this.onShowColorPicker.emit();
  }
}
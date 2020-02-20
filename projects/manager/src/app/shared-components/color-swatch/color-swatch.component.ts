import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormService } from '../../services/form.service'
import { Color } from '../../classes/color';

@Component({
  selector: 'color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.scss']
})

export class ColorSwatchComponent {
  @Input() color: Color;
  @Output() onShowColorPicker: EventEmitter<void> = new EventEmitter();
  public colorPicker: Color = new Color();

  constructor(public _FormService: FormService) {}
  
  
  onClick() {
    this.colorPicker = this.color;
    this._FormService.colorPicker = this.colorPicker;
    this._FormService.showColorPicker = true;
    this.onShowColorPicker.emit();
  }
}
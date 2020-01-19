import { Component, Input } from '@angular/core';
import { FormService } from '../../services/form.service'

@Component({
  selector: 'color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.scss']
})

export class ColorSwatchComponent {
  constructor(public _FormService: FormService) {}
  @Input()
  color: any;
  
  onClick() {
    this._FormService.colorPickerColor = this.color;
    this._FormService.openColorPicker = true
  }
}

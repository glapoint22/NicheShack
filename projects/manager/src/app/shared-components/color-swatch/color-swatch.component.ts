import { Component } from '@angular/core';
import { FormService } from '../../services/form.service'

@Component({
  selector: 'color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.scss']
})

export class ColorSwatchComponent {
  public rgba = this._FormService.rgba;
  constructor(public _FormService: FormService) {}
  
  onClick() {
    this._FormService.showColorPicker = true
  }
}

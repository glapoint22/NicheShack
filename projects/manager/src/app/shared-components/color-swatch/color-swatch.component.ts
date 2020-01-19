import { Component, Input } from '@angular/core';
import { FormService } from '../../services/form.service'

@Component({
  selector: 'color-swatch',
  templateUrl: './color-swatch.component.html',
  styleUrls: ['./color-swatch.component.scss']
})

export class ColorSwatchComponent {
  constructor(public _FormService: FormService) {}
  public colorPicker: any = {open: false, color: null}
  @Input()
  color: any;
  
  onClick() {
    this._FormService.colorPicker = this.colorPicker;
    this.colorPicker.color = this.color;
    this.colorPicker.open = true;
  }
}
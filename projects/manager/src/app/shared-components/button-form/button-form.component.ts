import { Component, OnInit } from '@angular/core';
import { FormService } from '../../services/form.service'

@Component({
  selector: 'button-form',
  templateUrl: './button-form.component.html',
  styleUrls: ['./button-form.component.scss']
})
export class ButtonFormComponent {
  public showNormal: boolean = true;
  public showNormalVerticalTab: boolean[] = [true, false, false, false, false, false, false];
  public showHoverVerticalTab: boolean[] = [true, false, false];

  constructor(public _FormService: FormService) {


  }

  onShow() {
    this._FormService.rgba = this._FormService.fillColor;
  }

  selectNormalVerticalTab(index: number) {

    this._FormService.showColorPicker = false;

    for(var i = 0; i < 7; i++) {
      this.showNormalVerticalTab[i] = false;
    }
    this.showNormalVerticalTab[index] = true;

    if(index == 0)  {
      this._FormService.rgba = this._FormService.fillColor;
    }

    if(index == 1) {
      this._FormService.rgba = this._FormService.borderColor;
    }

    if(index == 3) {
      this._FormService.rgba = this._FormService.textColor;
    }

    if(index == 4) {
      this._FormService.rgba = this._FormService.shadowColor;
    }
  }


  selectHoverVerticalTab(index: number) {
    for(var i = 0; i < 3; i++) {
      this.showHoverVerticalTab[i] = false;
    }
    this.showHoverVerticalTab[index] = true;
  }
}

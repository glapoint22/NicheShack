import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public colorPickerColor: any;
  public currentcolorPickerColor: any = {r: 0, g: 0, b: 0, a: 0};
  public showColorPicker: boolean;
  public showButtonEditForm: boolean;
  public buttonNormalTabSelected: boolean = true;
  public fillColor: any;
  public borderColor: any;
  public textColor: any;
  public shadowColor: any;
  public hoverFillColor: any;
  public hoverBorderColor: any;
  public hoverTextColor: any;
}
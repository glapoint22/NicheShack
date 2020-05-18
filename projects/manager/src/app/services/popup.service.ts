import { Injectable } from '@angular/core';
import { Color } from '../classes/color';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public colorPickerColor: Color;
  public showColorPicker: boolean;
  public sourceElement;
}

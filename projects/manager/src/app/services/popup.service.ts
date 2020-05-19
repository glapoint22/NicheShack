import { Injectable } from '@angular/core';
import { Color } from '../classes/color';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public sourceElement;
  public colorPickerColor: Color;
  public showPricePointPopup: boolean;
  public showColorPickerPopup: boolean;
  public showHierarchyPopup: boolean;
}
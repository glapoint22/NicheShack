import { Injectable } from '@angular/core';
import { Color } from '../classes/color';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public sourceElement: HTMLElement;
  public colorPickerColor: Color;
  public showPricePointPopup: boolean = false;
  public showColorPickerPopup: boolean = false;
  public showHierarchyPopup: boolean = false;
}
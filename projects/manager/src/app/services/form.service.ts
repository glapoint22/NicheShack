import { Injectable } from '@angular/core';
import { FillColor } from '../classes/fill-color';
import { Border } from '../classes/border';
import { Corners } from '../classes/corners';
import { ButtonText } from '../classes/button-text';
import { Shadow } from '../classes/shadow';
import { Spacing } from '../classes/spacing';
import { HoverTab } from '../classes/hover-tab';
import { Color } from '../classes/color';
import { Alignment } from '../classes/alignment';
import { TextBox } from '../classes/text-box';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public fill: FillColor;
  public border: Border;
  public corners: Corners;
  public buttonText: ButtonText;
  public shadow: Shadow;
  public margins: Spacing;
  public padding: Spacing;
  public textBox: TextBox;
  public alignment: Alignment
  public showContentTypeForm: boolean;

  // Color Picker
  public onColorPickerClose = new Subject<void>();
  private _showColorPicker : boolean;
  
  
  public get showColorPicker() : boolean {
    return this._showColorPicker;
  }
  public set showColorPicker(v : boolean) {
    if(!v) this.onColorPickerClose.next();
    this._showColorPicker = v;
  }


  
  public colorPicker: Color;
  public showButtonForm: boolean;
  public buttonFormHoverTab: HoverTab;
  public showTextForm: boolean;
  public showImageForm: boolean;
  public showContainerForm: boolean;
  public showLineForm: boolean;
  public showVideoForm: boolean;
  public showRowForm: boolean;
  public contentType;
  public initialFill: FillColor = new FillColor();
  public initialBorder: Border = new Border();
  public initialCorners: Corners = new Corners();
  public initialButtonText: ButtonText = new ButtonText();
  public initialShadow: Shadow = new Shadow();
  public initialMargins: Spacing = new Spacing();
  public initialPadding: Spacing = new Spacing();
  public initialAlignment: Alignment = new Alignment();
  public initialColorPickerColor: Color = new Color();
}
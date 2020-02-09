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
  
// public align: Align;
  public text: any;
  public alignment: Alignment

  public showColorPicker: boolean;
  public colorPicker: Color;
  public showButtonForm: boolean;
  public buttonFormHoverTab: HoverTab;
  public showTextForm: boolean;
  public showImageForm: boolean;
  public showContainerForm: boolean;
  public showLineForm: boolean;
  public showVideoForm: boolean;
  public showRowForm: boolean;
  
  public initialFill: FillColor = new FillColor();
  public initialBorder: Border = new Border();
  public initialCorners: Corners = new Corners();
  public initialButtonText: ButtonText = new ButtonText();
  public initialShadow: Shadow = new Shadow();
  public initialMargins: Spacing = new Spacing();
  public initialPadding: Spacing = new Spacing();
  public initialAlignment: Alignment = new Alignment();
  public initialColorPickerColor: Color = new Color();

  // ----------------------------------------------------( RGBA TO HEXA )--------------------------------------------------\\
  RGBAToHexA(r,g,b,a) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;
  
    return "#" + r + g + b + a;
  }

  closeColorPicker() {
    // As long as the color picker has been established
    if(this.colorPicker != null) {
      // If the color Picker form is open
      if(this.showColorPicker) {
        // Close the the Color Picker form and reset any color changes made back to the original color
        this.showColorPicker = false;
        this.colorPicker.r = this.initialColorPickerColor.r;
        this.colorPicker.g = this.initialColorPickerColor.g;
        this.colorPicker.b = this.initialColorPickerColor.b;
        this.colorPicker.a = this.initialColorPickerColor.a;
      }
    }
  }
}
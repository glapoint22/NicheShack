import { Injectable } from '@angular/core';
import { FillColor } from '../classes/fill-color';
import { Border } from '../classes/border';
import { Corners } from '../classes/corners';
import { ButtonText } from '../classes/button-text';
import { Shadow } from '../classes/shadow';
import { Margins } from '../classes/margins';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public fill: FillColor;
  public border: Border;
  public corners: Corners;
  public buttonText: ButtonText;
  public shadow: Shadow;
  public margins: Margins;
  public padding: any;
  public align: any;

  public buttonForm: any;
  public textForm: any;
  public imageForm: any;
  public containerForm: any;
  public lineForm: any;
  public videoForm: any;
  public rowForm: any;
  public colorPicker: any;
  
  public initialFill: FillColor = new FillColor();
  public initialBorder: Border = new Border();
  public initialCorners: Corners = new Corners();
  public initialButtonText: ButtonText = new ButtonText();
  public initialShadow: Shadow = new Shadow();
  public initialMargins: Margins = new Margins();
  public initialPadding: any = {top: 0, right: 0, bottom: 0, left: 0};
  public initialAlign: any = {horizontal: "", vertical: ""};
  public initialColorPickerColor: any = {r: 0, g: 0, b: 0, a: 0};

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
      if(this.colorPicker.open) {
        // Close the the Color Picker form and reset any color changes made back to the original color
        this.colorPicker.open = false;
        this.colorPicker.color.r = this.initialColorPickerColor.r;
        this.colorPicker.color.g = this.initialColorPickerColor.g;
        this.colorPicker.color.b = this.initialColorPickerColor.b;
        this.colorPicker.color.a = this.initialColorPickerColor.a;
      }
    }
  }
}
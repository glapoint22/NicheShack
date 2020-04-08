import { Injectable } from '@angular/core';
import { FillColor } from '../classes/fill-color';
import { Border } from '../classes/border';
import { Corners } from '../classes/corners';
import { ButtonText } from '../classes/button-text';
import { Shadow } from '../classes/shadow';
// import { Spacing } from '../classes/spacing';
import { HoverTab } from '../classes/hover-tab';
import { Color } from '../classes/color';
import { VerticalAlignment } from '../classes/vertical-alignment';
import { TextBox } from '../classes/text-box';
import { Subject } from 'rxjs';
import { ProductContent } from '../classes/product-content';
import { Description } from '../classes/description';
import { HorizontalAlignment } from '../classes/horizontal-alignment';
import { LinkSource } from '../classes/link-source';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  public fill: FillColor;
  public border: Border;
  public corners: Corners;
  public buttonText: ButtonText;
  public shadow: Shadow;
  // public margins: Spacing;
  // public padding: Spacing;
  public textBox: TextBox;
  public description: Description;
  public linkSource: LinkSource;
  public horizontalAlignment: HorizontalAlignment;
  public verticalAlignment: VerticalAlignment
  public productContent: ProductContent;
  public showMediaForm: boolean;
  public showPricePointForm: boolean;
  public showButtonForm: boolean;
  public buttonFormHoverTab: HoverTab;
  public showTextForm: boolean;
  public showImageForm: boolean;
  public showContainerForm: boolean;
  public showLineForm: boolean;
  public showVideoForm: boolean;
  public showRowForm: boolean;
  public showLinkForm: boolean;
  public initialFill: FillColor = new FillColor();
  public initialBorder: Border = new Border();
  public initialCorners: Corners = new Corners();
  public initialButtonText: ButtonText = new ButtonText();
  public initialShadow: Shadow = new Shadow();
  // public initialMargins: Spacing = new Spacing();
  // public initialPadding: Spacing = new Spacing();
  public initialVerticalAlignment: VerticalAlignment = new VerticalAlignment();
  public initialColorPickerColor: Color = new Color();


  // Color Picker
  public colorPicker: Color;
  public showColorPicker: boolean;
  public onColorPickerClose = new Subject<boolean>();

  public closeColorPicker(canceled?: boolean) {
    this.showColorPicker = false;
    this.onColorPickerClose.next(canceled);
  }
}
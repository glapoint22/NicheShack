import { Component, OnInit } from '@angular/core';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Caption } from 'projects/manager/src/app/classes/caption';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { Link } from 'projects/manager/src/app/classes/link';
import { Padding } from 'projects/manager/src/app/classes/padding';
import { Color } from 'classes/color';
import { ButtonState } from 'projects/manager/src/app/classes/button-state';
import { WidgetType } from 'classes/widget-type';
import { BreakpointsPaddingComponent } from 'projects/manager/src/app/classes/breakpoints-padding-component';
import { Background } from 'projects/manager/src/app/classes/background';
import { BackgroundColor } from 'projects/manager/src/app/classes/background-color';
import { TextColor } from 'projects/manager/src/app/classes/text-color';
import { ButtonWidgetData } from 'projects/manager/src/app/classes/button-widget-data';
import { BreakpointData } from 'classes/breakpoint-data';
import { LinkOption } from 'classes/link-base';
import { BorderColor } from 'classes/border-color';
import { Button } from 'classes/button';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { CssButtonService } from 'services/css-button.service';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent extends FreeformWidgetComponent implements Button, OnInit, BreakpointsPaddingComponent {
  private defaultBackgroundColor: Color = new Color(128, 128, 128, 1);
  private defaultHeight: number = 40;
  public background: Background = new Background();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public caption: Caption = new Caption();
  public shadow: Shadow = new Shadow();
  public link: Link = new Link();
  public padding: Padding = new Padding();

  // Background Hover & Active colors
  private defaultBackgroundHoverColor = new Color(150, 150, 150, 1);
  private defaultBackgroundActiveColor = new Color(135, 135, 135, 1);
  public backgroundHoverColor: BackgroundColor = new BackgroundColor(this.defaultBackgroundHoverColor);
  public backgroundActiveColor: BackgroundColor = new BackgroundColor(this.defaultBackgroundActiveColor);

  // Border Hover & Active colors
  private defaultBorderHoverColor = new Color(240, 240, 240, 1);
  private defaultBorderActiveColor = new Color(220, 220, 220, 1);
  public borderHoverColor: BorderColor = new BorderColor(this.defaultBorderHoverColor);
  public borderActiveColor: BorderColor = new BorderColor(this.defaultBorderActiveColor);

  // Text Hover & Active colors
  private defaultTextHoverColor = new Color(255, 255, 255, 1);
  private defaultTextActiveColor = new Color(225, 225, 225, 1);
  public textHoverColor: TextColor = new TextColor(this.defaultTextHoverColor);
  public textActiveColor: TextColor = new TextColor(this.defaultTextActiveColor);

  // Current state of the button (ie. normal, hover, active)
  public currentState: ButtonState;



  constructor(breakpointService: BreakpointService, private cssButtonService: CssButtonService) { super(breakpointService) }


  // ---------------------------------------------------------------- Ng On Init --------------------------------------------------------------
  ngOnInit() {
    this.height = this.defaultHeight;
    this.caption.text = this.name = this.defaultName = 'Button';
    this.type = WidgetType.Button;
    this.currentState = ButtonState.Normal;
    this.background.color = this.defaultBackgroundColor;
    this.background.enable = true;
    this.link.selectedOption = LinkOption.None;
    super.ngOnInit();
  }






  // ------------------------------------------------------------ Get Background Color ----------------------------------------------------------
  getBackgroundColor(): string {
    let color: string;

    switch (this.currentState) {
      case ButtonState.Normal:
        color = this.background.color.toRGBString();
        break;

      case ButtonState.Hover:
        color = this.backgroundHoverColor.value.toRGBString();
        break;

      case ButtonState.Active:
        color = this.backgroundActiveColor.value.toRGBString();
        break;
    }

    return color;
  }





  // --------------------------------------------------------------- Get Border Color ----------------------------------------------------------
  getBorderColor(): string {
    let color: string;

    switch (this.currentState) {
      case ButtonState.Normal:
        color = this.border.color.toHex();
        break;

      case ButtonState.Hover:
        color = this.borderHoverColor.value.toHex();
        break;

      case ButtonState.Active:
        color = this.borderActiveColor.value.toHex();
        break;
    }

    return color;
  }


  // ----------------------------------------------------------------- Get Text Color -----------------------------------------------------------
  getTextColor(): string {
    let color: string;

    switch (this.currentState) {
      case ButtonState.Normal:
        color = this.caption.color.toRGBString();
        break;

      case ButtonState.Hover:
        color = this.textHoverColor.value.toRGBString();
        break;

      case ButtonState.Active:
        color = this.textActiveColor.value.toRGBString();
        break;
    }

    return color;
  }


  setData(widgetData: ButtonWidgetData) {
    this.background.setData(widgetData.background);
    this.border.setData(widgetData.border);
    this.caption.setData(widgetData.caption);
    this.corners.setData(widgetData.corners);
    this.shadow.setData(widgetData.shadow);
    this.padding.setData(widgetData.padding);
    this.link.setData(widgetData.link);
    this.backgroundHoverColor.setData(widgetData.backgroundHoverColor);
    this.backgroundActiveColor.setData(widgetData.backgroundActiveColor);
    this.borderHoverColor.setData(widgetData.borderHoverColor);
    this.borderActiveColor.setData(widgetData.borderActiveColor);
    this.textHoverColor.setData(widgetData.textHoverColor);
    this.textActiveColor.setData(widgetData.textActiveColor);
    super.setData(widgetData);
  }


  getData(): ButtonWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: this.height != this.defaultHeight ? widgetData.height : 0,
      horizontalAlignment: widgetData.horizontalAlignment,
      background: this.background.getData(),
      border: this.border.getData(),
      corners: this.corners.getData(),
      shadow: this.shadow.getData(),
      padding: this.padding.getData(this.breakpoints),
      caption: this.caption.getData(),
      link: this.link.getData(),
      backgroundHoverColor: !this.backgroundHoverColor.value.isEqual(this.defaultBackgroundHoverColor) ? this.backgroundHoverColor.value.toHex() : null,
      backgroundActiveColor: !this.backgroundActiveColor.value.isEqual(this.defaultBackgroundActiveColor) ? this.backgroundActiveColor.value.toHex() : null,
      borderHoverColor: !this.borderHoverColor.value.isEqual(this.defaultBorderHoverColor) ? this.borderHoverColor.value.toHex() : null,
      borderActiveColor: !this.borderActiveColor.value.isEqual(this.defaultBorderActiveColor) ? this.borderActiveColor.value.toHex() : null,
      textHoverColor: !this.textHoverColor.value.isEqual(this.defaultTextHoverColor) ? this.textHoverColor.value.toHex() : null,
      textActiveColor: !this.textActiveColor.value.isEqual(this.defaultTextActiveColor) ? this.textActiveColor.value.toHex() : null,
      breakpoints: this.getBreakpointData(widgetData.breakpoints)
    }
  }




  getBreakpointData(breakpointData: Array<BreakpointData>): Array<BreakpointData> {
    // Padding
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.top);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.right);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.bottom);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.left);

    return breakpointData;
  }




  // ------------------------------------------------------------------- Build HTML -----------------------------------------------------------
  buildPreview(parent: HTMLElement) {
    let button: any = document.createElement(this.link.url ? 'a' : 'div');
    let buttonClassName = this.cssButtonService.getClassName();
    let buttonClass = this.cssButtonService.createClass(buttonClassName, this);

    // Added the classes
    button.classList.add('text-break');
    button.classList.add(buttonClassName);


    // Style
    button.style.width = '100%';
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    button.style.userSelect = 'none';
    button.style.textAlign = 'center';
    if (!this.link.url) button.style.cursor = 'pointer';

    this.corners.applyStyle(button);
    this.shadow.applyStyle(button);

    // Link
    if (this.link.url) {
      button.href = this.link.url;
      button.target = '_blank';
      button.style.textDecoration = 'none';
    }

    // Add the padding classes to the button element
    this.padding.addClasses(this.breakpoints, button, this.padding.getValues());


    // Button caption
    button.appendChild(document.createTextNode(this.caption.text));


    // Add this button style
    this.column.row.pageService.buttonStylesDocumentFragment.firstElementChild.appendChild(document.createTextNode(buttonClass));


    super.buildPreview(parent, button);
  }
}
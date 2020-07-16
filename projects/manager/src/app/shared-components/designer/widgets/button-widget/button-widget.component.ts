import { Component, OnInit } from '@angular/core';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Caption } from 'projects/manager/src/app/classes/caption';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { Link, LinkOption } from 'projects/manager/src/app/classes/link';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { Padding } from 'projects/manager/src/app/classes/padding';
import { Color } from 'projects/manager/src/app/classes/color';
import { ButtonState } from 'projects/manager/src/app/classes/button-state';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { BreakpointsPaddingComponent } from 'projects/manager/src/app/classes/breakpoints-padding-component';
import { Background } from 'projects/manager/src/app/classes/background';
import { BackgroundColor } from 'projects/manager/src/app/classes/background-color';
import { BorderColor } from 'projects/manager/src/app/classes/border-color';
import { TextColor } from 'projects/manager/src/app/classes/text-color';
import { ButtonWidgetData } from 'projects/manager/src/app/classes/button-widget-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent extends FreeformWidgetComponent implements OnInit, BreakpointsPaddingComponent {
  public background: Background = new Background();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public caption: Caption = new Caption();
  public shadow: Shadow = new Shadow();
  public link: Link = new Link();
  public padding: Padding = new Padding();

  // Background Hover & Active colors
  public backgroundHoverColor: BackgroundColor = new BackgroundColor(new Color(150, 150, 150, 1));
  public backgroundActiveColor: BackgroundColor = new BackgroundColor(new Color(135, 135, 135, 1));

  // Border Hover & Active colors
  public borderHoverColor: BorderColor = new BorderColor(new Color(240, 240, 240, 1));
  public borderActiveColor: BorderColor = new BorderColor(new Color(220, 220, 220, 1));

  // Text Hover & Active colors
  public textHoverColor: TextColor = new TextColor(new Color(255, 255, 255, 1));
  public textActiveColor: TextColor = new TextColor(new Color(225, 225, 225, 1));

  // Current state of the button (ie. normal, hover, active)
  public currentState: ButtonState;


  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }





  // ---------------------------------------------------------------- Ng On Init --------------------------------------------------------------
  ngOnInit() {
    this.height = 40;
    this.caption.text = this.name = 'Button';
    this.type = WidgetType.Button;
    this.currentState = ButtonState.Normal;
    this.background.color = new Color(128, 128, 128, 1);
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


  getData(columnData: ColumnData) {
    let buttonWidgetData = columnData.widgetData = new ButtonWidgetData();

    // Name
    if (this.name != 'Button') buttonWidgetData.name = this.name;

    // Background
    this.background.getData(buttonWidgetData.background);

    // Border
    this.border.getData(buttonWidgetData.border);

    // Corners
    this.corners.getData(buttonWidgetData.corners);

    // Shadow
    this.shadow.getData(buttonWidgetData.shadow);

    // Padding
    this.padding.getData(buttonWidgetData.padding, this.breakpoints);
    this.breakpointService.saveBreakpoints(this.breakpoints, buttonWidgetData.breakpoints, this.padding.top);
    this.breakpointService.saveBreakpoints(this.breakpoints, buttonWidgetData.breakpoints, this.padding.right);
    this.breakpointService.saveBreakpoints(this.breakpoints, buttonWidgetData.breakpoints, this.padding.bottom);
    this.breakpointService.saveBreakpoints(this.breakpoints, buttonWidgetData.breakpoints, this.padding.left);

    // Text
    this.caption.getData(buttonWidgetData.caption);

    // Link
    this.link.getData(buttonWidgetData.link);

    // Background Hover Color
    buttonWidgetData.backgroundHoverColor = this.backgroundHoverColor.value.toHex();

    // Background Active Color
    buttonWidgetData.backgroundActiveColor = this.backgroundActiveColor.value.toHex();



    // Border Hover Color
    buttonWidgetData.borderHoverColor = this.borderHoverColor.value.toHex();

    // Border Active Color
    buttonWidgetData.borderActiveColor = this.borderActiveColor.value.toHex();




    // Text Hover Color
    buttonWidgetData.textHoverColor = this.textHoverColor.value.toHex();

    // Text Active Color
    buttonWidgetData.textActiveColor = this.textActiveColor.value.toHex();

    super.getData(columnData);
  }


  // ------------------------------------------------------------------- Build HTML -----------------------------------------------------------
  buildHTML(parent: HTMLElement) {
    let button: any = document.createElement(this.link.url ? 'a' : 'div');
    let className = this.createClassName();
    let css = '.' + className + ' {' +
      this.background.getStyle() +
      this.border.getStyle() +
      this.corners.getStyle() +
      this.shadow.getStyle() +
      this.caption.getStyle() +
      '\n\tmin-height: ' + this.height + 'px;' +
      (this.width ? '\n\tmax-width: ' + this.width + 'px;' : '') +
      '\n}' +

      // Hover
      '\n.' + className + ':hover {' +
      this.backgroundHoverColor.getStyle() +
      (this.border.enable ? this.borderHoverColor.getStyle() : '') +
      this.textHoverColor.getStyle() +
      '\n}' +

      // Active
      '\n.' + className + ':active {' +
      this.backgroundActiveColor.getStyle() +
      (this.border.enable ? this.borderActiveColor.getStyle() : '') +
      this.textActiveColor.getStyle() +
      '\n}';

    // Added the classes
    button.classList.add('text-break');
    button.classList.add(className);


    // Style
    button.style.width = '100%';
    button.style.display = 'flex';
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    button.style.userSelect = 'none';
    button.style.textAlign = 'center';
    if (!this.link.url) button.style.cursor = 'pointer';

    // Link
    if (this.link.url) {
      button.href = this.link.url;
      button.target = '_blank';
      button.style.textDecoration = 'none';
    }

    // This will add padding positions to this component (ie. top, right, bottom, left)
    this.padding.setPaddingComponent(this);


    // Set the breakpoint classes
    this.breakpointService.setBreakpointClasses(this, button);


    // Button caption
    button.appendChild(document.createTextNode(this.caption.text));


    // Add this button style
    this.widgetService.buttonStylesDocumentFragment.firstElementChild.appendChild(document.createTextNode(css));

    // Append this button to the parent
    parent.appendChild(button);
  }





  // ------------------------------------------------------------ Create Class Name -----------------------------------------------------------
  createClassName() {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
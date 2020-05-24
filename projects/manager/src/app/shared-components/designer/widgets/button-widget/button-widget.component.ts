import { Component, OnInit } from '@angular/core';
import { FillColor } from 'projects/manager/src/app/classes/fill-color';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { ButtonText } from 'projects/manager/src/app/classes/button-text';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { Link, LinkOption } from 'projects/manager/src/app/classes/link';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { PageService } from 'projects/manager/src/app/services/page.service';
import { Padding } from 'projects/manager/src/app/classes/padding';
import { Color } from 'projects/manager/src/app/classes/color';
import { ButtonState } from 'projects/manager/src/app/classes/button-state';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { PaddingTop } from 'projects/manager/src/app/classes/padding-top';
import { PaddingRight } from 'projects/manager/src/app/classes/padding-right';
import { PaddingBottom } from 'projects/manager/src/app/classes/padding-bottom';
import { PaddingLeft } from 'projects/manager/src/app/classes/padding-left';
import { BreakpointsPaddingComponent } from 'projects/manager/src/app/classes/breakpoints-padding-component';
import { Background } from 'projects/manager/src/app/classes/background';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent extends FreeformWidgetComponent implements OnInit, BreakpointsPaddingComponent {
  public background: Background = new Background();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public text: ButtonText = new ButtonText();
  public shadow: Shadow = new Shadow();
  public link: Link = new Link();

  // Padding
  public paddingTop: PaddingTop = new PaddingTop();
  public paddingRight: PaddingRight = new PaddingRight();
  public paddingBottom: PaddingBottom = new PaddingBottom();
  public paddingLeft: PaddingLeft = new PaddingLeft();
  public padding: Padding = new Padding(this.paddingTop, this.paddingRight, this.paddingBottom, this.paddingLeft);

  // Background Hover & Active
  public backgroundHover: FillColor = new FillColor(new Color(150, 150, 150, 1));
  public backgroundActive: FillColor = new FillColor(new Color(135, 135, 135, 1));

  // Border Hover & Active
  public borderHover: Border = new Border(new Color(240, 240, 240, 1));
  public borderActive: Border = new Border(new Color(220, 220, 220, 1));

  // Text Hover & Active
  public textHover: ButtonText = new ButtonText(new Color(255, 255, 255, 1));
  public textActive: ButtonText = new ButtonText(new Color(225, 225, 225, 1));

  // Current state of the button (ie. normal, hover, active)
  public currentState: ButtonState;


  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService,
    private pageService: PageService) { super(widgetService, breakpointService) }





  // ---------------------------------------------------------------- Ng On Init --------------------------------------------------------------
  ngOnInit() {
    this.height = 40;
    this.name = 'Button';
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
        color = this.backgroundHover.color.toRGBString();
        break;

      case ButtonState.Active:
        color = this.backgroundActive.color.toRGBString();
        break;
    }

    return color;
  }





  // --------------------------------------------------------------- Get Border Color ----------------------------------------------------------
  getBorderColor(): string {
    let color: string;

    switch (this.currentState) {
      case ButtonState.Normal:
        color = this.border.color.toHexA();
        break;

      case ButtonState.Hover:
        color = this.borderHover.color.toHexA();
        break;

      case ButtonState.Active:
        color = this.borderActive.color.toHexA();
        break;
    }

    return color;
  }


  // ----------------------------------------------------------------- Get Text Color -----------------------------------------------------------
  getTextColor(): string {
    let color: string;

    switch (this.currentState) {
      case ButtonState.Normal:
        color = this.text.color.toRGBString();
        break;

      case ButtonState.Hover:
        color = this.textHover.color.toRGBString();
        break;

      case ButtonState.Active:
        color = this.textActive.color.toRGBString();
        break;
    }

    return color;
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
      this.text.getStyle() +
      '\n\tmin-height: ' + this.height + 'px;' +
      (this.width ? '\n\tmax-width: ' + this.width + 'px;' : '') +
      '\n}' +

      // Hover
      '\n.' + className + ':hover {' +
      this.backgroundHover.getStyle() +
      (this.border.enable ? this.borderHover.getColorStyle() : '') +
      this.textHover.getColorStyle() +
      '\n}' +

      // Active
      '\n.' + className + ':active {' +
      this.backgroundActive.getStyle() +
      (this.border.enable ? this.borderActive.getColorStyle() : '') +
      this.textActive.getColorStyle() +
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

    // Set the breakpoint classes
    this.breakpointService.setBreakpointClasses(this, button);


    // Button caption
    button.appendChild(document.createTextNode(this.text.caption));


    // Add this button style
    this.pageService.buttonStylesDocumentFragment.firstElementChild.appendChild(document.createTextNode(css));

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
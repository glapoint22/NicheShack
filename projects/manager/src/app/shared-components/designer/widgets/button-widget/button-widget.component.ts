import { Component, OnInit } from '@angular/core';
import { FillColor } from 'projects/manager/src/app/classes/fill-color';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { ButtonText } from 'projects/manager/src/app/classes/button-text';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { HoverTab } from 'projects/manager/src/app/classes/hover-tab';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { Link } from 'projects/manager/src/app/classes/link';
import { LinkSource } from 'projects/manager/src/app/classes/link-source';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { PaddingTop } from 'projects/manager/src/app/classes/padding-top';
import { PaddingRight } from 'projects/manager/src/app/classes/padding-right';
import { PaddingBottom } from 'projects/manager/src/app/classes/padding-bottom';
import { PaddingLeft } from 'projects/manager/src/app/classes/padding-left';
import { PageService } from 'projects/manager/src/app/services/page.service';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent extends FreeformWidgetComponent implements OnInit, LinkSource {
  public hoverTab: HoverTab = new HoverTab();
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public text: ButtonText = new ButtonText();
  public shadow: Shadow = new Shadow();
  public link: Link = new Link();
  public paddingTop: PaddingTop = new PaddingTop();
  public paddingRight: PaddingRight = new PaddingRight();
  public paddingBottom: PaddingBottom = new PaddingBottom();
  public paddingLeft: PaddingLeft = new PaddingLeft();

  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService,
    private pageService: PageService) { super(widgetService, breakpointService) }


  ngOnInit() {
    this.height = 40;
    super.ngOnInit();
  }

  // -------------------------------------------------( GET FILL COLOR )-----------------------------------------------\\
  getFillColor() {
    let fillColor: string;


    // If the hover tab on the button form is selected
    if (this.hoverTab.selected) {

      // Style the button fill with the hover look
      fillColor = this.fill.hoverColor.toRGBString();

      // If the normal tab on the button form is selected
    } else {

      // Style the button fill with the normal look
      fillColor = this.fill.color.toRGBString();
    }
    return fillColor;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    let hexA: string;


    // If the hover tab on the button form is selected
    if (this.hoverTab.selected) {

      // Style the button border with the hover look
      hexA = this.border.hoverColor.toHexA();


      // If the normal tab on the button form is selected
    } else {

      // Style the button border with the normal look
      hexA = this.border.color.toHexA();
    }
    return hexA;
  }


  // -------------------------------------------------( GET TEXT COLOR )-----------------------------------------------\\
  getTextColor() {
    let textColor: string;


    // If the hover tab on the button form is selected
    if (this.hoverTab.selected) {

      // Style the button text with the hover look
      textColor = this.text.hoverColor.toRGBString();


      // If the normal tab on the button form is selected
    } else {

      // Style the button text with the normal look
      textColor = this.text.color.toRGBString();
    }
    return textColor;
  }


  buildHTML(parent: HTMLElement) {
    let button: any = document.createElement(this.link.url ? 'a' : 'div');
    let className = this.createClassName();
    let css = '.' + className + ' {' +
      this.fill.getStyle() +
      this.border.getStyle() +
      this.corners.getStyle() +
      this.shadow.getStyle() +
      this.text.getStyle() +
      '\n\tmin-height: ' + this.height + 'px;' +
      (this.width ? '\n\tmax-width: ' + this.width + 'px;' : '') +
      '\n}' +

      '\n.' + className + ':hover {' +
      this.fill.getHoverStyle() +
      this.border.getHoverStyle() +
      this.text.getHoverStyle() +
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

  createClassName() {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
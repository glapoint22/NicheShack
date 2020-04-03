import { Component, OnInit } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { FillColor } from 'projects/manager/src/app/classes/fill-color';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { ButtonText } from 'projects/manager/src/app/classes/button-text';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { HoverTab } from 'projects/manager/src/app/classes/hover-tab';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { Color } from 'projects/manager/src/app/classes/color';
import { Link } from 'projects/manager/src/app/classes/link';
import { LinkSource } from 'projects/manager/src/app/classes/link-source';

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

  constructor(widgetService: WidgetService, public _FormService: FormService) { super(widgetService) }


  ngOnInit() {
    this.height = 40;
  }


  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.buttonFormHoverTab = this.hoverTab;
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.buttonText = this.text;
    this._FormService.shadow = this.shadow;
    this._FormService.horizontalAlignment = this.horizontalAlignment;
    this._FormService.linkSource = this;

    // Open the Button form
    this._FormService.showButtonForm = true;
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
      hexA = Color.RGBAToHexA(this.border.hoverColor);


      // If the normal tab on the button form is selected
    } else {

      // Style the button border with the normal look
      hexA = Color.RGBAToHexA(this.border.color);
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


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return Color.RGBAToHexA(this.shadow.color);
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
      this.horizontalAlignment.getStyle() +
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
    if(!this.link.url) button.style.cursor = 'pointer';

    // Link
    if (this.link.url) {
      button.href = this.link.url;
      button.target = '_blank';
      button.style.textDecoration = 'none';
    }


    // Button caption
    button.appendChild(document.createTextNode(this.text.caption));


    // Add this class to the classes array
    this.widgetService.buttonClasses.firstElementChild.appendChild(document.createTextNode(css));

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
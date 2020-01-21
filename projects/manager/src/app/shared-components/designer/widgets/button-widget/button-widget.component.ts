import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { FillColor } from 'projects/manager/src/app/classes/fill-color';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { ButtonText } from 'projects/manager/src/app/classes/button-text';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { Spacing } from 'projects/manager/src/app/classes/spacing';
import { WidgetComponent } from '../widget/widget.component';
import { HoverTab } from 'projects/manager/src/app/classes/hover-tab';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent extends WidgetComponent {
  public hoverTab: HoverTab = new HoverTab();
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public text: ButtonText = new ButtonText();
  public shadow: Shadow = new Shadow();
  public margins: Spacing = new Spacing();

  constructor(public _FormService: FormService) { super() }

  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.buttonFormHoverTab = this.hoverTab;
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.buttonText = this.text;
    this._FormService.shadow = this.shadow;
    this._FormService.margins = this.margins;

    // Open the Button form
    this._FormService.showButtonForm = true;
  }


  // -------------------------------------------------( GET FILL COLOR )-----------------------------------------------\\
  getFillColor() {
    let fillColor: string;


    // If the hover tab on the button form is selected
    if (this.hoverTab.selected) {
      
      // Style the button fill with the hover look
      fillColor = 'rgba(' + this.fill.hoverColor.r + ',' + this.fill.hoverColor.g + ',' + this.fill.hoverColor.b + ',' + this.fill.hoverColor.a + ')';

      // If the normal tab on the button form is selected
    } else {

      // Style the button fill with the normal look
      fillColor = 'rgba(' + this.fill.color.r + ',' + this.fill.color.g + ',' + this.fill.color.b + ',' + this.fill.color.a + ')';
    }
    return fillColor;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    let hexA: string;


    // If the hover tab on the button form is selected
    if (this.hoverTab.selected) {

      // Style the button border with the hover look
      hexA = this._FormService.RGBAToHexA(this.border.hoverColor.r, this.border.hoverColor.g, this.border.hoverColor.b, this.border.hoverColor.a);


      // If the normal tab on the button form is selected
    } else {

      // Style the button border with the normal look
      hexA = this._FormService.RGBAToHexA(this.border.color.r, this.border.color.g, this.border.color.b, this.border.color.a);
    }
    return hexA;
  }


  // -------------------------------------------------( GET TEXT COLOR )-----------------------------------------------\\
  getTextColor() {
    let textColor: string;


    // If the hover tab on the button form is selected
    if (this.hoverTab.selected) {

      // Style the button text with the hover look
      textColor = 'rgba(' + this.text.hoverColor.r + ',' + this.text.hoverColor.g + ',' + this.text.hoverColor.b + ',' + this.text.hoverColor.a + ')';


      // If the normal tab on the button form is selected
    } else {

      // Style the button text with the normal look
      textColor = 'rgba(' + this.text.color.r + ',' + this.text.color.g + ',' + this.text.color.b + ',' + this.text.color.a + ')';
    }
    return textColor;
  }


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return this._FormService.RGBAToHexA(this.shadow.color.r, this.shadow.color.g, this.shadow.color.b, this.shadow.color.a);
  }
}
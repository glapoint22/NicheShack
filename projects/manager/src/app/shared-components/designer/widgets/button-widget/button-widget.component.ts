import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { FillColor } from 'projects/manager/src/app/classes/fill-color';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { ButtonText } from 'projects/manager/src/app/classes/button-text';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { Margins } from 'projects/manager/src/app/classes/margins';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent {
  constructor(public _FormService: FormService) { }
  public buttonForm: any = { open: false, normalTabSelected: true }
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public text: ButtonText = new ButtonText();
  public shadow: Shadow = new Shadow();
  public margins: Margins = new Margins();


  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.buttonForm = this.buttonForm;
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.buttonText = this.text;
    this._FormService.shadow = this.shadow;
    this._FormService.margins = this.margins;

    // Open the Button form
    this.buttonForm.open = true;
  }


  // -------------------------------------------------( GET FILL COLOR )-----------------------------------------------\\
  getFillColor() {
    // If the normal tab on the button form is selected
    if (this.buttonForm.normalTabSelected) {

      // Style the button fill with the normal look
      var fillColor = 'rgba(' + this.fill.color.r + ',' + this.fill.color.g + ',' + this.fill.color.b + ',' + this.fill.color.a + ')';

      // If the hover tab on the button form is selected
    } else {

      // Style the button fill with the hover look
      var fillColor = 'rgba(' + this.fill.hoverColor.r + ',' + this.fill.hoverColor.g + ',' + this.fill.hoverColor.b + ',' + this.fill.hoverColor.a + ')';
    }
    return fillColor;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    // If the normal tab on the button form is selected
    if (this.buttonForm.normalTabSelected) {

      // Style the button border with the normal look
      var hexA = this._FormService.RGBAToHexA(this.border.color.r, this.border.color.g, this.border.color.b, this.border.color.a);

      // If the hover tab on the button form is selected
    } else {

      // Style the button border with the hover look
      var hexA = this._FormService.RGBAToHexA(this.border.hoverColor.r, this.border.hoverColor.g, this.border.hoverColor.b, this.border.hoverColor.a);
    }
    return hexA;
  }


  // -------------------------------------------------( GET TEXT COLOR )-----------------------------------------------\\
  getTextColor() {
    // If the normal tab on the button form is selected
    if (this.buttonForm.normalTabSelected) {

      // Style the button text with the normal look
      var textColor = 'rgba(' + this.text.color.r + ',' + this.text.color.g + ',' + this.text.color.b + ',' + this.text.color.a + ')';

      // If the hover tab on the button form is selected
    } else {

      // Style the button text with the hover look
      var textColor = 'rgba(' + this.text.hoverColor.r + ',' + this.text.hoverColor.g + ',' + this.text.hoverColor.b + ',' + this.text.hoverColor.a + ')';
    }
    return textColor;
  }


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return this._FormService.RGBAToHexA(this.shadow.color.r, this.shadow.color.g, this.shadow.color.b, this.shadow.color.a);
  }
}
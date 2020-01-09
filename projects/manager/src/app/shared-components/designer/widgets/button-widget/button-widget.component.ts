import { Component, OnInit } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent {
  public fillColor: any = {r: 0, g: 0, b: 255, a: 0.75};
  public hoverFillColor: any = {r: 255, g: 0, b: 0, a: 1};
  public applyBorder: string = "";
  public borderWidth: number = 5;
  public borderStyle: string = "dashed";
  public borderColor: any = {r: 255, g: 255, b: 0, a: 0.9};
  public hoverBorderColor: any = {r: 255, g: 0, b: 255, a: 1};
  public borderTopLeftRadius: number = 10;
  public borderTopRightRadius: number = 20;
  public borderBottomLeftRadius: number = 30;
  public borderBottomRightRadius: number = 40;
  public caption: string = "Button";
  public fontFamily: string = "arial";
  public fontSize: number = 30;
  public fontWeight: string = "bold";
  public fontStyle: string = "italic";
  public textColor: any = {r: 0, g: 255, b: 255, a: 1};
  public hoverTextColor: any = {r: 255, g: 255, b: 255, a: 1};
  public enableShadow: string = "";
  public shadowX: number = 20;
  public shadowY: number = 100;
  public shadowBlur: number = 20;
  public shadowSize: number = 5;
  public shadowColor: any = {r: 0, g: 0, b: 0, a: 0.75};
  public marginTop: number = 0;
  public marginRight: number = 0;
  public marginBottom: number = 0;
  public marginLeft: number = 0;
  constructor(public _FormService: FormService) {}


  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.fillColor = this.fillColor;
    this._FormService.borderColor = this.borderColor;
    this._FormService.textColor = this.textColor;
    this._FormService.shadowColor = this.shadowColor;
    this._FormService.hoverFillColor = this.hoverFillColor;
    this._FormService.hoverBorderColor = this.hoverBorderColor;
    this._FormService.hoverTextColor = this.hoverTextColor;
    this._FormService.showButtonEditForm = true;
  }


  // -------------------------------------------------( GET FILL COLOR )-----------------------------------------------\\
  getFillColor() {
    // If the normal tab on the button form is selected
    if(this._FormService.buttonNormalTabSelected) {

      // Style the button fill with the normal look
      var fillColor = 'rgba(' + this.fillColor.r + ',' +  this.fillColor.g + ',' + this.fillColor.b + ',' + this.fillColor.a + ')';

    // If the hover tab on the button form is selected
    } else {

      // Style the button fill with the hover look
      var fillColor = 'rgba(' + this.hoverFillColor.r + ',' +  this.hoverFillColor.g + ',' + this.hoverFillColor.b + ',' + this.hoverFillColor.a + ')';
    }
    return fillColor;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    // If the normal tab on the button form is selected
    if(this._FormService.buttonNormalTabSelected) {

      // Style the button border with the normal look
      var borderColor = 'rgba(' + this.borderColor.r + ',' +  this.borderColor.g + ',' + this.borderColor.b + ',' + this.borderColor.a + ')';

    // If the hover tab on the button form is selected
    } else {

      // Style the button border with the hover look
      var borderColor = 'rgba(' + this.hoverBorderColor.r + ',' +  this.hoverBorderColor.g + ',' + this.hoverBorderColor.b + ',' + this.hoverBorderColor.a + ')';
    }
    return borderColor;
  }


  // -------------------------------------------------( GET TEXT COLOR )-----------------------------------------------\\
  getTextColor() {
    // If the normal tab on the button form is selected
    if(this._FormService.buttonNormalTabSelected) {

      // Style the button text with the normal look
      var textColor = 'rgba(' + this.textColor.r + ',' +  this.textColor.g + ',' + this.textColor.b + ',' + this.textColor.a + ')';

    // If the hover tab on the button form is selected
    } else {

      // Style the button text with the hover look
      var textColor = 'rgba(' + this.hoverTextColor.r + ',' +  this.hoverTextColor.g + ',' + this.hoverTextColor.b + ',' + this.hoverTextColor.a + ')';
    }
    return textColor;
  }

}

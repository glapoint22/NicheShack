import { Component, OnInit } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent {
  public buttonEditForm: any = {normalTabSelected: true}
  public fillColor: any = {r: 0, g: 0, b: 255, a: 0.75};
  public hoverFillColor: any = {r: 255, g: 0, b: 0, a: 1};
  public border: any = {apply: false, width: 5, style: "solid"}
  public corners: any = {constrainCorners: true, topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0}
  public borderColor: any = {r: 255, g: 255, b: 0, a: 0.9};
  public hoverBorderColor: any = {r: 255, g: 0, b: 255, a: 1};
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

    this._FormService.buttonEditForm = this.buttonEditForm;
    this._FormService.fillColor = this.fillColor;
    this._FormService.hoverFillColor = this.hoverFillColor;


    this._FormService.border = this.border;
    this._FormService.corners = this.corners;



    this._FormService.borderColor = this.borderColor;
    this._FormService.textColor = this.textColor;
    this._FormService.shadowColor = this.shadowColor;
    
    this._FormService.hoverBorderColor = this.hoverBorderColor;
    this._FormService.hoverTextColor = this.hoverTextColor;

    // Open the Button Edit form
    this._FormService.openButtonEditForm = true;
  }


 


  // -------------------------------------------------( GET FILL COLOR )-----------------------------------------------\\
  getFillColor() {
    // If the normal tab on the button form is selected
    if(this.buttonEditForm.normalTabSelected) {

      // Style the button fill with the normal look
      var fillColor = 'rgba(' + this.fillColor.r + ',' +  this.fillColor.g + ',' + this.fillColor.b + ',' + this.fillColor.a + ')';

    // If the hover tab on the button form is selected
    } else {

      // Style the button fill with the hover look
      var fillColor = 'rgba(' + this.hoverFillColor.r + ',' +  this.hoverFillColor.g + ',' + this.hoverFillColor.b + ',' + this.hoverFillColor.a + ')';
    }
    return fillColor;
  }


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
  

  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    // If the normal tab on the button form is selected
    if(this.buttonEditForm.normalTabSelected) {

      // Style the button border with the normal look
      var hexA = this.RGBAToHexA(this.borderColor.r, this.borderColor.g, this.borderColor.b, this.borderColor.a);

    // If the hover tab on the button form is selected
    } else {

      // Style the button border with the hover look
      var hexA = this.RGBAToHexA(this.hoverBorderColor.r, this.hoverBorderColor.g, this.hoverBorderColor.b, this.hoverBorderColor.a);
    }
    return hexA;
  }


  // -------------------------------------------------( GET TEXT COLOR )-----------------------------------------------\\
  getTextColor() {
    // If the normal tab on the button form is selected
    if(this.buttonEditForm.normalTabSelected) {

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

import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'button-widget',
  templateUrl: './button-widget.component.html',
  styleUrls: ['./button-widget.component.scss']
})
export class ButtonWidgetComponent {
  constructor(public _FormService: FormService) {}
  public buttonForm: any = {open: false, normalTabSelected: true}

  // ---------------------------Fill------------------------ \\
  public fill: any = { color: {r: 0, g: 0, b: 255, a: 0.75}, 
                       hoverColor: {r: 255, g: 0, b: 0, a: 1}};


  // --------------------------Border----------------------- \\ 
  public border: any = {apply: true, 
                        width: 5, 
                        style: "solid", 
                        color: {r: 255, g: 255, b: 0, a: 0.9}, 
                        hoverColor: {r: 255, g: 0, b: 255, a: 1}};


  // -------------------------Corners------------------------ \\
  public corners: any = {constrainCorners: true, 
                         topLeft: 0, 
                         topRight: 0, 
                         bottomLeft: 0, 
                         bottomRight: 0};


  // --------------------------Text--------------------------- \\
  public text: any = {caption: "Button", 
                      fontFamily: "Arial, Helvetica, sans-serif", 
                      fontSize: 30, 
                      fontWeight: "normal", 
                      fontStyle: "normal", 
                      color: {r: 0, g: 255, b: 255, a: 1}, 
                      hoverColor: {r: 255, g: 255, b: 255, a: 1}};


  // --------------------------Shadow--------------------------- \\
  public shadow: any = {enable: false, 
                        x: 20, 
                        y: 100, 
                        blur: 20, 
                        size: 5, 
                        color: {r: 0, g: 0, b: 0, a: 0.75}};


  // --------------------------Margins--------------------------- \\
  public margins: any = {top: 0, 
                         right: 0, 
                         bottom: 0, 
                         left: 0};



  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.buttonForm = this.buttonForm;
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.text = this.text;
    this._FormService.shadow = this.shadow;
    this._FormService.margins = this.margins;
    
    // Open the Button form
    this.buttonForm.open = true;
  }


  // -------------------------------------------------( GET FILL COLOR )-----------------------------------------------\\
  getFillColor() {
    // If the normal tab on the button form is selected
    if(this.buttonForm.normalTabSelected) {

      // Style the button fill with the normal look
      var fillColor = 'rgba(' + this.fill.color.r + ',' +  this.fill.color.g + ',' + this.fill.color.b + ',' + this.fill.color.a + ')';

    // If the hover tab on the button form is selected
    } else {

      // Style the button fill with the hover look
      var fillColor = 'rgba(' + this.fill.hoverColor.r + ',' +  this.fill.hoverColor.g + ',' + this.fill.hoverColor.b + ',' + this.fill.hoverColor.a + ')';
    }
    return fillColor;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    // If the normal tab on the button form is selected
    if(this.buttonForm.normalTabSelected) {

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
    if(this.buttonForm.normalTabSelected) {

      // Style the button text with the normal look
      var textColor = 'rgba(' + this.text.color.r + ',' +  this.text.color.g + ',' + this.text.color.b + ',' + this.text.color.a + ')';

    // If the hover tab on the button form is selected
    } else {

      // Style the button text with the hover look
      var textColor = 'rgba(' + this.text.hoverColor.r + ',' +  this.text.hoverColor.g + ',' + this.text.hoverColor.b + ',' + this.text.hoverColor.a + ')';
    }
    return textColor;
  }


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return this._FormService.RGBAToHexA(this.shadow.color.r, this.shadow.color.g, this.shadow.color.b, this.shadow.color.a);
  }
}
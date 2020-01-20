import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'container-widget',
  templateUrl: './container-widget.component.html',
  styleUrls: ['./container-widget.component.scss']
})
export class ContainerWidgetComponent {
  constructor(public _FormService: FormService) {}
  public containerForm: any = {open: false}


  // ---------------------------Fill------------------------ \\
  public fill: any = {apply: false, color: {r: 0, g: 0, b: 255, a: 0.75}};


  // --------------------------Border----------------------- \\ 
  public border: any = {apply: false, 
                        width: 5, 
                        style: "solid", 
                        color: {r: 255, g: 255, b: 0, a: 0.9}};


// -------------------------Corners------------------------ \\
public corners: any = {constrainCorners: true, 
                       topLeft: 0, 
                       topRight: 0, 
                       bottomLeft: 0, 
                       bottomRight: 0};

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


// --------------------------Padding--------------------------- \\
public padding: any = {top: 0, 
                       right: 0, 
                       bottom: 0, 
                       left: 0};


  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.containerForm = this.containerForm;
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.shadow = this.shadow;
    this._FormService.margins = this.margins;
    this._FormService.padding = this.padding;

    // Open the container form
    this.containerForm.open = true;
  }

  
  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    return this._FormService.RGBAToHexA(this.border.color.r, this.border.color.g, this.border.color.b, this.border.color.a);
  }

  
  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return this._FormService.RGBAToHexA(this.shadow.color.r, this.shadow.color.g, this.shadow.color.b, this.shadow.color.a);
  }
}

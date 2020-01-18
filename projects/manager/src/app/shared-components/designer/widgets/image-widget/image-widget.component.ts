import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss']
})
export class ImageWidgetComponent {
  constructor(public _FormService: FormService) {}
  public imageForm: any = {open: false}


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


  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.imageForm = this.imageForm;
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.shadow = this.shadow;
    this._FormService.margins = this.margins;

    // Open the image form
    this.imageForm.open = true;
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

import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';

@Component({
  selector: 'line-widget',
  templateUrl: './line-widget.component.html',
  styleUrls: ['./line-widget.component.scss']
})
export class LineWidgetComponent {
  constructor(public _FormService: FormService) {}
  public lineForm: any = {open: false}


  // ---------------------------Fill------------------------ \\
  public fill: any = { color: {r: 0, g: 0, b: 255, a: 0.75}};


  // --------------------------Border----------------------- \\ 
  public border: any = {apply: true, 
                        width: 5, 
                        style: "solid", 
                        color: {r: 255, g: 255, b: 0, a: 0.9}};


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
    this._FormService.lineForm = this.lineForm;
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.shadow = this.shadow;
    this._FormService.margins = this.margins;

    // Open the line form
    this.lineForm.open = true;
  }

  
  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    return this._FormService.RGBAToHexA(this.fill.color.r, this.fill.color.g, this.fill.color.b, this.fill.color.a);
  }

  
  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return this._FormService.RGBAToHexA(this.shadow.color.r, this.shadow.color.g, this.shadow.color.b, this.shadow.color.a);
  }
}

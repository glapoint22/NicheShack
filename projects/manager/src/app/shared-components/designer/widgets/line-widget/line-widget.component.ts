import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { FillColor } from 'projects/manager/src/app/classes/fill-color';
import { Border } from 'projects/manager/src/app/classes/border';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { Spacing } from 'projects/manager/src/app/classes/spacing';

@Component({
  selector: 'line-widget',
  templateUrl: './line-widget.component.html',
  styleUrls: ['./line-widget.component.scss']
})
export class LineWidgetComponent {
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public shadow: Shadow = new Shadow();
  public margins: Spacing = new Spacing();

  constructor(public _FormService: FormService) { }

  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.shadow = this.shadow;
    this._FormService.margins = this.margins;

    // Open the line form
    this._FormService.showLineForm = true;
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

import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { FillColor } from 'projects/manager/src/app/classes/fill-color';
import { Border } from 'projects/manager/src/app/classes/border';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { Spacing } from 'projects/manager/src/app/classes/spacing';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { Color } from 'projects/manager/src/app/classes/color';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';

@Component({
  selector: 'line-widget',
  templateUrl: './line-widget.component.html',
  styleUrls: ['./line-widget.component.scss']
})
export class LineWidgetComponent extends FreeformWidgetComponent {
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public shadow: Shadow = new Shadow();

  constructor(widgetService: WidgetService, public _FormService: FormService) { super(widgetService) }

  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.shadow = this.shadow;
    this._FormService.horizontalAlignment = this.horizontalAlignment;

    // Open the line form
    this._FormService.showLineForm = true;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    return Color.RGBAToHexA(this.fill.color);
  }


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return Color.RGBAToHexA(this.shadow.color);
  }
}

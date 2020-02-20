import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { Spacing } from 'projects/manager/src/app/classes/spacing';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { ProportionalWidgetComponent } from '../proportional-widget/proportional-widget.component';
import { Color } from 'projects/manager/src/app/classes/color';

@Component({
  selector: 'image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss']
})
export class ImageWidgetComponent extends ProportionalWidgetComponent {
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public margins: Spacing = new Spacing();

  constructor(widgetService: WidgetService, public _FormService: FormService) { super(widgetService) }

  


  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.shadow = this.shadow;
    this._FormService.margins = this.margins;

    // Open the image form
    this._FormService.showImageForm = true;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    return Color.RGBAToHexA(this.border.color);
  }


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return Color.RGBAToHexA(this.shadow.color);
  }
}

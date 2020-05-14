import { Component, Input } from '@angular/core';
import { ButtonWidgetComponent } from '../../designer/widgets/button-widget/button-widget.component';
import { ButtonState } from '../../../classes/button-state';

@Component({
  selector: 'button-widget-properties',
  templateUrl: './button-widget-properties.component.html',
  styleUrls: ['./button-widget-properties.component.scss']
})
export class ButtonWidgetPropertiesComponent {
  @Input() buttonWidget: ButtonWidgetComponent;
  public buttonState = ButtonState;
}
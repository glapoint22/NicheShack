import { Component, Input } from '@angular/core';
import { ButtonWidgetComponent } from '../../../designer/widgets/button-widget/button-widget.component';

@Component({
  selector: 'button-widget-normal-properties',
  templateUrl: './button-widget-normal-properties.component.html',
  styleUrls: ['./button-widget-normal-properties.component.scss']
})
export class ButtonWidgetNormalPropertiesComponent {
  @Input() buttonWidget: ButtonWidgetComponent;
}
import { Component, Input, OnChanges } from '@angular/core';
import { ButtonWidgetComponent } from '../../designer/widgets/button-widget/button-widget.component';
import { ButtonState } from '../../../classes/button-state';
import { WidgetComponent } from '../../designer/widgets/widget/widget.component';

@Component({
  selector: 'button-widget-properties',
  templateUrl: './button-widget-properties.component.html',
  styleUrls: ['./button-widget-properties.component.scss']
})
export class ButtonWidgetPropertiesComponent implements OnChanges {
  @Input() widget: WidgetComponent;
  public button: ButtonWidgetComponent;
  public buttonState = ButtonState;
  
  ngOnChanges() {
    this.button = this.widget as ButtonWidgetComponent;
  }
}
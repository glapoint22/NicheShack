import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { ButtonWidgetComponent } from '../../designer/widgets/button-widget/button-widget.component';
import { ButtonState } from '../../../classes/button-state';

@Component({
  selector: 'button-widget-properties',
  templateUrl: './button-widget-properties.component.html',
  styleUrls: ['./button-widget-properties.component.scss']
})
export class ButtonWidgetPropertiesComponent implements OnInit {
  public button: ButtonWidgetComponent;
  public buttonState = ButtonState;
  

  constructor(public widgetService: WidgetService) { }

  ngOnInit() {
    this.button = this.widgetService.selectedWidget as ButtonWidgetComponent;
  }
}
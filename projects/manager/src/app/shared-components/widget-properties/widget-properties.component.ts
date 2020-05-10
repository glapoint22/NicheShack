import { Component } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetType } from '../../classes/widget-type';

@Component({
  selector: 'widget-properties',
  templateUrl: './widget-properties.component.html',
  styleUrls: ['./widget-properties.component.scss']
})
export class WidgetPropertiesComponent {
  public widgetType = WidgetType;

  constructor(public widgetService: WidgetService) { }
}
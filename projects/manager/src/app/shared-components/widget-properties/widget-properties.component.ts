import { Component } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetType } from '../../classes/widget-type';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'widget-properties',
  templateUrl: './widget-properties.component.html',
  styleUrls: ['./widget-properties.component.scss']
})
export class WidgetPropertiesComponent {
  public widgetType = WidgetType;

  constructor(
    public widgetService: WidgetService,
    public pageService: PageService,
  ) { }
}
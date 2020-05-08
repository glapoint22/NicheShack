import { Component } from '@angular/core';
import { WidgetService } from '../../services/widget.service';

@Component({
  selector: 'column-properties',
  templateUrl: './column-properties.component.html',
  styleUrls: ['./column-properties.component.scss']
})
export class ColumnPropertiesComponent {

  constructor(public widgetService: WidgetService) { }

}
import { Component } from '@angular/core';
import { WidgetDataBase } from 'classes/widget-data-base';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'divider-widget',
  templateUrl: './divider-widget.component.html',
  styleUrls: ['./divider-widget.component.scss']
})
export class DividerWidgetComponent extends WidgetComponent {

  setData(widgetData: WidgetDataBase) {
    super.setData(widgetData);
  }

}
import { Component } from '@angular/core';
import { BorderBase } from 'classes/border-base';
import { LineWidgetDataBase } from 'classes/line-widget-data-base';
import { ShadowBase } from 'classes/shadow-base';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'line-widget',
  templateUrl: './line-widget.component.html',
  styleUrls: ['./line-widget.component.scss']
})
export class LineWidgetComponent extends WidgetComponent {
  public border: BorderBase = new BorderBase();
  public shadow: ShadowBase = new ShadowBase();

  setData(widgetData: LineWidgetDataBase) {
    this.border.setData(widgetData.border);
    this.shadow.setData(widgetData.shadow);
    super.setData(widgetData);
  }

}

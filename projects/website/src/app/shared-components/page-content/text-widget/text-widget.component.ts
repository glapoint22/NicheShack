import { Component } from '@angular/core';
import { BackgroundBase } from 'classes/background-base';
import { PaddingBase } from 'classes/padding-base';
import { TextWidgetDataBase } from 'classes/text-widget-data-base';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'text-widget',
  templateUrl: './text-widget.component.html',
  styleUrls: ['./text-widget.component.scss']
})
export class TextWidgetComponent extends WidgetComponent  {
  public background: BackgroundBase = new BackgroundBase();
  public padding: PaddingBase = new PaddingBase();
  
  setData(widgetData: TextWidgetDataBase) {
    this.widgetElement.innerHTML = widgetData.htmlContent;
    this.background.setData(widgetData.background);
    this.padding.addClasses(widgetData.breakpoints, this.widgetElement, widgetData.padding);

    super.setData(widgetData);
  }
  
}

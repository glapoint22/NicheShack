import { Component } from '@angular/core';
import { Border } from 'projects/manager/src/app/classes/border';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { LineWidgetData } from 'projects/manager/src/app/classes/line-widget-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';

@Component({
  selector: 'line-widget',
  templateUrl: './line-widget.component.html',
  styleUrls: ['./line-widget.component.scss']
})
export class LineWidgetComponent extends FreeformWidgetComponent implements BreakpointsComponent {
  public border: Border = new Border();
  public shadow: Shadow = new Shadow();


  ngOnInit() {
    this.name = 'Line';
    this.type = WidgetType.Line;
    super.ngOnInit();
  }

  setData(widgetData: LineWidgetData) {
    this.border.setData(widgetData.border);
    this.shadow.setData(widgetData.shadow);
    super.setData(widgetData);
  }


  getData(columnData: ColumnData) {
    let lineWidgetData = columnData.widgetData = new LineWidgetData();

    // Name
    if (this.name != 'Line') lineWidgetData.name = this.name;

    // Border
    this.border.getData(lineWidgetData.border);

    // Shadow
    this.shadow.getData(lineWidgetData.shadow);

    super.getData(columnData);
  }


  buildHTML(parent: HTMLElement) {
    let lineContainer = document.createElement('div');

    // This is the line container
    if (this.width) lineContainer.style.maxWidth = this.width + 'px';
    lineContainer.style.height = '20px';
    lineContainer.style.display = 'flex';
    lineContainer.style.alignItems = 'center';
    lineContainer.style.width = '100%';

    // Create the line and set styles
    let line = document.createElement('div');
    line.style.width = '100%';
    line.style.borderBottom = this.border.width + 'px ' + this.border.style + ' ' + this.border.color.toHex();
    this.shadow.applyStyle(line);

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, lineContainer);

    lineContainer.appendChild(line);
    parent.appendChild(lineContainer);
  }
}
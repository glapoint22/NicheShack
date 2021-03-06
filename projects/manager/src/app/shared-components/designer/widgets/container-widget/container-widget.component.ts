import { Component, ViewChild } from '@angular/core';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { ContainerComponent } from '../../container/container.component';
import { WidgetType } from 'classes/widget-type';
import { Padding } from 'projects/manager/src/app/classes/padding';
import { BreakpointsPaddingComponent } from 'projects/manager/src/app/classes/breakpoints-padding-component';
import { Background } from 'projects/manager/src/app/classes/background';
import { Color } from 'classes/color';
import { ContainerWidgetData } from 'projects/manager/src/app/classes/container-widget-data';
import { BreakpointData } from 'classes/breakpoint-data';
import { Row } from 'projects/manager/src/app/classes/row';

@Component({
  selector: 'container-widget',
  templateUrl: './container-widget.component.html',
  styleUrls: ['./container-widget.component.scss']
})
export class ContainerWidgetComponent extends FreeformWidgetComponent implements BreakpointsPaddingComponent {
  @ViewChild('container', { static: false }) container: ContainerComponent;
  public background: Background = new Background();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public padding: Padding = new Padding();
  private defaultHeight: number = 250;

  ngOnInit() {
    this.height = this.defaultHeight;
    this.name = this.defaultName = 'Container';
    this.type = WidgetType.Container;
    this.background.color = new Color(128, 128, 128, 1);
    super.ngOnInit();
  }


  getMinHeight(): number {
    

    let minHeight: number = 0;

    this.container.rows.forEach((row: Row) => {
      minHeight += row.component.top + row.element.firstElementChild.clientHeight;
    });

    let value = minHeight + parseInt(this.padding.top.value) + parseInt(this.padding.bottom.value) + (this.border.enable ? this.border.width * 2 : 0);

    if(value == 0) return 20;

    return value;
  }

  getBorder(): number {
    if (!this.border.enable) return 0;
    return this.border.width * 2;
  }


  onRowTransform(delta) {
    if (this.container.rows.length == 0) return;

    let lastChildRow = this.container.rows[this.container.rows.length - 1].element;
    let lastChildRowBottom = lastChildRow.getBoundingClientRect().top + delta + lastChildRow.clientHeight;
    let rowFixedHeight = this.column.row.rowElement.nativeElement.getBoundingClientRect().top + Math.max(this.getMaxRowHeight(), this.height);
    let newRowHeight = this.column.row.rowElement.nativeElement.getBoundingClientRect().top + this.column.row.rowElement.nativeElement.clientHeight;
    let padding = parseInt(this.padding.bottom.value) + (this.border.enable ? this.border.width : 0);


    // If the last row's bottom in this container is greater than this row's fixed height, the container will flex
    // Because of this, we need to re-position the row after this container
    if (lastChildRowBottom + padding > rowFixedHeight) {
      this.column.row.positionNextRow((lastChildRowBottom + padding) - newRowHeight);

      // The last row's bottom is less or equal to this row's fixed height
    } else {

      // Position the next row only if the last row's bottom was greater than the row's fixed height
      if (lastChildRow.getBoundingClientRect().top + lastChildRow.clientHeight > rowFixedHeight - padding) {
        this.column.row.positionNextRow(rowFixedHeight - newRowHeight);
      }
    }
  }


  setData(widgetData: ContainerWidgetData) {
    this.background.setData(widgetData.background);
    this.border.setData(widgetData.border);
    this.corners.setData(widgetData.corners);
    this.shadow.setData(widgetData.shadow);
    this.padding.setData(widgetData.padding);

    super.setData(widgetData);
  }




  getData(): ContainerWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: this.height != this.defaultHeight ? widgetData.height : 0,
      horizontalAlignment: widgetData.horizontalAlignment,
      background: this.background.getData(),
      border: this.border.getData(),
      corners: this.corners.getData(),
      shadow: this.shadow.getData(),
      padding: this.padding.getData(this.breakpoints),
      breakpoints: this.getBreakpointData(widgetData.breakpoints),
      rows: this.container.getData()
    }
  }




  getBreakpointData(breakpointData: Array<BreakpointData>): Array<BreakpointData> {
    // Padding
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.top);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.right);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.bottom);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.left);

    return breakpointData;
  }




  buildPreview(parent: HTMLElement) {
    // Build the grid
    this.container.buildPreview(parent);

    // Get the container
    let container = parent.firstElementChild as HTMLElement;

    // Add width and height styles
    if (this.width) container.style.maxWidth = this.width + 'px';
    container.style.minHeight = this.height + 'px';

    // Add background if enabled
    if (this.background.enable) this.background.applyStyles(container);

    // Other styles
    this.border.applyStyle(container);
    this.corners.applyStyle(container);
    this.shadow.applyStyle(container);


    // Add the padding & horizontal alignment classes
    this.padding.addClasses(this.breakpoints, container, this.padding.getValues());
    this.horizontalAlignment.addClasses(this.breakpoints, container, this.horizontalAlignment.value);
  }
}
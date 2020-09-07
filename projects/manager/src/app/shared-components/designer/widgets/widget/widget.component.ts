import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ColumnComponent } from '../../column/column.component';
import { HorizontalAlignment } from 'projects/manager/src/app/classes/horizontal-alignment';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { Breakpoint } from 'projects/manager/src/app/classes/breakpoint';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';
import { WidgetType } from 'classes/widget-type';
import { WidgetData } from 'projects/manager/src/app/classes/widget-data';
import { PropertyView } from 'projects/manager/src/app/classes/property-view';
import { BreakpointData } from 'projects/manager/src/app/classes/breakpoint-data';
import { VerticalAlign } from 'classes/vertical-align';

@Component({
  template: '',
})
export class WidgetComponent implements OnInit, BreakpointsComponent {
  @ViewChild('widget', { static: false }) widgetElement: ElementRef;
  public width: number;
  public height: number;
  public column: ColumnComponent;
  public breakpoints: Array<Breakpoint> = new Array<Breakpoint>();
  public horizontalAlignment: HorizontalAlignment = new HorizontalAlignment();
  public name: string;
  public type: WidgetType;
  public defaultName: string;

  constructor(public breakpointService: BreakpointService) { }

  ngOnInit() {
    // When a breakpoint changes, this will update any property that has a value stored in the breakpoints array
    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.breakpointService.setBreakpointValues(this.breakpoints);
    });
  }

  onMousedown() {
    this.column.row.container.selectedRow = this.column.row;
  }



  mouseUp(onMousemove, onMouseup) {
    window.setTimeout(() => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
      document.body.removeAttribute('style');
      document.body.removeAttribute('id');
    });

  }


  addEventListeners(onMousemove, onMouseup) {
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }



  getMaxHeight() {
    let maxHeight = this.column.row.top * (this.column.row.verticalAlignment.value == VerticalAlign.Middle ? 2 : 1) +
      (this.column.row.verticalAlignment.value == VerticalAlign.Top ? this.height : this.column.row.rowElement.nativeElement.getBoundingClientRect().height);

    for (let i = this.column.row.container.selectedRowIndex - 1; i > -1; i--) {
      maxHeight += this.column.row.container.rows[i].component.top * (this.column.row.verticalAlignment.value == VerticalAlign.Middle ? 2 : 1);
    }

    return maxHeight;
  }



  getMaxRowHeight(): number {
    let maxHeight: number = 0;

    if (this.column.row.columns.length > 1) {
      for (let i = 0; i < this.column.row.columns.length; i++) {
        if (!this.column.row.columns[i].element.isEqualNode(this.column.viewContainerRef.element.nativeElement.parentElement.parentElement)) {
          maxHeight = Math.max(maxHeight, this.column.row.columns[i].element.getBoundingClientRect().height);
        }
      }
    }

    return maxHeight;
  }

  buildHTML(parent: HTMLElement) { }

  setData(widgetData: WidgetData) {
    if (widgetData.name) this.name = widgetData.name;
    if (widgetData.width) this.width = widgetData.width;
    if (widgetData.height) this.height = widgetData.height;
    this.horizontalAlignment.setData(widgetData.horizontalAlignment);
    this.breakpointService.loadBreakpoints(widgetData.breakpoints, this);
  }


  getData(): WidgetData {
    return {
      name: null,
      widgetType: this.type,
      width: this.width,
      height: this.height,
      horizontalAlignment: this.horizontalAlignment.getData(this.breakpoints),
      breakpoints: this.getBreakpoints()
    }
  }


  getBreakpoints(): Array<BreakpointData> {
    let breakpointData: Array<BreakpointData> = [];

    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.horizontalAlignment);
    return breakpointData;
  }



  onClick(event: MouseEvent) {
    event.stopPropagation();
    if (document.body.id == 'widget-resize' || document.body.id == 'row-move') return;
    this.column.row.pageService.selectedWidget = this;
    this.column.row.pageService.propertyView = PropertyView.Widget;
    this.column.row.pageService.selectedColumn = this.column;
    this.column.row.pageService.selectedRow = this.column.row;
  }
}
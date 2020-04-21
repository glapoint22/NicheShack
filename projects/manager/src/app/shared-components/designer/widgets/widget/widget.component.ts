import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { ColumnComponent } from '../../column/column.component';
import { HorizontalAlignment } from 'projects/manager/src/app/classes/horizontal-alignment';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { Breakpoint, BreakpointVerticalAlignment } from 'projects/manager/src/app/classes/breakpoint';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';

@Component({
  template: '',
})
export class WidgetComponent implements OnInit, BreakpointsComponent {
  @ViewChild('widget', { static: false }) widget: ElementRef;
  public width: number;
  public height: number;
  public column: ColumnComponent;
  public breakpoints: Array<Breakpoint> = new Array<Breakpoint>();
  public horizontalAlignment: HorizontalAlignment = new HorizontalAlignment();

  constructor(public widgetService: WidgetService, public breakpointService: BreakpointService) { }

  ngOnInit() {
    // When a breakpoint changes, this will update any property that has a value stored in the breakpoints array
    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.breakpointService.setBreakpointValues(this.breakpoints);
    });
  }

  onMousedown() {
    this.widgetService.selectedWidget = this;
    this.column.row.container.selectedRow = this.column.row;
  }



  mouseUp(onMousemove, onMouseup) {
    window.removeEventListener("mousemove", onMousemove);
    window.removeEventListener("mouseup", onMouseup);
    document.body.removeAttribute('style');
    document.body.removeAttribute('id');
  }


  addEventListeners(onMousemove, onMouseup) {
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }



  getMaxHeight() {
    let maxHeight = this.column.row.top * (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ? 2 : 1) +
      (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Top ? this.height : this.column.row.rowElement.nativeElement.getBoundingClientRect().height);

    for (let i = this.column.row.container.selectedRowIndex - 1; i > -1; i--) {
      maxHeight += this.column.row.container.rows[i].component.top * (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ? 2 : 1);
    }

    return maxHeight;
  }



  getMaxRowHeight(): number {
    let maxHeight: number = 0;

    if (this.column.row.columns.length > 1) {
      for (let i = 0; i < this.column.row.columns.length; i++) {
        if (!this.column.row.columns[i].element.isEqualNode(this.column.viewContainerRef.element.nativeElement.parentElement)) {
          maxHeight = Math.max(maxHeight, this.column.row.columns[i].element.getBoundingClientRect().height);
        }
      }
    }

    return maxHeight;
  }

  buildHTML(parent: HTMLElement) { }
}
import { Component, ViewChild } from '@angular/core';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { ContainerComponent } from '../../container/container.component';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { Padding } from 'projects/manager/src/app/classes/padding';
import { BreakpointsPaddingComponent } from 'projects/manager/src/app/classes/breakpoints-padding-component';
import { Background } from 'projects/manager/src/app/classes/background';
import { Color } from 'projects/manager/src/app/classes/color';
import { ContainerWidgetData } from 'projects/manager/src/app/classes/container-widget-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';

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

  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }

  ngOnInit() {
    this.height = 250
    this.name = 'Container';
    this.type = WidgetType.Container;
    this.background.color = new Color(128, 128, 128, 1);
    super.ngOnInit();
  }


  getMinHeight(): number {
    if (this.container.rows.length == 0) return 20;

    let index = this.container.rows.length - 1;

    return this.container.rows[index].component.top + this.container.rows[index].element.firstElementChild.clientHeight;
  }


  onRowTransform(delta) {
    let lastChildRow = this.container.rows[this.container.rows.length - 1].element;
    let lastChildRowBottom = lastChildRow.getBoundingClientRect().top + delta + lastChildRow.clientHeight;
    let rowFixedHeight = this.column.row.rowElement.nativeElement.getBoundingClientRect().top + Math.max(this.getMaxRowHeight(), this.height);
    let newRowHeight = this.column.row.rowElement.nativeElement.getBoundingClientRect().top + this.column.row.rowElement.nativeElement.clientHeight;

    // If the last row's bottom in this container is greater than this row's fixed height, the container will flex
    // Because of this, we need to re-position the row after this container
    if (lastChildRowBottom > rowFixedHeight) {
      this.column.row.positionNextRow(lastChildRowBottom - newRowHeight);

      // The last row's bottom is less or equal to this row's fixed height
    } else {

      // Position the next row only if the last row's bottom was greater than the row's fixed height
      if (lastChildRow.getBoundingClientRect().top + lastChildRow.clientHeight > rowFixedHeight) {
        this.column.row.positionNextRow(rowFixedHeight - newRowHeight);
      }
    }
  }


  load(widgetData: ContainerWidgetData) {
    this.background.load(widgetData.background);
    this.border.load(widgetData.border);
    this.corners.load(widgetData.corners);
    this.shadow.load(widgetData.shadow);
    this.padding.load(widgetData.padding);

    super.load(widgetData);
  }




  save(columnData: ColumnData) {
    let containerWidgetData = columnData.widgetData = new ContainerWidgetData();

    // Name
    if (this.name != 'Container') containerWidgetData.name = this.name;

    // Background
    this.background.save(containerWidgetData.background);

    // Border
    this.border.save(containerWidgetData.border);

    // Corners
    this.corners.save(containerWidgetData.corners);

    // Shadow
    this.shadow.save(containerWidgetData.shadow);

    // Padding
    this.padding.save(containerWidgetData.padding, this.breakpoints);
    this.breakpointService.saveBreakpoints(this.breakpoints, containerWidgetData.breakpoints, this.padding.top);
    this.breakpointService.saveBreakpoints(this.breakpoints, containerWidgetData.breakpoints, this.padding.right);
    this.breakpointService.saveBreakpoints(this.breakpoints, containerWidgetData.breakpoints, this.padding.bottom);
    this.breakpointService.saveBreakpoints(this.breakpoints, containerWidgetData.breakpoints, this.padding.left);

    

    super.save(columnData);


    this.container.save(containerWidgetData.rows);
  }




  buildHTML(parent: HTMLElement) {
    // Build the grid
    this.container.buildHTML(parent);

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

    // This will add padding positions to this component (ie. top, right, bottom, left)
    this.padding.setPaddingComponent(this);

    // Set the breakpoint classes
    this.breakpointService.setBreakpointClasses(this, container);
  }
}
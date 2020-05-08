import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { FillColor } from '../../../classes/fill-color';
import { Border } from '../../../classes/border';
import { Corners } from '../../../classes/corners';
import { Shadow } from '../../../classes/shadow';
import { ColumnComponent } from '../column/column.component';
import { ContainerComponent } from '../container/container.component';
import { VerticalAlignment } from '../../../classes/vertical-alignment';
import { Column } from '../../../classes/column';
import { Breakpoint } from '../../../classes/breakpoint';
import { BreakpointService } from '../../../services/breakpoint.service';
import { BreakpointsComponent } from '../../../classes/breakpoints-component';
import { Padding } from '../../../classes/padding';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements BreakpointsComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @ViewChild('row', { static: false }) rowElement: ElementRef;


  private _top: number;
  public get top(): number {
    return this._top;
  }
  public set top(value: number) {
    this._top = Math.max(value, 0);
  }

  public columns: Array<Column> = new Array<Column>();
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public padding: Padding = new Padding();
  public verticalAlignment: VerticalAlignment = new VerticalAlignment();
  public container: ContainerComponent;
  public breakpoints: Array<Breakpoint> = new Array<Breakpoint>();
  public name: string = 'Row';

  constructor(private resolver: ComponentFactoryResolver,
    public widgetService: WidgetService,
    private breakpointService: BreakpointService) { }


  ngOnInit() {
    // When a breakpoint changes, this will update any property that has a value stored in the breakpoints array
    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.breakpointService.setBreakpointValues(this.breakpoints);
    });
  }


  onMousedown() {
    // If we are resizing a widget or resizing a column, return
    if (document.body.id == 'widget-resize' || document.body.id == 'column-resize') return;

    // flag that this row has been selected
    this.container.selectedRow = this;

    // Update the cursor
    document.body.style.cursor = 'move';
    document.body.id = 'row-move';

    // Mousemove
    let onMousemove = (e: MouseEvent) => {
      // Position the row
      let delta = this.setPosition(e.movementY);


      // Position the next row
      this.positionNextRow(delta);
    }

    // Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
      document.body.removeAttribute('style');
      document.body.removeAttribute('id');
    }

    // Add the listeners
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }



  setPosition(delta: number) {
    let value = this.top + delta;
    let allRowsAtZero: boolean;

    // Set the position for this row
    this.top = value;

    // If the position is a negative value, we need to update each previous row
    // This will basically push the rows up
    if (value < 0) {
      allRowsAtZero = true;


      // Loop through each previous row
      for (let i = this.container.selectedRowIndex - 1; i > -1; i--) {
        value += this.container.rows[i].component._top;

        // Update the row's position
        this.container.rows[i].component._top = value;

        // If the row's top is zero or greater, we can stop here and don't need to update any other row
        if (this.container.rows[i].component._top >= 0) {
          allRowsAtZero = false;
          break;

          // The row's top is below zero so we update it to zero
        } else {
          this.container.rows[i].component._top = 0;
        }
      }
    }

    // If all rows end up at a zero position, we need to update the delta
    if (allRowsAtZero) {
      delta += -value;
    }

    return delta;
  }




  positionNextRow(delta: number) {
    let rowIndex = this.container.rows.findIndex(x => x.component == this);

    // If this is the last row
    if (delta != 0 && rowIndex == this.container.rows.length - 1) this.container.onRowTransform.emit(delta);


    // If this is not the last row
    if (rowIndex != this.container.rows.length - 1) {
      let nextRow = this.container.rows[rowIndex + 1].component;


      // Move the row
      nextRow._top -= delta;

      // If the top is below zero
      if (nextRow._top < 0) {
        let diff = delta - nextRow.top;

        // If this is the last row
        if (rowIndex + 1 == this.container.rows.length - 1) this.container.onRowTransform.emit(diff - delta);

        // Set the row to zero
        nextRow._top = 0;

        // If the next row is not the last row
        if (rowIndex + 1 != this.container.rows.length - 1) {

          // Adjust the next row's next row
          nextRow.positionNextRow(diff - delta);
        }
      }
    }
  }








  addColumn(columnElement?: HTMLElement) {
    let componentFactory = this.resolver.resolveComponentFactory(ColumnComponent);
    let columnComponentRef = this.viewContainerRef.createComponent(componentFactory, this.getColumnIndex(columnElement));

    // Add this column to the column array
    this.columns.push(new Column(columnComponentRef.instance, columnComponentRef.location.nativeElement));


    // Set the column's row as this row
    columnComponentRef.instance.row = this;

    // Add the widget
    columnComponentRef.hostView.detectChanges();
    columnComponentRef.instance.addWidget();
    columnComponentRef.hostView.detectChanges();



    // Set the events
    columnComponentRef.location.nativeElement.addEventListener('mouseover', columnComponentRef.instance.onMouseover.bind(columnComponentRef.instance));
    columnComponentRef.location.nativeElement.addEventListener('mouseup', () => { this.widgetService.currentWidgetCursor = null; });
    columnComponentRef.location.nativeElement.addEventListener('mouseleave', columnComponentRef.instance.onMouseleave.bind(columnComponentRef.instance));

    // flag that this row has been selected
    this.container.selectedRow = this;

    // Add or update each column with the correct column span based on the number of columns in this row
    this.columns.forEach((column: Column) => {
      column.component.columnSpan.value = Math.max(2, Math.floor(12 / this.columns.length));
    });


    // Wait a frame to sort the column
    window.setTimeout(() => {
      this.sortColumns();
    });
  }






  sortColumns() {
    // Sort the columns from left to right based on their position
    this.columns.sort((a: Column, b: Column) => {
      if (a.element.offsetLeft > b.element.offsetLeft) return 1;
      return -1;
    });
  }





  getColumnIndex(columnElement: HTMLElement) {
    // Get the index of where we will be placing this column within the row
    if (!columnElement) return 0;
    return this.columns.findIndex(x => x.element == columnElement) + 1;
  }






  buildHTML(parent: HTMLElement) {
    let row = document.createElement('div');

    // Added the classes
    row.classList.add('row');
    if (this.columns.length == 5) row.classList.add('flex-10');

    // row.style.position = 'relative';
    row.style.marginTop = this.top + 'px';

    // Fill
    if (this.fill.enable) this.fill.applyColor(row);

    // Border
    this.border.applyStyle(row);

    // Corners
    this.corners.applyStyle(row);

    // Shadow
    this.shadow.applyStyle(row);

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, row);

    parent.appendChild(row);

    this.columns.forEach((column: Column) => column.component.buildHTML(row));
  }
}
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ElementRef, Type } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
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
import { BreakpointsPaddingComponent } from '../../../classes/breakpoints-padding-component';
import { WidgetComponent } from '../widgets/widget/widget.component';
import { RowData } from '../../../classes/row-data';
import { Background } from '../../../classes/background';
import { ColumnData } from '../../../classes/column-data';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements BreakpointsComponent, BreakpointsPaddingComponent {
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
  public background: Background = new Background();
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

  getPosition() {
    return this.rowElement.nativeElement.getBoundingClientRect().y -
      this.container.containerElement.nativeElement.getBoundingClientRect().y;
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








  addColumn(widget: Type<WidgetComponent>, columnElement?: HTMLElement) {
    let columnIndex = this.getColumnIndex(columnElement);

    // Create the new column
    let columnComponent: ColumnComponent = this.createColumn(columnIndex);

    // Add the widget
    columnComponent.addWidget(widget);

    // flag that this row has been selected
    this.container.selectedRow = this;

    // Add or update each column with the correct column span based on the number of columns in this row
    this.setColumnSpans();
  }



  createColumn(index: number): ColumnComponent {
    let componentFactory = this.resolver.resolveComponentFactory(ColumnComponent);
    let columnComponentRef = this.viewContainerRef.createComponent(componentFactory, index);

    // Add this column to the column array
    this.columns.splice(index, 0, new Column(columnComponentRef.instance, columnComponentRef.location.nativeElement));


    // Set the events
    columnComponentRef.location.nativeElement.addEventListener('mouseover', columnComponentRef.instance.onMouseover.bind(columnComponentRef.instance));
    columnComponentRef.location.nativeElement.addEventListener('mouseup', () => { this.widgetService.currentWidgetCursor = null; });


    // Set the column's row as this row
    columnComponentRef.instance.row = this;

    // Detect changes
    columnComponentRef.hostView.detectChanges();

    return columnComponentRef.instance;
  }



  deleteColumn(column: ColumnComponent) {
    let columnIndex = this.columns.findIndex(x => x.component == column);
    this.viewContainerRef.remove(columnIndex);
    this.columns.splice(columnIndex, 1);
    this.widgetService.selectedWidget = null;

    if (this.columns.length > 0) {
      this.setColumnSpans();
    } else {
      this.container.deleteRow(this);
    }
  }




  setColumnSpans() {
    this.columns.forEach((column: Column) => {
      column.component.columnSpan.value = Math.max(2, Math.floor(12 / this.columns.length));
    });
  }



  getColumnIndex(columnElement: HTMLElement) {
    // Get the index of where we will be placing this column within the row
    if (!columnElement) return 0;
    return this.columns.findIndex(x => x.element == columnElement) + 1;
  }



  load(rowData: RowData) {
    this.name = rowData.name;
    this.background.load(rowData.background);
    this.border.load(rowData.border);
    this.corners.load(rowData.corners);
    this.shadow.load(rowData.shadow);
    this.padding.load(rowData.padding);
    this.verticalAlignment.load(rowData.verticalAlignment);
    this.breakpointService.loadBreakpoints(rowData.breakpoints, this);
  }


  save(rowData: RowData) {
    // Name
    if (this.name != 'Row') rowData.name = this.name;

    // Top
    rowData.top = this.getPosition();

    // Background
    this.background.save(rowData.background);

    // Border
    this.border.save(rowData.border);

    // Corners
    this.corners.save(rowData.corners);

    // Shadow
    this.shadow.save(rowData.shadow);

    // Padding
    this.padding.save(rowData.padding, this.breakpoints);
    this.breakpointService.saveBreakpoints(this.breakpoints, rowData.breakpoints, this.padding.top);
    this.breakpointService.saveBreakpoints(this.breakpoints, rowData.breakpoints, this.padding.right);
    this.breakpointService.saveBreakpoints(this.breakpoints, rowData.breakpoints, this.padding.bottom);
    this.breakpointService.saveBreakpoints(this.breakpoints, rowData.breakpoints, this.padding.left);

    // Vertical Alignment
    if (!this.breakpoints.some(x => x.breakpointObject == this.verticalAlignment)) {
      this.verticalAlignment.save(rowData);
    } else {
      this.breakpointService.saveBreakpoints(this.breakpoints, rowData.breakpoints, this.verticalAlignment);
    }

    // Save the column data for each column
    this.columns.forEach((column: Column) => {
      rowData.columns.push(new ColumnData());
      let columnData = rowData.columns[rowData.columns.length - 1];
      column.component.save(columnData);
    });
  }



  buildHTML(parent: HTMLElement) {
    let row = document.createElement('div');

    // Added the classes
    row.classList.add('row');
    if (this.columns.length == 5) row.classList.add('flex-10');

    row.style.marginTop = this.top + 'px';

    // Add background if enabled
    if (this.background.enable) this.background.applyStyles(row);

    // Border
    this.border.applyStyle(row);

    // Corners
    this.corners.applyStyle(row);

    // Shadow
    this.shadow.applyStyle(row);

    // This will add padding positions to this component (ie. top, right, bottom, left)
    this.padding.setPaddingComponent(this);

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, row);

    parent.appendChild(row);

    this.columns.forEach((column: Column) => column.component.buildHTML(row));
  }
}
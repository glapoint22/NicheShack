import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, Type } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { WidgetService } from '../../../services/widget.service';
import { WidgetComponent } from '../widgets/widget/widget.component';
import { BreakpointService } from '../../../services/breakpoint.service';
import { ColumnSpan } from '../../../classes/column-span';
import { BreakpointsComponent } from '../../../classes/breakpoints-component';
import { Breakpoint, BreakpointVerticalAlignment } from '../../../classes/breakpoint';
import { Visibility } from '../../../classes/visibility';
import { Padding } from '../../../classes/padding';
import { Corners } from '../../../classes/corners';
import { Shadow } from '../../../classes/shadow';
import { Border } from '../../../classes/border';
import { Column } from '../../../classes/column';
import { BreakpointsPaddingComponent } from '../../../classes/breakpoints-padding-component';
import { Background } from '../../../classes/background';
import { ColumnData } from '../../../classes/column-data';

@Component({
  selector: '[column]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements BreakpointsComponent, BreakpointsPaddingComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;

  public row: RowComponent;
  public widget: WidgetComponent;
  public rowHeight: number;
  public rowTop: number;
  public columnElement: HTMLElement;
  public background: Background = new Background();
  public columnSpan: ColumnSpan;
  public border: Border = new Border();
  public padding: Padding = new Padding();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public visibility = new Visibility();
  public breakpoints: Array<Breakpoint> = new Array<Breakpoint>();
  public name: string = 'Column';

  constructor(private resolver: ComponentFactoryResolver, public widgetService: WidgetService, private breakpointService: BreakpointService) { }

  ngOnInit() {
    // When a breakpoint changes, this will update any property that has a value stored in the breakpoints array
    this.breakpointService.onBreakpointChange.subscribe(() => {
      this.breakpointService.setBreakpointValues(this.breakpoints);
    });
  }


  ngAfterViewInit() {
    // Get the html column element
    this.columnElement = this.viewContainerRef.element.nativeElement.parentElement.parentElement;
    this.columnSpan = new ColumnSpan(this.columnElement);
  }

  ngDoCheck() {
    this.rowHeight = this.row.rowElement.nativeElement.clientHeight;

    // Used to position the column divider & column indicators
    if (this.widget) {
      if (this.row.verticalAlignment.value == BreakpointVerticalAlignment.Top) {
        this.rowTop = 0;
      } else {
        this.rowTop = (this.widget.height - this.rowHeight) * (this.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ? 0.5 : 1);
      }
    }
  }

  addWidget(widget: Type<WidgetComponent>) {
    // Create the new widget
    this.createWidget(widget);


    // Set this widget as the selected widget
    this.widgetService.selectedWidget = this.widget;


    // Remove all column span breakpoints
    this.row.columns.forEach((column: Column) => {
      this.breakpointService.removeAllBreakpoints(column.component.breakpoints, column.component.columnSpan);
    })

    // We need to flag that there is a breakpoint change
    this.breakpointService.onBreakpointChange.next();
  }



  createWidget(widget: Type<WidgetComponent>): WidgetComponent {
    let componentFactory = this.resolver.resolveComponentFactory(widget);
    let widgetComponentRef = this.viewContainerRef.createComponent(componentFactory);

    // Assign this widget as the new created widget
    this.widget = widgetComponentRef.instance;

    // Set the widget's column as this column
    this.widget.column = this;

    // Detect changes
    widgetComponentRef.hostView.detectChanges();

    return widgetComponentRef.instance;
  }



  onDropIndicatorEnter() {
    // Show the allowed cursor when entering the drop indicator
    if (this.widgetService.currentWidgetCursor) {
      document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidgetCursor.allowed + '"), auto'
    }
  }


  onDropIndicatorLeave() {
    // Show the not allowed cursor when leaving the drop indicator
    if (this.widgetService.currentWidgetCursor) {
      document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidgetCursor.notAllowed + '"), auto'
    }
  }

  onDropIndicatorMouseup(element: HTMLElement) {
    // Add a new column to the row with a new widget
    if (this.widgetService.currentWidgetCursor) {
      this.row.addColumn(this.widgetService.currentWidgetCursor.widget, element);
    }
  }


  onMouseover(event: MouseEvent) {
    if (this.widgetService.currentWidgetCursor) {

      // If no other column has been set, set the current column to be this column
      if (!this.widgetService.currentColumnSet) {
        this.widgetService.currentColumn = event.currentTarget as HTMLElement;
        this.widgetService.currentColumnSet = true;
      }

      // If we have reached the last column in the event chain, flag that the current column is not set
      // This basically reinitializes the currentColumnSet property
      if (this.isLastColumn(event.currentTarget as HTMLElement)) {
        this.widgetService.currentColumnSet = false;
      }

      // If a container has not been set for the mouse to be over, flag that we are over a column
      if (!this.widgetService.currentContainerSet) {
        this.widgetService.currentContainer = null;
        this.widgetService.overColumn = true;
        document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidgetCursor.notAllowed + '"), auto';
      } else {
        this.widgetService.overColumn = false;
      }
    } 
  }


  isLastColumn(element: HTMLElement): boolean {
    while (element.parentElement.getAttribute('column') == null && !element.parentElement.classList.contains('content')) {
      element = element.parentElement;
    }

    return element.parentElement.classList.contains('content');
  }




  load(columnData: ColumnData) {
    this.name = columnData.name;
    this.background.load(columnData.background);
    this.border.load(columnData.border);
    this.corners.load(columnData.corners);
    this.shadow.load(columnData.shadow);
    this.padding.load(columnData.padding);
    this.breakpointService.loadBreakpoints(columnData.breakpoints, this);
    this.columnSpan.value = columnData.columnSpan;
  }


  save(columnData: ColumnData) {
    // Name
    if (this.name != 'Column') columnData.name = this.name;

    // Background
    this.background.save(columnData.background);

    // Border
    this.border.save(columnData.border);

    // Corners
    this.corners.save(columnData.corners);

    // Shadow
    this.shadow.save(columnData.shadow);

    // Padding
    this.padding.save(columnData.padding, this.breakpoints);
    this.breakpointService.saveBreakpoints(this.breakpoints, columnData.breakpoints, this.padding.top);
    this.breakpointService.saveBreakpoints(this.breakpoints, columnData.breakpoints, this.padding.right);
    this.breakpointService.saveBreakpoints(this.breakpoints, columnData.breakpoints, this.padding.bottom);
    this.breakpointService.saveBreakpoints(this.breakpoints, columnData.breakpoints, this.padding.left);

    // Column Span
    columnData.columnSpan = this.columnSpan.value;


    // Visibility
    this.breakpointService.saveBreakpoints(this.breakpoints, columnData.breakpoints, this.visibility);

    // Save the widget data
    this.widget.save(columnData);
  }


  buildHTML(parent: HTMLElement) {
    let col = document.createElement('div');

    // If there are not any breakpoints set, set the class with the current col class
    if (!this.breakpoints.find(x => x.breakpointObject == this.columnSpan)) {
      col.className = this.columnElement.className;
    }

    // This will add padding positions to this component (ie. top, right, bottom, left)
    this.padding.setPaddingComponent(this);

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, col);

    parent.appendChild(col);

    this.widget.buildHTML(col);
  }
}
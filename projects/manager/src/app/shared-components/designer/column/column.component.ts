import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, Type } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { WidgetComponent } from '../widgets/widget/widget.component';
import { BreakpointService } from '../../../services/breakpoint.service';
import { ColumnSpan } from '../../../classes/column-span';
import { BreakpointsComponent } from '../../../classes/breakpoints-component';
import { Padding } from '../../../classes/padding';
import { Corners } from '../../../classes/corners';
import { Shadow } from '../../../classes/shadow';
import { Border } from '../../../classes/border';
import { Column } from '../../../classes/column';
import { BreakpointsPaddingComponent } from '../../../classes/breakpoints-padding-component';
import { Background } from '../../../classes/background';
import { ColumnData } from '../../../classes/column-data';
import { PropertyView } from '../../../classes/property-view';
import { BreakpointData } from 'classes/breakpoint-data';
import { Breakpoint } from 'projects/manager/src/app/classes/breakpoint';
import { VerticalAlign } from 'classes/vertical-align';
import { Display } from '../../../classes/display';

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
  public display: Display = new Display();
  public breakpoints: Array<Breakpoint> = new Array<Breakpoint>();
  public name: string = 'Column';

  constructor(private resolver: ComponentFactoryResolver, private breakpointService: BreakpointService) { }

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
      if (this.row.verticalAlignment.value == VerticalAlign.Top) {
        this.rowTop = 0;
      } else {
        this.rowTop = (this.widget.height - this.rowHeight) * (this.row.verticalAlignment.value == VerticalAlign.Middle ? 0.5 : 1);
      }
    }
  }

  addWidget(widget: Type<WidgetComponent>) {
    // Create the new widget
    this.createWidget(widget);


    // Set this widget as the selected widget
    this.row.pageService.selectedWidget = this.widget;


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
    if (this.row.pageService.currentWidgetCursor) {
      document.body.style.cursor = 'url("assets/' + this.row.pageService.currentWidgetCursor.allowed + '"), auto'
    }
  }


  onDropIndicatorLeave() {
    // Show the not allowed cursor when leaving the drop indicator
    if (this.row.pageService.currentWidgetCursor) {
      document.body.style.cursor = 'url("assets/' + this.row.pageService.currentWidgetCursor.notAllowed + '"), auto'
    }
  }

  onDropIndicatorMouseup(element: HTMLElement) {
    // Add a new column to the row with a new widget
    if (this.row.pageService.currentWidgetCursor) {
      this.row.addColumn(this.row.pageService.currentWidgetCursor.widget, element);
    }
  }


  onMouseover(event: MouseEvent) {
    if (this.row.pageService.currentWidgetCursor) {

      // If no other column has been set, set the current column to be this column
      if (!this.row.pageService.widgetCursorIsOverColumn) {
        this.row.pageService.currentColumnWidgetCursorIsOver = event.currentTarget as HTMLElement;
        this.row.pageService.widgetCursorIsOverColumn = true;
      }

      // If we have reached the last column in the event chain, flag that the current column is not set
      // This basically reinitializes the widgetCursorIsOverColumn property
      if (this.isLastColumn(event.currentTarget as HTMLElement)) {
        this.row.pageService.widgetCursorIsOverColumn = false;
      }

      // If a container has not been set for the mouse to be over, flag that we are over a column
      if (!this.row.pageService.widgetCursorIsOverContainer) {
        this.row.pageService.currentContainerWidgetCursorIsOver = null;
        this.row.pageService.overColumn = true;
        document.body.style.cursor = 'url("assets/' + this.row.pageService.currentWidgetCursor.notAllowed + '"), auto';
      } else {
        this.row.pageService.overColumn = false;
      }
    }
  }


  isLastColumn(element: HTMLElement): boolean {
    while (element.parentElement.getAttribute('column') == null && !element.parentElement.classList.contains('content')) {
      element = element.parentElement;
    }

    return element.parentElement.classList.contains('content');
  }




  setData(columnData: ColumnData) {
    this.name = columnData.name;
    this.background.setData(columnData.background);
    this.border.setData(columnData.border);
    this.corners.setData(columnData.corners);
    this.shadow.setData(columnData.shadow);
    this.padding.setData(columnData.padding);
    this.breakpointService.loadBreakpoints(columnData.breakpoints, this);
    this.columnSpan.value = columnData.columnSpan;
  }


  getData(): ColumnData {
    return {
      name: this.name != 'Column' ? this.name : null,
      background: this.background.getData(),
      border: this.border.getData(),
      corners: this.corners.getData(),
      shadow: this.shadow.getData(),
      padding: this.padding.getData(this.breakpoints),
      columnSpan: !this.breakpoints.find(x => x.breakpointObject == this.columnSpan) ? this.columnSpan.value : null,
      breakpoints: this.getBreakpoints(),
      widgetData: this.widget.getData()
    }
  }




  getBreakpoints(): Array<BreakpointData> {
    let breakpointData: Array<BreakpointData> = [];

    // Padding
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.top);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.right);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.bottom);
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.padding.left);

    // Visibility
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.display);


    // Column Span
    this.breakpointService.saveBreakpoints(this.breakpoints, breakpointData, this.columnSpan);

    return breakpointData;
  }




  buildPreview(parent: HTMLElement) {
    let column = document.createElement('div');

    // Add column span, display, and padding classes to the column element
    this.columnSpan.addClasses(this.breakpoints, column, this.columnSpan.value);
    this.display.addClasses(this.breakpoints, column);
    this.padding.addClasses(this.breakpoints, column, this.padding.getValues());

    parent.appendChild(column);

    this.widget.buildPreview(column);
  }


  onClick(event: MouseEvent) {
    event.stopPropagation();
    if (document.body.id == 'widget-resize' || document.body.id == 'row-move') return;
    this.row.pageService.propertyView = PropertyView.Column;
    this.row.pageService.selectedColumn = this;
    this.row.pageService.selectedWidget = this.widget;
    this.row.pageService.selectedRow = this.row;
  }
}
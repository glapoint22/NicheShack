import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { WidgetService } from '../../../services/widget.service';
import { WidgetComponent } from '../widgets/widget/widget.component';
import { BreakpointService } from '../../../services/breakpoint.service';
import { ColumnSpan } from '../../../classes/column-span';
import { BreakpointsComponent } from '../../../classes/breakpoints-component';
import { Breakpoint } from '../../../classes/breakpoint';
import { PaddingTop } from '../../../classes/padding-top';
import { PaddingRight } from '../../../classes/padding-right';
import { PaddingBottom } from '../../../classes/padding-bottom';
import { PaddingLeft } from '../../../classes/padding-left';
import { Visibility } from '../../../classes/visibility';

@Component({
  selector: '[column]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements BreakpointsComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;

  public row: RowComponent;
  public widget: WidgetComponent;
  public rowHeight: number;
  public columnElement: HTMLElement;
  private resizeButtonMousedown: boolean;
  public columnSpan: ColumnSpan;
  public paddingTop: PaddingTop = new PaddingTop();
  public paddingRight: PaddingRight = new PaddingRight();
  public paddingBottom: PaddingBottom = new PaddingBottom();
  public paddingLeft: PaddingLeft = new PaddingLeft();
  public visibility = new Visibility();
  public breakpoints: Array<Breakpoint> = new Array<Breakpoint>();

  constructor(private resolver: ComponentFactoryResolver, public widgetService: WidgetService, private breakpointService: BreakpointService) { }

  ngOnInit() {
    this.breakpointService.onBreakpointChange.subscribe((screenSize: string) => {
      this.breakpointService.setBreakpointValues(this.breakpoints, screenSize);
    });
  }


  ngAfterViewInit() {
    // Get the html column element
    this.columnElement = this.viewContainerRef.element.nativeElement.parentElement;
    this.columnSpan = new ColumnSpan(this.columnElement);
  }

  ngDoCheck() {
    // This will add or remove the "column-indicator-container" class to the column.
    // By adding this class, it will enable the column indicators to be visible
    if (this.columnElement) {
      if (this.widgetService.currentWidgetCursor && this.widgetService.currentColumn == this.columnElement && this.row.columns.length < 6) {
        this.columnElement.classList.add('column-indicator-container');
      } else {
        this.columnElement.classList.remove('column-indicator-container');
      }

      // Update padding
      this.columnElement.style.paddingTop = this.paddingTop.value;
      this.columnElement.style.paddingRight = this.paddingRight.value;
      this.columnElement.style.paddingBottom = this.paddingBottom.value;
      this.columnElement.style.paddingLeft = this.paddingLeft.value;

      // Update display for visibility
      this.columnElement.style.display = this.visibility.value;
    }

    // Used to size the column divider & column indicators
    this.rowHeight = this.row.rowElement.nativeElement.clientHeight;
  }

  addWidget() {
    let componentFactory = this.resolver.resolveComponentFactory(this.widgetService.currentWidgetCursor.component);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);

    // Set this component as the selected component
    this.widgetService.selectedWidget = this.widget = componentRef.instance;

    // Set the widget's column as this column
    this.widget.column = this;
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
      this.row.addColumn(element);
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
    } else {
      let resizeButton = this.getPreiviousColumnResizeButton();

      // Display the previous column's resize button when we hover over this column
      if (resizeButton) resizeButton.style.display = 'flex';
    }
  }


  getPreiviousColumnResizeButton(): HTMLElement {
    let previousColumn = this.columnElement.previousElementSibling;

    // If there is no previous column, return
    if (!previousColumn) return null;

    let resizeButtons = previousColumn.querySelectorAll('.resize-button');

    // If there are no resize buttons, return
    if (resizeButtons.length == 0) return null;

    // Return the last resize button in the array, which is the previous resize button
    return resizeButtons[resizeButtons.length - 1] as HTMLElement;
  }

  onMouseleave() {
    if (!this.widgetService.currentWidgetCursor) {
      let resizeButton = this.getPreiviousColumnResizeButton();

      // Hide the previous column's resize button when we leave this column
      if (resizeButton) resizeButton.removeAttribute('style');
    }
  }

  isLastColumn(element: HTMLElement): boolean {
    while (element.parentElement.getAttribute('column') == null && !element.parentElement.classList.contains('content')) {
      element = element.parentElement;
    }

    return element.parentElement.classList.contains('content');
  }


  onResizeButtonMouseover() {
    if (!this.widgetService.currentWidgetCursor) {
      document.body.id = 'column-resize';
    }
  }


  onResizeButtonMouseleave() {
    if (!this.widgetService.currentWidgetCursor && !this.resizeButtonMousedown) {
      document.body.removeAttribute('id');
    }
  }




  onResizeButtonMousedown() {
    // Get the current column position and the number of columns in this row
    let columnPos = this.columnElement.getBoundingClientRect().left;
    let columnCount = this.row.columns.length;

    // Get the width of the row
    let rowWidth = this.row.rowElement.nativeElement.getBoundingClientRect().width;

    // Get the max column span the columns get span accross
    let maxColumnSpan = columnCount == 5 ? 10 : 12;

    let index = this.row.columns.findIndex(x => x.component == this) + 1;
    let nextColumn: ColumnComponent = this.row.columns[index].component;
    let colspanOffset = maxColumnSpan - (this.columnSpan.value + nextColumn.columnSpan.value);

    this.resizeButtonMousedown = true;
    document.body.style.cursor = 'e-resize';


    let onMousemove = (e: MouseEvent) => {
      let mouseColumnOffset = e.clientX - columnPos;
      let percent = mouseColumnOffset / (rowWidth / columnCount);
      let columnSpan = Math.max(Math.ceil(percent * (maxColumnSpan / columnCount)), 1);
      let nextElementSiblingColumnSpan = Math.max(maxColumnSpan - columnSpan - colspanOffset, 1);
      let totalColumnSpan = nextElementSiblingColumnSpan + colspanOffset + columnSpan;

      if (this.columnSpan.value != columnSpan && totalColumnSpan <= maxColumnSpan) {
        // Update the column spans
        this.columnSpan.value = columnSpan;
        nextColumn.columnSpan.value = nextElementSiblingColumnSpan;
      }
    }

    // Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
      document.body.removeAttribute('style');
      document.body.removeAttribute('id');
      this.resizeButtonMousedown = false;
    }

    // Add the listeners
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }

  buildHTML(parent: HTMLElement) {
    let col = document.createElement('div');

    // If there are not any breakpoints set, set the class with the current col class
    if (!this.breakpoints.find(x => x.type == this.columnSpan)) {
      col.className = this.columnElement.className;
    }

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, col);

    parent.appendChild(col);

    this.widget.buildHTML(col);
  }
}
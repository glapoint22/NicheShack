import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { WidgetService } from '../../../services/widget.service';
import { WidgetComponent } from '../widgets/widget/widget.component';

@Component({
  selector: '[column]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;

  public row: RowComponent;
  public widget: WidgetComponent;
  public rowHeight: number;
  private columnElement: HTMLElement;
  private resizeButtonMousedown: boolean;


  constructor(private resolver: ComponentFactoryResolver, public widgetService: WidgetService) { }

  ngAfterViewInit() {
    // Get the html column element
    this.columnElement = this.viewContainerRef.element.nativeElement.parentElement;
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




  onResizeButtonMousedown(event: any) {
    this.resizeButtonMousedown = true;
    // document.body.id = 'column-resize';
    document.body.style.cursor = 'e-resize';

    // Get column and row elements
    let column: HTMLElement = event.currentTarget.parentElement.parentElement;
    let row = column.parentElement;

    // Get the current column position and the number of columns in this row
    let columnPos = column.getBoundingClientRect().left;
    let columnCount = this.row.columns.length;

    // Get the width of the row
    let rowWidth = row.getBoundingClientRect().width;

    // Get the max column span the columns get span accross
    let maxColumnSpan = columnCount == 5 ? 10 : 12;



    let patt = new RegExp(/\d+/g);
    let colspan1: number = Number.parseInt(patt.exec(column.className)[0]);
    patt = new RegExp(/\d+/g);
    let colspan2: number = Number.parseInt(patt.exec(column.nextElementSibling.className)[0]);
    let colspanOffset = maxColumnSpan - (colspan1 + colspan2);




    let onMousemove = (e: MouseEvent) => {
      let mouseColumnOffset = e.clientX - columnPos;
      let percent = mouseColumnOffset / (rowWidth / columnCount);
      let columnSpan = Math.max(Math.ceil(percent * (maxColumnSpan / columnCount)), 1);
      let nextElementSiblingColumnSpan = Math.max(maxColumnSpan - columnSpan - colspanOffset, 1);
      let totalColumnSpan = nextElementSiblingColumnSpan + colspanOffset + columnSpan;

      if (column.className != 'col-' + columnSpan && totalColumnSpan <= maxColumnSpan) {
        column.className = '';
        column.classList.add('col-' + columnSpan);
        column.nextElementSibling.className = '';
        column.nextElementSibling.classList.add('col-' + nextElementSiblingColumnSpan);
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

    col.className = this.columnElement.className;
    parent.appendChild(col);

    this.widget.buildHTML(col);
  }
}
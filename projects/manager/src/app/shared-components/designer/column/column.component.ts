import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
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

  constructor(private resolver: ComponentFactoryResolver, public widgetService: WidgetService) { }

  addWidget() {
    let componentFactory = this.resolver.resolveComponentFactory(this.widgetService.currentWidgetCursor.component);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);

    // Set this component as the selected component
    this.widgetService.selectedWidget = this.widget = componentRef.instance;

    this.widget.onHeightChangeTop.subscribe((delta: number) => {
      this.row.top -= delta;
      this.row.onRowSelected.emit(this.row);
      this.row.shiftRows.emit(-1);
    });

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

  onMouseenter() {
    if (this.widgetService.currentWidgetCursor) {
      document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidgetCursor.notAllowed + '"), auto';
      document.body.classList.add('over-row');
    }
  }

  onResizeButtonMousedown(event: any) {
    // Get column and row elements
    let column: HTMLElement = event.currentTarget.parentElement;
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

    }

    // Add the listeners
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }
}
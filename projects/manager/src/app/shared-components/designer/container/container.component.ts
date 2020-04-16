import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ElementRef } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { WidgetService } from '../../../services/widget.service';
import { Row } from '../../../classes/row';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @ViewChild('container', { static: false }) containerElement: ElementRef;
  public rows: Array<Row> = new Array<Row>();
  public selectedRowIndex: number;
  private _selectedRow: RowComponent;
  public set selectedRow(row: RowComponent) {
    this.selectedRowIndex = this.rows.findIndex(x => x.component == row);
    this._selectedRow = row;
  }

  public get selectedRow() {
    return this._selectedRow;
  }

  public width: number;


  constructor(private resolver: ComponentFactoryResolver, public widgetService: WidgetService) { }

  onMouseup(event) {
    if (this.widgetService.currentWidgetCursor) this.addRow(event.y - event.currentTarget.getBoundingClientRect().y);
  }

  addRow(position: number) {
    // Get the new row index based on the position
    let newRowIndex = this.rows.findIndex(x => this.getBoundingClientTop(x) > position);
    if (newRowIndex == -1) newRowIndex = this.rows.length;

    // Create the new row
    let rowComponentFactory: ComponentFactory<RowComponent> = this.resolver.resolveComponentFactory(RowComponent);
    let rowComponentRef: ComponentRef<RowComponent> = this.viewContainerRef.createComponent(rowComponentFactory, newRowIndex);

    // Add this new row to the rows array
    this.rows.splice(newRowIndex, 0, new Row(rowComponentRef.instance, rowComponentRef.location.nativeElement.firstElementChild));

    // Set the position of the row
    if (newRowIndex == 0) {
      rowComponentRef.instance.top = position;
    } else {
      rowComponentRef.instance.top = position - this.getBoundingClientTop(this.rows[newRowIndex - 1]) - this.rows[newRowIndex - 1].element.clientHeight;
    }


    // Set that the row's container is this container
    rowComponentRef.instance.container = this;


    // Add the column
    rowComponentRef.hostView.detectChanges();
    rowComponentRef.instance.addColumn();


    // Set the selected row as this row
    this.selectedRow = rowComponentRef.instance;

    if (this.selectedRowIndex != this.rows.length - 1) {
      let rowBottom = this.rows[this.selectedRowIndex].component.top + this.rows[this.selectedRowIndex].element.clientHeight;
      this.rows[this.selectedRowIndex + 1].component.top -= rowBottom;
    }

  }


  getBoundingClientTop(row: Row) {
    return row.element.getBoundingClientRect().top - this.containerElement.nativeElement.getBoundingClientRect().top;
  }



  setSelectedRowMinTop() {
    if (this.selectedRowIndex == 0) {
      // Set min position at zero when the selected row is the first row
      this.rows[0].component.top = Math.max(0, this.rows[0].component.top);
    } else {
      // Set the selected row min position at the previous row's bottom
      this.rows[this.selectedRowIndex].component.top = Math.max(this.rows[this.selectedRowIndex - 1].component.top +
        this.rows[this.selectedRowIndex - 1].element.firstElementChild.clientHeight, this.rows[this.selectedRowIndex].component.top);
    }
  }


  onMouseover() {
    if (this.widgetService.currentWidgetCursor) {

      // If a container has not been set and the mouse is not over a column, set this container as the current container
      if (!this.widgetService.currentContainerSet && !this.widgetService.overColumn) {
        this.widgetService.currentContainerSet = true;
        this.widgetService.currentContainer = this.containerElement.nativeElement;
        document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidgetCursor.allowed + '"), auto';
      }

      // If we have reached the last container in the event chain, flag that the current container is not set and we are not over a column
      // This basically reinitializes the currentContainerSet and overColumn properties
      if (this.isLastContainer(this.containerElement.nativeElement)) {
        this.widgetService.currentContainerSet = false;
        this.widgetService.overColumn = false;
      }
    }
  }

  onMouseleave() {
    if (this.widgetService.currentWidgetCursor) {
      document.body.style.cursor = 'url("assets/' + this.widgetService.currentWidgetCursor.notAllowed + '"), auto';
    }
  }

  isLastContainer(element: HTMLElement): boolean {
    while (!element.parentElement.classList.contains('grid') && !element.parentElement.classList.contains('content')) {
      element = element.parentElement;
    }

    return element.parentElement.classList.contains('content');
  }

  buildHTML(parent: HTMLElement) {
    let grid = document.createElement('div');

    grid.style.maxWidth = this.width + 'px';

    grid.style.display = 'flex';
    grid.style.flexDirection = 'column';

    // Append to the parent and add the rows
    parent.appendChild(grid);
    this.rows.forEach((row: Row) => row.component.buildHTML(grid));
  }
}
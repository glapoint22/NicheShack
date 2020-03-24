import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ElementRef } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { WidgetService } from '../../../services/widget.service';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @ViewChild('container', { static: false }) containerElement: ElementRef;
  public rows: Array<ComponentRef<RowComponent>> = new Array<ComponentRef<RowComponent>>();
  private selectedRowIndex: number;
  private _selectedRow: RowComponent;
  public set selectedRow(row: RowComponent) {
    this.selectedRowIndex = this.rows.findIndex(x => x.instance == row);
    this._selectedRow = row;
  }

  public get selectedRow() {
    return this._selectedRow;
  }
  


  constructor(private resolver: ComponentFactoryResolver, public widgetService: WidgetService) { }

  onMouseup(event) {
    if (this.widgetService.currentWidgetCursor) this.addRow(event.y - event.currentTarget.getBoundingClientRect().y);
  }

  addRow(position: number) {
    let rowComponentFactory: ComponentFactory<RowComponent> = this.resolver.resolveComponentFactory(RowComponent);
    let rowComponentRef: ComponentRef<RowComponent> = this.viewContainerRef.createComponent(rowComponentFactory);
    this.rows.push(rowComponentRef);


    // Set the position of the row
    rowComponentRef.instance.top = position;

    rowComponentRef.instance.container = this;

    // Sort the rows by position (top to bottom)
    this.sortRows();

    // Add the column
    rowComponentRef.hostView.detectChanges();
    rowComponentRef.instance.addColumn();

    

    // Set the selected row as this row
    this.selectedRow = rowComponentRef.instance;
  }


  setSelectedRowMinTop() {
    if (this.selectedRowIndex == 0) {
      // Set min position at zero when the selected row is the first row
      this.rows[0].instance.top = Math.max(0, this.rows[0].instance.top);
    } else {
      // Set the selected row min position at the previous row's bottom
      this.rows[this.selectedRowIndex].instance.top = Math.max(this.rows[this.selectedRowIndex - 1].instance.top +
        this.rows[this.selectedRowIndex - 1].location.nativeElement.firstElementChild.clientHeight, this.rows[this.selectedRowIndex].instance.top);
    }
  }

  sortRows() {
    this.rows.sort((a, b) => {
      if (a.instance.top > b.instance.top) return 1;
      return -1;
    });
  }

  collisionDown() {
    for (let i = this.selectedRowIndex; i < this.rows.length - 1; i++) {
      if (this.rows[i].instance.top + this.rows[i].location.nativeElement.firstElementChild.clientHeight > this.rows[i + 1].instance.top) {
        this.rows[i + 1].instance.top = this.rows[i].instance.top + this.rows[i].location.nativeElement.firstElementChild.clientHeight;
      }
    }

    this.setSelectedRowMinTop();
  }

  collisionUp() {
    for (let i = this.selectedRowIndex; i > 0; i--) {
      if (this.rows[i].instance.top < this.rows[i - 1].instance.top + this.rows[i - 1].location.nativeElement.firstElementChild.clientHeight) {
        this.rows[i - 1].instance.top = this.rows[i].instance.top - this.rows[i - 1].location.nativeElement.firstElementChild.clientHeight;

        // Make sure we can't shift the rows below zero
        if (this.rows[0].instance.top < 0) {
          let diff = -this.rows[0].instance.top;
          for (let j = 0; j < this.selectedRowIndex + 1; j++) {
            this.rows[j].instance.top = this.rows[j].instance.top + diff;
          }
        }
      }
    }

    this.setSelectedRowMinTop();
  }
}
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, Input } from '@angular/core';
import { RowComponent } from '../row/row.component';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @Input() currentWidget: any;
  private rows: Array<ComponentRef<RowComponent>> = new Array<ComponentRef<RowComponent>>();

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }


  createRow(event) {
    if(!this.currentWidget) return;

    let widgetComponentFactory = this.resolver.resolveComponentFactory(this.currentWidget);
    let widget = widgetComponentFactory.create(this.viewContainerRef.injector);
    widget.changeDetectorRef.detectChanges();


    // Add the row to the viewContainerRef and rows array
    let rowComponentFactory: ComponentFactory<RowComponent> = this.resolver.resolveComponentFactory(RowComponent);
    let row: ComponentRef<RowComponent> = this.viewContainerRef.createComponent(rowComponentFactory, null, null, [[widget.location.nativeElement]]);
    let selectedRowIndex: number;
    this.rows.push(row);

    this.currentWidget = null;


    // Set the position of the row
    row.instance.top = event.y - event.target.getBoundingClientRect().y;


    // Sort the rows by position (top to bottom)
    this.sortRows();

    // Shift any row that is below the new row
    this.shiftRowsDown(this.rows.findIndex(x => x == row));

    // Get the selected row
    row.instance.onRowSelected.subscribe((row: RowComponent) => {
      selectedRowIndex = this.rows.findIndex(x => x.instance == row);
    });

    // Check collision when a row moves
    row.instance.onRowMove.subscribe((direction: number) => {
      if (direction == 1) {
        this.shiftRowsDown(selectedRowIndex);
      } else {
        this.shiftRowsUp(selectedRowIndex);
      }


      if (selectedRowIndex == 0) {
        // Set min position at zero when the selected row is the first row
        this.rows[0].instance.top = Math.max(0, this.rows[0].instance.top);
      } else {
        // Set the selected row min position at the previous row's extents
        this.rows[selectedRowIndex].instance.top = Math.max(this.rows[selectedRowIndex - 1].instance.top +
          this.rows[selectedRowIndex - 1].location.nativeElement.firstElementChild.clientHeight, this.rows[selectedRowIndex].instance.top);
      }
    });
  }

  sortRows() {
    this.rows.sort((a, b) => {
      if (a.instance.top > b.instance.top) return 1;
      return -1;
    });
  }

  shiftRowsDown(startingIndex: number) {
    for (let i = startingIndex; i < this.rows.length - 1; i++) {
      if (this.rows[i].instance.top + this.rows[i].location.nativeElement.firstElementChild.clientHeight > this.rows[i + 1].instance.top) {
        this.rows[i + 1].instance.top = this.rows[i].instance.top + this.rows[i].location.nativeElement.firstElementChild.clientHeight;
      }
    }
  }

  shiftRowsUp(startingIndex: number) {
    for (let i = startingIndex; i > 0; i--) {
      if (this.rows[i].instance.top < this.rows[i - 1].instance.top + this.rows[i - 1].location.nativeElement.firstElementChild.clientHeight) {
        this.rows[i - 1].instance.top = this.rows[i].instance.top - this.rows[i - 1].location.nativeElement.firstElementChild.clientHeight;

        // Make sure we can't shift the rows past zero
        if (this.rows[0].instance.top < 0) {
          let diff = -this.rows[0].instance.top;
          for (let j = 0; j < startingIndex + 1; j++) {
            this.rows[j].instance.top = this.rows[j].instance.top + diff;
          }
        }
      }
    }
  }
}

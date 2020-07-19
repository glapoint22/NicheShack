import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ElementRef, Output, EventEmitter, Type } from '@angular/core';
import { RowComponent } from '../row/row.component';
import { Row } from '../../../classes/row';
import { WidgetComponent } from '../widgets/widget/widget.component';
import { RowData } from '../../../classes/row-data';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @ViewChild('container', { static: false }) containerElement: ElementRef;
  @Output() onRowTransform: EventEmitter<number> = new EventEmitter();
  public rows: Array<Row> = new Array<Row>();
  public selectedRowIndex: number;
  public width: number;

  // SelectedRow property
  private _selectedRow: RowComponent;
  public set selectedRow(row: RowComponent) {
    this.selectedRowIndex = this.rows.findIndex(x => x.component == row);
    this._selectedRow = row;
  }

  public get selectedRow() {
    return this._selectedRow;
  }



  constructor(
    private resolver: ComponentFactoryResolver,
    public pageService: PageService
  ) { }



  onMouseup(event) {
    if (this.pageService.currentWidgetCursor) this.addRow(event.y - event.currentTarget.getBoundingClientRect().y, this.pageService.currentWidgetCursor.widget);
  }



  addRow(top: number, widget: Type<WidgetComponent>) {
    // Get the new row index based on the position
    let rowIndex = this.rows.findIndex(x => this.getBoundingClientTop(x) > top);
    if (rowIndex == -1) rowIndex = this.rows.length;

    // Create the new row
    let rowComponent = this.createRow(rowIndex, top);

    // Set the selected row as this row
    this.selectedRow = rowComponent;


    // Add the column
    rowComponent.addColumn(widget);



    // This will adjust the top to prevent rows below from moving
    if (this.selectedRowIndex != this.rows.length - 1) {
      let rowBottom = this.rows[this.selectedRowIndex].component.top + this.rows[this.selectedRowIndex].element.clientHeight;
      this.rows[this.selectedRowIndex + 1].component.top -= rowBottom;
    }
  }



  createRow(index: number, top: number): RowComponent {
    // Create the new row
    let rowComponentFactory: ComponentFactory<RowComponent> = this.resolver.resolveComponentFactory(RowComponent);
    let rowComponentRef: ComponentRef<RowComponent> = this.viewContainerRef.createComponent(rowComponentFactory, index);

    // Add this new row to the rows array
    this.rows.splice(index, 0, new Row(rowComponentRef.instance, rowComponentRef.location.nativeElement.firstElementChild));

    // Set the position of the row
    if (index == 0) {
      rowComponentRef.instance.top = top;
    } else {
      rowComponentRef.instance.top = top - this.getBoundingClientTop(this.rows[index - 1]) - this.rows[index - 1].element.clientHeight;
    }

    // Detect changes
    rowComponentRef.hostView.detectChanges();

    // Set the row's container as this container
    rowComponentRef.instance.container = this;

    return rowComponentRef.instance;
  }


  deleteRow(row: RowComponent) {
    let rowIndex: number = this.rows.findIndex(x => x.component == row);
    let lastRow: boolean = rowIndex == this.rows.length - 1;

    // If not the last row, we need to calculate the top of the next row
    if (!lastRow) {
      if (rowIndex == 0) {
        this.rows[rowIndex + 1].component.top = this.rows[rowIndex + 1].component.getPosition();
      } else {
        let pos1: number = this.rows[rowIndex - 1].component.getPosition() + this.rows[rowIndex - 1].element.getBoundingClientRect().height;
        let pos2: number = this.rows[rowIndex + 1].component.getPosition();

        this.rows[rowIndex + 1].component.top = pos2 - pos1;
      }
    }


    // Remove the row
    this.viewContainerRef.remove(rowIndex);
    this.rows.splice(rowIndex, 1);

    // Select the page and save
    this.pageService.selectPage();
    this.save();
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
    if (this.pageService.currentWidgetCursor) {

      // If a container has not been set and the mouse is not over a column, set this container as the current container
      if (!this.pageService.widgetCursorIsOverContainer && !this.pageService.overColumn) {
        this.pageService.widgetCursorIsOverContainer = true;
        this.pageService.currentContainerWidgetCursorIsOver = this.containerElement.nativeElement;
        document.body.style.cursor = 'url("assets/' + this.pageService.currentWidgetCursor.allowed + '"), auto';
      }

      // If we have reached the last container in the event chain, flag that the current container is not set and we are not over a column
      // This basically reinitializes the widgetCursorIsOverContainer and overColumn properties
      if (this.isLastContainer(this.containerElement.nativeElement)) {
        this.pageService.widgetCursorIsOverContainer = false;
        this.pageService.overColumn = false;
      }
    }
  }

  onMouseleave() {
    if (this.pageService.currentWidgetCursor) {
      document.body.style.cursor = 'url("assets/' + this.pageService.currentWidgetCursor.notAllowed + '"), auto';
    }
  }

  isLastContainer(element: HTMLElement): boolean {
    while (!element.parentElement.classList.contains('grid') && !element.parentElement.classList.contains('content')) {
      element = element.parentElement;
    }

    return element.parentElement.classList.contains('content');
  }

  buildHTML(parent: HTMLElement) {
    let div: HTMLDivElement = document.createElement('div');

    // Add the styles
    div.style.maxWidth = this.width + 'px';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';

    // Append to the parent and add the rows
    parent.appendChild(div);
    this.rows.forEach((row: Row) => row.component.buildHTML(div));
  }

  getData(rows: Array<RowData>) {
    if (this.rows.length > 0) {
      this.rows.forEach((row: Row) => {
        rows.push(new RowData());
        let rowData: RowData = rows[rows.length - 1];
        row.component.getData(rowData);
      });
    }
  }

  save() {
    // Save the page
    this.pageService.save();
  }
}
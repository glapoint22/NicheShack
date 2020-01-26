import { Component, Output, EventEmitter, ComponentFactoryResolver, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { FormService } from '../../../services/form.service';
import { FillColor } from '../../../classes/fill-color';
import { Border } from '../../../classes/border';
import { Corners } from '../../../classes/corners';
import { Shadow } from '../../../classes/shadow';
import { Spacing } from '../../../classes/spacing';
import { Align } from '../../../classes/align';
import { ColumnComponent } from '../column/column.component';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @ViewChild('row', { static: false }) rowElement: ElementRef;
  public top: number;
  public columns: Array<HTMLElement> = new Array<HTMLElement>();
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public padding: Spacing = new Spacing();
  public align: Align = new Align();
  public container: ContainerComponent;

  constructor(private resolver: ComponentFactoryResolver, public widgetService: WidgetService, public _FormService: FormService) { }


  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.shadow = this.shadow;
    this._FormService.padding = this.padding;
    this._FormService.align = this.align;

    // Open the container form
    this._FormService.showRowForm = true;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    return this._FormService.RGBAToHexA(this.border.color.r, this.border.color.g, this.border.color.b, this.border.color.a);
  }


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return this._FormService.RGBAToHexA(this.shadow.color.r, this.shadow.color.g, this.shadow.color.b, this.shadow.color.a);
  }



  onRowMoveMousedown(event) {
    let offset = event.clientY - this.top;
    let currentPos = this.top;

    // flag that this row has been selected
    this.container.selectedRow = this;

    document.body.style.cursor = 'move';

    // Mousemove
    let onMousemove = (e: MouseEvent) => {
      this.top = e.clientY - offset;

      let delta = this.top - currentPos;
      currentPos = this.top;

      // Shift neighboring rows up or down if this rows collides with them
      this.container.shiftRows(Math.sign(delta));
    }

    // Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
      document.body.removeAttribute('style');
    }

    // Add the listeners
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }


  addColumn(columnElement?: HTMLElement) {
    let componentFactory = this.resolver.resolveComponentFactory(ColumnComponent);
    let columnComponentRef = this.viewContainerRef.createComponent(componentFactory, this.getColumnIndex(columnElement));

    // Add this column to the columns array
    this.columns.push(columnComponentRef.location.nativeElement);

    

    // Add or update each column with the correct col class based on the number of columns in this row
    this.columns.forEach((column: HTMLElement) => {
      column.setAttribute('class', 'col-' + Math.max(2, Math.floor(12 / this.columns.length)));
    });

    // Set the column's row as this row
    columnComponentRef.instance.row = this;

    // Add the widget
    columnComponentRef.hostView.detectChanges();
    columnComponentRef.instance.addWidget();
    columnComponentRef.hostView.detectChanges();

    this.sortColumns();

    // Set the events
    columnComponentRef.location.nativeElement.addEventListener('mouseenter', columnComponentRef.instance.onMouseenter.bind(this));
    columnComponentRef.location.nativeElement.addEventListener('mouseup', () => { this.widgetService.currentWidgetCursor = null; });

    // flag that this row has been selected
    this.container.selectedRow = this;

    // Shift rows down if this row collides with its neighboring rows
    this.container.shiftRowsDown();
  }


  sortColumns() {
    // Sort the columns from left to right based on their position
    this.columns.sort((a: HTMLElement, b: HTMLElement) => {
      if (a.offsetLeft > b.offsetLeft) return 1;
      return -1;
    });
  }


  getColumnIndex(columnElement: HTMLElement) {
    // Get the index of where we will be placing this column within the row
    if(!columnElement) return 0;
    return this.columns.findIndex(x => x == columnElement) + 1;
  }
}
import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { WidgetService } from '../../../services/widget.service';
import { FormService } from '../../../services/form.service';
import { FillColor } from '../../../classes/fill-color';
import { Border } from '../../../classes/border';
import { Corners } from '../../../classes/corners';
import { Shadow } from '../../../classes/shadow';
import { ColumnComponent } from '../column/column.component';
import { ContainerComponent } from '../container/container.component';
import { VerticalAlignment } from '../../../classes/vertical-alignment';
import { Color } from '../../../classes/color';
import { Column } from '../../../classes/column';
import { Padding } from '../../../classes/padding';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  @ViewChild('row', { static: false }) rowElement: ElementRef;
  public top: number;
  public columns: Array<Column> = new Array<Column>();
  public fill: FillColor = new FillColor();
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public padding: Padding = new Padding();
  public verticalAlignment: VerticalAlignment = new VerticalAlignment();
  public container: ContainerComponent;

  constructor(private resolver: ComponentFactoryResolver, public widgetService: WidgetService, public _FormService: FormService) { }


  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.fill = this.fill;
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.shadow = this.shadow;
    this._FormService.padding = this.padding;
    this._FormService.verticalAlignment = this.verticalAlignment;

    // Open the container form
    this._FormService.showRowForm = true;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    return Color.RGBAToHexA(this.border.color);
  }


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return Color.RGBAToHexA(this.shadow.color);
  }



  onMousedown(event) {
    if (document.body.id == 'widget-resize' || document.body.id == 'column-resize') return;

    let offset = event.clientY - this.top;
    let currentPos = this.top;

    // flag that this row has been selected
    this.container.selectedRow = this;

    document.body.style.cursor = 'move';
    document.body.id = 'row-move';

    // Mousemove
    let onMousemove = (e: MouseEvent) => {
      this.top = e.clientY - offset;

      let delta = this.top - currentPos;
      currentPos = this.top;

      // Check for collision
      if (delta > 0) {
        this.container.collisionDown();
      } else {
        this.container.collisionUp();
      }

      this.container.checkHeightChange();
    }

    // Mouseup
    let onMouseup = () => {
      window.removeEventListener("mousemove", onMousemove);
      window.removeEventListener("mouseup", onMouseup);
      document.body.removeAttribute('style');
      document.body.removeAttribute('id');
    }

    // Add the listeners
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }


  addColumn(columnElement?: HTMLElement) {
    let componentFactory = this.resolver.resolveComponentFactory(ColumnComponent);
    let columnComponentRef = this.viewContainerRef.createComponent(componentFactory, this.getColumnIndex(columnElement));

    // Add this column to the column array
    this.columns.push(new Column(columnComponentRef.instance, columnComponentRef.location.nativeElement));



    // Add or update each column with the correct col class based on the number of columns in this row
    this.columns.forEach((column: Column) => {
      column.element.setAttribute('class', 'col-' + Math.max(2, Math.floor(12 / this.columns.length)));
    });

    // Set the column's row as this row
    columnComponentRef.instance.row = this;

    // Add the widget
    columnComponentRef.hostView.detectChanges();
    columnComponentRef.instance.addWidget();
    columnComponentRef.hostView.detectChanges();



    // Set the events
    columnComponentRef.location.nativeElement.addEventListener('mouseover', columnComponentRef.instance.onMouseover.bind(columnComponentRef.instance));
    columnComponentRef.location.nativeElement.addEventListener('mouseup', () => { this.widgetService.currentWidgetCursor = null; });
    columnComponentRef.location.nativeElement.addEventListener('mouseleave', columnComponentRef.instance.onMouseleave.bind(columnComponentRef.instance));

    // flag that this row has been selected
    this.container.selectedRow = this;

    // Shift rows down if this row collides with its neighboring rows
    this.container.collisionDown();
    this.container.checkHeightChange();

    // Wait a frame to sort the column
    window.setTimeout(() => {
      this.sortColumns();
    });
  }


  sortColumns() {
    // Sort the columns from left to right based on their position
    this.columns.sort((a: Column, b: Column) => {
      if (a.element.offsetLeft > b.element.offsetLeft) return 1;
      return -1;
    });
  }


  getColumnIndex(columnElement: HTMLElement) {
    // Get the index of where we will be placing this column within the row
    if (!columnElement) return 0;
    return this.columns.findIndex(x => x.element == columnElement) + 1;
  }

  buildHTML(parent: HTMLElement) {
    let row = document.createElement('div');

    // Added the classes
    row.classList.add('row');
    if (this.columns.length == 5) row.classList.add('flex-10');

    row.style.position = 'relative';
    row.style.top = this.top + 'px';

    // Fill
    if (this.fill.apply) this.fill.applyColor(row);

    // Border
    this.border.applyStyle(row);

    // Corners
    this.corners.applyStyle(row);

    // Shadow
    this.shadow.applyStyle(row);

    // Padding
    this.padding.applyStyle(row);

    // Vertical alignment
    this.verticalAlignment.applyStyle(row);

    parent.appendChild(row);

    this.columns.forEach((column: Column) => column.component.buildHTML(row));
  }
}
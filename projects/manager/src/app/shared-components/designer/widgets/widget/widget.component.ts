import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { Spacing } from 'projects/manager/src/app/classes/spacing';
import { ColumnComponent } from '../../column/column.component';

@Component({
  template: '',
})
export class WidgetComponent implements OnInit {
  @ViewChild('widget', { static: false }) widget: ElementRef;
  public width: number;
  public height: number;
  public margins: Spacing = new Spacing();
  public column: ColumnComponent;

  constructor(public widgetService: WidgetService) { }

  ngOnInit() {
    this.margins.left = 'auto';
    this.margins.right = 'auto';
  }


  onClick() {
    this.widgetService.selectedWidget = this;
    this.column.row.container.selectedRow = this.column.row;
  }


  onMousedown(handle: string) {
    this.column.row.container.selectedRow = this.column.row;
    switch (handle) {
      case 'top left':
        document.body.style.cursor = 'nw-resize';
        this.setWidth('left');
        this.setHeight('top');
        break;

      case 'top':
        document.body.style.cursor = 'n-resize';
        this.setHeight('top');
        break;

      case 'top right':
        document.body.style.cursor = 'ne-resize';
        this.setWidth('right');
        this.setHeight('top');
        break;

      case 'left':
        document.body.style.cursor = 'w-resize';
        this.setWidth('left');
        break;

      case 'bottom left':
        document.body.style.cursor = 'sw-resize';
        this.setWidth('left');
        this.setHeight('bottom');
        break;

      case 'bottom':
        document.body.style.cursor = 's-resize';
        this.setHeight('bottom');
        break;

      case 'bottom right':
        document.body.style.cursor = 'se-resize';
        this.setWidth('right');
        this.setHeight('bottom');
        break;

      case 'right':
        document.body.style.cursor = 'e-resize';
        this.setWidth('right');
        break;
    }
  }


  setWidth(handle: string) {
    let widgetElement: HTMLElement = this.widget.nativeElement;
    let widgetElementRect: any = widgetElement.getBoundingClientRect();
    let widgetElementPos: number;
    let widgetElementWidth: number = widgetElementRect.width * (this.margins.left == 'auto' && this.margins.right == 'auto' ? 0.5 : 1);
    let widgetWidth = widgetElementRect.width;
    let columnWidth = this.widget.nativeElement.parentElement.parentElement.getBoundingClientRect().width;

    // Set the width
    this.width = widgetWidth;


    if (handle == 'left' || (this.margins.left == 'auto' && this.margins.right == 'auto')) {
      widgetElementPos = widgetElementRect.left + widgetElementWidth;
    } else {
      widgetElementPos = widgetElementRect.left;
    }

    let onMousemove = (e: MouseEvent) => {
      let mouseWidgetOffset = (e.clientX - widgetElementPos) * (handle == 'left' ? -1 : 1);
      let percent = mouseWidgetOffset / widgetElementWidth;

      this.width = Math.max(widgetWidth * percent, 10);

      if (this.width > columnWidth) this.width = null;
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


  setHeight(handle: string) {
    let widgetElement: HTMLElement = this.widget.nativeElement;
    let widgetElementRect: any = widgetElement.getBoundingClientRect();
    let widgetElementPos: number;
    let widgetElementHeight: number = widgetElementRect.height * (this.column.row.alignment.value == 'center' ? 0.5 : 1);
    let initialWidgetHeight: number = widgetElementRect.height;
    let tempHeight: number = initialWidgetHeight;
    let maxCollisionPos: number;
    let children: Array<Element> = Array.from(widgetElement.children);
    let minHeight: number = Math.max(...children.map((x: any) => x.offsetHeight));

    // Set the height
    this.height = initialWidgetHeight;

    // This is the point at which at widget's bottom extends when the widget's top hits it
    // Initially, this is the top of the container
    maxCollisionPos = this.column.row.container.containerElement.nativeElement.getBoundingClientRect().top;


    // Get the maxCollisionPos if there are rows above this widget
    for (let i = 0; i < this.column.row.container.rows.length; i++) {
      let currentRow = this.column.row.container.rows[i];

      if (!this.column.row.rowElement.nativeElement.isEqualNode(currentRow.location.nativeElement.firstElementChild)) {
        maxCollisionPos += currentRow.location.nativeElement.firstElementChild.getBoundingClientRect().height;
      } else {
        break;
      }
    }


    // Get the position of the widget
    if (handle == 'top') {
      widgetElementPos = widgetElementRect.top + widgetElementHeight;
    } else {
      widgetElementPos = widgetElementRect.top + (this.column.row.alignment.value == 'center' ? widgetElementHeight : 0);
    }


    let onMousemove = (e: MouseEvent) => {
      let mouseWidgetOffset = (e.clientY - widgetElementPos) * (handle == 'top' ? -1 : 1);
      let percent = mouseWidgetOffset / widgetElementHeight;
      this.height = initialWidgetHeight * percent;
      let delta = this.height - tempHeight;

      // Make sure the height does not go below min height
      // This will prevent the widget from moving
      if (this.height < minHeight) {
        this.height = minHeight;

        delta = minHeight - tempHeight;
      }


      // Top Handle
      if (handle == 'top') {
        // Prevent the bottom of the widget extending when colliding with something above it
        if (widgetElementPos - (this.height * (this.column.row.alignment.value == 'center' ? 0.5 : 1)) < maxCollisionPos) {
          this.height = (widgetElementPos - maxCollisionPos) * (this.column.row.alignment.value == 'center' ? 2 : 1);
        }



        // Align Top
        if (this.column.row.alignment.value == 'flex-start') {
          this.column.row.top -= delta;



          // Align Center
        } else if (this.column.row.alignment.value == 'center') {

          // If the height of the widget is greater or equal to the row height, move the row
          if (tempHeight >= this.column.row.rowElement.nativeElement.clientHeight) {
            this.column.row.top -= (delta * 0.5);
          }




          // Align Bottom
        } else if (this.column.row.alignment.value == 'flex-end') {
          // If the height of the widget is greater or equal to the row height, move the row
          if (Math.round(tempHeight) >= this.column.row.rowElement.nativeElement.clientHeight) {
            this.column.row.top -= delta;
          }
        }


        // Collision
        if (delta > 0 || this.column.row.alignment.value == 'center') this.column.row.container.collisionUp();
        if (this.column.row.alignment.value == 'center' || this.column.row.alignment.value == 'flex-start') this.column.row.container.collisionDown();


        // bottom Handle
      } else {

        // Align Center
        if (this.column.row.alignment.value == 'center') {


          // Prevent the bottom of the widget extending when colliding with something above it
          if (widgetElementPos - (this.height * 0.5) < maxCollisionPos) {
            this.height = (widgetElementPos - maxCollisionPos) * 2;
          }



          // If the height of the widget is greater or equal to the row height, move the row
          if (tempHeight >= this.column.row.rowElement.nativeElement.clientHeight) {
            this.column.row.top -= (delta * 0.5);
          }


          // Align Bottom
        } else if (this.column.row.alignment.value == 'flex-end') {

          // Move the row if the widget's height is less than the row's height
          if (Math.round(tempHeight) < this.column.row.rowElement.nativeElement.clientHeight) {
            this.column.row.top += delta;
          }
        }


        // Collision
        if (this.column.row.alignment.value == 'center' || this.column.row.alignment.value == 'flex-end') this.column.row.container.collisionUp();
        if (delta > 0 || this.column.row.alignment.value == 'center') this.column.row.container.collisionDown();

      }

      tempHeight = this.height;
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
}
import { Component } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { Vector } from 'projects/manager/src/app/classes/vector';
import { BreakpointHorizontalAlignment, BreakpointVerticalAlignment } from 'projects/manager/src/app/classes/breakpoint';

@Component({
  template: '',
})
export class ProportionalWidgetComponent extends WidgetComponent {
  public minWidth: number = 40;


  ngAfterViewInit() {
    this.height = this.widgetElement.nativeElement.getBoundingClientRect().height;
  }

  onHandleMousedown(verticalHandle: string, horizontalHandle: string, event: MouseEvent) {
    let anchorWidth: number = this.widgetElement.nativeElement.clientWidth * (this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? 0.5 : 1);
    let anchorPoint: number = this.widgetElement.nativeElement.getBoundingClientRect().left +
      (horizontalHandle == 'left' || this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? anchorWidth : 0);
    let startWidth: number = this.widgetElement.nativeElement.clientWidth;
    let columnWidth: number = this.column.columnElement.clientWidth;
    let mouse: Vector = new Vector(event.clientX, event.clientY);
    let mouseX: number = mouse.x;
    let maxRowHeight: number = this.getMaxRowHeight();
    let previousHeight: number = this.widgetElement.nativeElement.getBoundingClientRect().height;
    let maxHeight: number = this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ||
      this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Bottom ? this.getMaxHeight() : Infinity;
    let offset = event.clientX - (horizontalHandle == 'left' ? anchorPoint - anchorWidth : anchorPoint + anchorWidth);

    // Set the cursor
    document.body.id = 'widget-resize';
    switch (verticalHandle + '-' + horizontalHandle) {
      case 'top-left':
        document.body.style.cursor = 'nw-resize';
        break;
      case 'top-right':
        document.body.style.cursor = 'ne-resize';
        break;
      case 'bottom-right':
        document.body.style.cursor = 'se-resize';
        break;
      case 'bottom-left':
        document.body.style.cursor = 'sw-resize';
        break;
    }



    let onMousemove = (e: MouseEvent) => {
      let delta: Vector = new Vector(e.clientX - mouse.x, (e.clientY - mouse.y) *
        ((verticalHandle == 'top' && horizontalHandle == 'left') ||
          (verticalHandle == 'bottom' && horizontalHandle == 'right') ? 1 : -1));

      // Normalize the delta vector
      let normalizedDelta = delta.normalize();

      // Clamping will ensure when adding the X and Y components, the sum will not be greater than 1
      normalizedDelta.clamp();

      // Multiply the original delta with the normalized delta
      delta.multiply(normalizedDelta);

      // We add the X and Y together to get the delta of both X and Y
      // Incrementing mouseX with deltaSum gives us the distance the mouse has moved
      let deltaSum = delta.x + delta.y;
      mouseX += deltaSum;

      // Calculate the width of the widget
      let mousePos = ((anchorPoint - mouseX) + offset) * (horizontalHandle == 'left' ? 1 : -1);
      let percent = mousePos / anchorWidth;
      this.width = Math.round(startWidth * percent);

      // Set the dimensions of the widget
      this.setDimensions(columnWidth, maxRowHeight, maxHeight, previousHeight);


      // Re-assign
      previousHeight = this.height;


      mouse = new Vector(e.clientX, e.clientY);
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }



  setDimensions(columnWidth: number, maxRowHeight: number, maxHeight: number, previousHeight: number) {
    let aspectRatio = this.widgetElement.nativeElement.getBoundingClientRect().height / this.widgetElement.nativeElement.getBoundingClientRect().width;


    // Make sure the width doesn't go below the min width
    if (this.width < this.minWidth) {
      this.width = this.minWidth;
    }

    // If the width is greater than the column width
    if (this.width >= columnWidth) {
      // this.width = columnWidth;
      this.width = null;
    }


    // Calculte the height of the widget
    this.height = (this.width ? this.width : columnWidth) * aspectRatio;
    let deltaHeight = previousHeight - this.height;


    // Make sure the widget's height does not go above the max height
    if (this.height > maxHeight) {
      let diff = this.height - maxHeight;
      this.width -= diff / aspectRatio;
      this.height -= diff;

      if (previousHeight < maxHeight) {
        deltaHeight = previousHeight - maxHeight;
      } else {
        deltaHeight = 0;
      }
    }


    // This block of code calculates deltaHeight to prevent the current row and next rows from moving
    if (this.height < maxRowHeight) {

      // If the previous height was greater or equal to the row's height
      if (previousHeight >= maxRowHeight) {
        deltaHeight = previousHeight - maxRowHeight;

      } else {
        deltaHeight = 0;
      }


      // The widget's height is greater or equal to the row's height
    } else {



      // The previous height was less than or equal to the row's height
      if (previousHeight <= maxRowHeight) {
        deltaHeight = maxRowHeight - this.height;
      }
    }





    // Align Top
    if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Top) {
      this.column.row.positionNextRow(-deltaHeight);


      // Align Center or Align Bottom
    } else if ((this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ||
      this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Bottom) && this.width) {


      // Align center
      if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle) {
        this.column.row.positionNextRow(-deltaHeight * 0.5);
      }

      // Position the row
      this.column.row.setPosition((deltaHeight * (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ? 0.5 : 1)));
    }
  }
}
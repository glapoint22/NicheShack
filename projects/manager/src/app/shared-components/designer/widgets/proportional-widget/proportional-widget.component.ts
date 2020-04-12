import { Component } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { Vector } from 'projects/manager/src/app/classes/vector';
import { BreakpointHorizontalAlignment } from 'projects/manager/src/app/classes/breakpoint';

@Component({
  template: '',
})
export class ProportionalWidgetComponent extends WidgetComponent {
  public minHeight: number = 40;

  onHandleMousedown(verticalHandle: string, horizontalHandle: string, event: MouseEvent) {
    let anchorWidth: number = this.widget.nativeElement.clientWidth * (this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? 0.5 : 1);
    let anchorPoint: number = this.widget.nativeElement.getBoundingClientRect().left +
      (horizontalHandle == 'left' || this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? anchorWidth : 0);
    let startWidth: number = this.widget.nativeElement.clientWidth;
    let heightWidthRatio: number = this.widget.nativeElement.clientHeight / this.widget.nativeElement.clientWidth;
    let widthHeightRatio = this.widget.nativeElement.clientWidth / this.widget.nativeElement.clientHeight;
    let widgetHeight: number;
    let columnWidth: number = this.widget.nativeElement.parentElement.parentElement.clientWidth;
    let mouse: Vector = new Vector(event.clientX, event.clientY);
    let mouseX: number = mouse.x;
    // let widgetTop: number = this.widget.nativeElement.getBoundingClientRect().top;
    // let topCollisionPoint: number = this.getTopCollisionPoint();
    let maxRowHeight: number = this.getMaxRowHeight();
    let tempHeight = startWidth * heightWidthRatio;


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
      let mousePos = (anchorPoint - mouseX) * (horizontalHandle == 'left' ? 1 : -1);
      let percent = mousePos / anchorWidth;
      this.width = startWidth * percent;

      // Make sure the width doesn't go below the min width
      if (this.width < this.minHeight) {
        this.width = this.minHeight;
        mouseX -= deltaSum;
      }


      // Calculte the height of the widget
      widgetHeight = this.width * heightWidthRatio;
      let deltaHeight = tempHeight - widgetHeight;


      // If the width is greater than the column width, mark it as null
      if (this.width > columnWidth) this.width = null;


      // Align Top
      if (this.column.row.verticalAlignment.value == 'flex-start') {
        this.column.row.container.collisionDown();


        // Align Center or Align Bottom
      } else if ((this.column.row.verticalAlignment.value == 'center' || this.column.row.verticalAlignment.value == 'flex-end') && this.width) {


        // If the height of the widget is greater or equal to the row height, move the row
        if (widgetHeight >= maxRowHeight) {
          this.column.row.top += (deltaHeight * (this.column.row.verticalAlignment.value == 'center' ? 0.5 : 1));
        }


        // This will prevent the widget from sizing when colliding with a row above it or the top of the container
        // widgetTop += (deltaHeight * (this.column.row.verticalAlignment.value == 'center' ? 0.5 : 1));
        // if (widgetTop < topCollisionPoint) {
        //   this.width += ((widgetTop - topCollisionPoint) * widthHeightRatio * (this.column.row.verticalAlignment.value == 'center' ? 2 : 1));
        //   mouseX -= deltaSum;
        //   widgetTop = topCollisionPoint;
        // }


        // Collision
        this.column.row.container.collisionUp();
        if (this.column.row.verticalAlignment.value == 'center') this.column.row.container.collisionDown();

        // Re-assign
        tempHeight = this.width * heightWidthRatio;
      }
      mouse = new Vector(e.clientX, e.clientY);

      // this.column.row.container.checkHeightChange();
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }
}
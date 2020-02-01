import { Component } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { Vector } from 'projects/manager/src/app/classes/vector';

@Component({
  template: '',
})
export class ProportionalWidgetComponent extends WidgetComponent {

  constructor(widgetService: WidgetService) { super(widgetService) }


  mousedown(event: any, verticalHandle: string, horizontalHandle: string) {
    let widgetElement: HTMLElement = this.widget.nativeElement;
    let widgetElementRect: any = widgetElement.getBoundingClientRect();
    let widgetElementPosX: number;
    let widgetElementWidth: number = widgetElementRect.width * (this.margins.left == 'auto' && this.margins.right == 'auto' ? 0.5 : 1);
    let widgetWidth = widgetElementRect.width;
    let widgetHeight: number;
    let columnWidth = this.widget.nativeElement.parentElement.parentElement.getBoundingClientRect().width;
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let initialMouseX = mouseX;
    let ratio = widgetElementRect.height / widgetElementRect.width;
    let maxHeight: number = 0;
    let widgetTop = widgetElementRect.top;

    if (this.column.row.columns.length > 1) {
      for (let i = 0; i < this.column.row.columns.length; i++) {
        if (!this.column.row.columns[i].isEqualNode(this.column.viewContainerRef.element.nativeElement.parentElement)) {
          maxHeight = Math.max(maxHeight, this.column.row.columns[i].clientHeight);
        }
      }
    }

    // Set the width
    this.width = widgetWidth;


    if (horizontalHandle == 'left' || (this.margins.left == 'auto' && this.margins.right == 'auto')) {
      widgetElementPosX = widgetElementRect.left + widgetElementWidth;
    } else {
      widgetElementPosX = widgetElementRect.left;
    }


    let onMousemove = (e: MouseEvent) => {
      let delta: Vector = new Vector(e.clientX - mouseX, (e.clientY - mouseY) *
        ((verticalHandle == 'top' && horizontalHandle == 'left') ||
          (verticalHandle == 'bottom' && horizontalHandle == 'right') ? 1 : -1));

      let normalizedDelta = delta.normalize();


      normalizedDelta.clamp();
      delta.multiply(normalizedDelta);

      let deltaSum = delta.x + delta.y;


      // Re-assign the variables
      mouseX = e.clientX;
      mouseY = e.clientY;


      initialMouseX += deltaSum;
      let mouseWidgetOffsetX = (initialMouseX - widgetElementPosX) * (horizontalHandle == 'left' ? -1 : 1);
      let percent = mouseWidgetOffsetX / widgetElementWidth;

      this.width = Math.max(widgetWidth * percent, 10);
      widgetHeight = this.width * ratio;



      if (this.width > columnWidth) this.width = null;

      if (this.column.row.alignment.value == 'flex-start') {
        this.column.row.container.collisionDown();
      }



      // Align Center or Align Bottom
      if (this.column.row.alignment.value == 'center' || this.column.row.alignment.value == 'flex-end') {


        // If the height of the widget is greater or equal to the row height, move the row
        if (widgetHeight >= maxHeight && this.width) {
          this.column.row.top += (deltaSum * (this.column.row.alignment.value == 'center' ? 0.5 : 1)) * (horizontalHandle == 'left' ? 1 : -1);
        }


        widgetTop += (deltaSum * 0.5);
        if (widgetTop < 105) {
          this.width += (deltaSum * 2);
          initialMouseX -= deltaSum;
        }


        this.column.row.container.collisionUp();

        if (this.column.row.alignment.value == 'center') this.column.row.container.collisionDown();

      }



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

import { Component } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { BreakpointHorizontalAlignment } from 'projects/manager/src/app/classes/breakpoint';

@Component({
  template: '',
})
export class FreeformWidgetComponent extends WidgetComponent {

  onHandleMousedown(handle: string) {
    document.body.id = 'widget-resize';
    switch (handle) {
      case 'top-left':
        document.body.style.cursor = 'nw-resize';
        this.onTopHandleMousedown();
        this.onLeftHandleMousedown();
        break;

      case 'top':
        document.body.style.cursor = 'n-resize';
        this.onTopHandleMousedown();
        break;

      case 'top-right':
        document.body.style.cursor = 'ne-resize';
        this.onTopHandleMousedown();
        this.onRightHandleMousedown();
        break;

      case 'right':
        document.body.style.cursor = 'e-resize';
        this.onRightHandleMousedown();
        break;

      case 'bottom-right':
        document.body.style.cursor = 'se-resize';
        this.onBottomHandleMousedown();
        this.onRightHandleMousedown();
        break;


      case 'bottom':
        document.body.style.cursor = 's-resize';
        this.onBottomHandleMousedown();
        break;


      case 'bottom-left':
        document.body.style.cursor = 'sw-resize';
        this.onBottomHandleMousedown();
        this.onLeftHandleMousedown();
        break;

      case 'left':
        document.body.style.cursor = 'w-resize';
        this.onLeftHandleMousedown();
        break;
    }
  }


  onLeftHandleMousedown() {
    let anchorWidth: number = this.widget.nativeElement.clientWidth * (this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? 0.5 : 1);
    let anchorPoint: number = this.widget.nativeElement.getBoundingClientRect().left + anchorWidth;
    let startWidth: number = this.widget.nativeElement.clientWidth;

    let onMousemove = (e: MouseEvent) => {
      let mousePos = (anchorPoint - e.clientX);
      let percent = mousePos / anchorWidth;

      this.setWidth(startWidth, percent);
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }



  onRightHandleMousedown() {
    let anchorWidth: number = this.widget.nativeElement.clientWidth * (this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? 0.5 : 1);
    let anchorPoint: number = this.widget.nativeElement.getBoundingClientRect().left + (this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? anchorWidth : 0);
    let startWidth: number = this.widget.nativeElement.clientWidth;

    let onMousemove = (e: MouseEvent) => {
      let mousePos = (e.clientX - anchorPoint);
      let percent = mousePos / anchorWidth;

      this.setWidth(startWidth, percent)
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }



  onTopHandleMousedown() {
    let anchorHeight: number = this.widget.nativeElement.clientHeight * (this.column.row.verticalAlignment.value == 'center' ? 0.5 : 1);
    let anchorPoint: number = this.widget.nativeElement.getBoundingClientRect().top + anchorHeight;
    let startHeight: number = this.widget.nativeElement.clientHeight;
    let tempHeight: number = startHeight;
    let topCollisionPoint: number = this.getTopCollisionPoint();
    let maxRowHeight: number = this.getMaxRowHeight();
    let minHeight: number = this.getMinHeight();

    let onMousemove = (e: MouseEvent) => {
      let mousePos = (anchorPoint - e.clientY);
      let percent = mousePos / anchorHeight;
      this.height = startHeight * percent;
      let delta = this.height - tempHeight;

      // Prevent the bottom of the widget extending when colliding with something above it
      if (anchorPoint - (this.height * (this.column.row.verticalAlignment.value == 'center' ? 0.5 : 1)) < topCollisionPoint) {
        this.height = (anchorPoint - topCollisionPoint) * (this.column.row.verticalAlignment.value == 'center' ? 2 : 1);
      }


      // Make sure the widget's height does not go below the min height
      if (this.height < minHeight) {
        this.height = minHeight;

        delta = minHeight - tempHeight;
      }


      // Align Top
      if (this.column.row.verticalAlignment.value == 'flex-start') {
        this.column.row.top -= delta;


        // Align Center
      } else if (this.column.row.verticalAlignment.value == 'center') {

        if (this.height > maxRowHeight) {
          this.column.row.top -= (delta * 0.5);
        }



        // Align Bottom
      } else if (this.column.row.verticalAlignment.value == 'flex-end') {
        if (this.height < minHeight) {
          this.height = minHeight;

          delta = minHeight - tempHeight;
        }

        if (this.height > maxRowHeight) {
          this.column.row.top -= delta;
        }
      }


      // Collision
      if (delta > 0 || this.column.row.verticalAlignment.value == 'center') this.column.row.container.collisionUp();
      if (this.column.row.verticalAlignment.value == 'center' || this.column.row.verticalAlignment.value == 'flex-start') this.column.row.container.collisionDown();
      this.column.row.container.checkHeightChange();

      tempHeight = this.height;
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }



  onBottomHandleMousedown() {
    let anchorHeight: number = this.widget.nativeElement.clientHeight * (this.column.row.verticalAlignment.value == 'center' ? 0.5 : 1);
    let anchorPoint: number = this.widget.nativeElement.getBoundingClientRect().top + (this.column.row.verticalAlignment.value == 'center' ? anchorHeight : 0);
    let startHeight: number = this.widget.nativeElement.clientHeight;
    let tempHeight: number = startHeight;
    let topCollisionPoint: number = this.getTopCollisionPoint();
    let maxRowHeight: number = this.getMaxRowHeight();
    let minHeight: number = this.getMinHeight();


    let onMousemove = (e: MouseEvent) => {
      let mousePos = (e.clientY - anchorPoint);
      let percent = mousePos / anchorHeight;
      this.height = startHeight * percent;
      let delta = this.height - tempHeight;

      // Make sure the widget's height does not go below the min height
      if (this.height < minHeight) {
        this.height = minHeight;

        delta = minHeight - tempHeight;
      }


      // Align Center
      if (this.column.row.verticalAlignment.value == 'center') {


        // Prevent the bottom of the widget extending when colliding with something above it
        if (anchorPoint - (this.height * 0.5) < topCollisionPoint) {
          this.height = (anchorPoint - topCollisionPoint) * 2;
        }



        // If the height of the widget is greater than the row height, move the row
        if (this.height > maxRowHeight) {
          this.column.row.top -= (delta * 0.5);
        }


        // Align Bottom
      } else if (this.column.row.verticalAlignment.value == 'flex-end') {


        // Move the row if the widget's height is less than the row's height
        if (this.height < maxRowHeight) {
          this.column.row.top += delta;
        }
      }


      // Collision
      if (this.column.row.verticalAlignment.value == 'center' || this.column.row.verticalAlignment.value == 'flex-end') this.column.row.container.collisionUp();
      if (delta > 0 || this.column.row.verticalAlignment.value == 'center') this.column.row.container.collisionDown();
      this.column.row.container.checkHeightChange();


      tempHeight = this.height;
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }




  setWidth(startWidth: number, percent: number) {
    let columnWidth: number = this.widget.nativeElement.parentElement.parentElement.clientWidth;

    this.width = Math.max(startWidth * percent, 10);
    if (this.width > columnWidth) this.width = null;
  }

  getMinHeight(): number {
    let children: Array<Element> = Array.from(this.widget.nativeElement.children);
    return Math.max(...children.filter(x => x.id != 'handle').map((x: any) => x.offsetHeight));
  }
}
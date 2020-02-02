import { Component, OnInit } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';

@Component({
  template: '',
})
export class FreeformWidgetComponent extends WidgetComponent implements OnInit {

  constructor(widgetService: WidgetService) { super(widgetService) }

  ngOnInit() {
    super.ngOnInit();
  }

  onHandleMove(handle: string) {
    switch (handle) {
      case 'top-left':
        document.body.style.cursor = 'nw-resize';
        this.onTopHandleMove();
        this.onLeftHandleMove();
        break;

      case 'top':
        document.body.style.cursor = 'n-resize';
        this.onTopHandleMove();
        break;

      case 'top-right':
        document.body.style.cursor = 'ne-resize';
        this.onTopHandleMove();
        this.onRightHandleMove();
        break;

      case 'right':
        document.body.style.cursor = 'e-resize';
        this.onRightHandleMove();
        break;

      case 'bottom-right':
        document.body.style.cursor = 'se-resize';
        this.onBottomHandleMove();
        this.onRightHandleMove();
        break;


      case 'bottom':
        document.body.style.cursor = 's-resize';
        this.onBottomHandleMove();
        break;


      case 'bottom-left':
        document.body.style.cursor = 'sw-resize';
        this.onBottomHandleMove();
        this.onLeftHandleMove();
        break;

      case 'left':
        document.body.style.cursor = 'w-resize';
        this.onLeftHandleMove();
        break;
    }
  }


  onLeftHandleMove() {
    let anchorWidth: number = this.widget.nativeElement.clientWidth * (this.margins.left == 'auto' && this.margins.right == 'auto' ? 0.5 : 1);
    let anchorPoint: number = this.widget.nativeElement.getBoundingClientRect().left + anchorWidth;
    let startWidth: number = this.widget.nativeElement.clientWidth;

    let onMousemove = (e: MouseEvent) => {
      let mousePos = (anchorPoint - e.clientX);
      let percent = mousePos / anchorWidth;

      this.setWidth(startWidth, percent)
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }



  onRightHandleMove() {
    let isMarginAuto: boolean = this.margins.left == 'auto' && this.margins.right == 'auto';
    let anchorWidth: number = this.widget.nativeElement.clientWidth * (isMarginAuto ? 0.5 : 1);
    let anchorPoint: number = this.widget.nativeElement.getBoundingClientRect().left + (isMarginAuto ? anchorWidth : 0);
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



  onTopHandleMove() {
    let anchorHeight: number = this.widget.nativeElement.clientHeight * (this.column.row.alignment.value == 'center' ? 0.5 : 1);
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
      if (anchorPoint - (this.height * (this.column.row.alignment.value == 'center' ? 0.5 : 1)) < topCollisionPoint) {
        this.height = (anchorPoint - topCollisionPoint) * (this.column.row.alignment.value == 'center' ? 2 : 1);
      }


      // Align Top
      if (this.column.row.alignment.value == 'flex-start') {
        if (this.height < minHeight) {
          this.height = minHeight;

          delta = minHeight - tempHeight;
        }

        this.column.row.top -= delta;


        // Align Center
      } else if (this.column.row.alignment.value == 'center') {

        if (this.height > maxRowHeight) {
          this.column.row.top -= (delta * 0.5);
        }



        // Align Bottom
      } else if (this.column.row.alignment.value == 'flex-end') {
        if (this.height < minHeight) {
          this.height = minHeight;

          delta = minHeight - tempHeight;
        }

        if (this.height > maxRowHeight) {
          this.column.row.top -= delta;
        }
      }


      // Collision
      if (delta > 0 || this.column.row.alignment.value == 'center') this.column.row.container.collisionUp();
      if (this.column.row.alignment.value == 'center' || this.column.row.alignment.value == 'flex-start') this.column.row.container.collisionDown();


      tempHeight = this.height;
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }



  onBottomHandleMove() {
    let anchorHeight: number = this.widget.nativeElement.clientHeight * (this.column.row.alignment.value == 'center' ? 0.5 : 1);
    let anchorPoint: number = this.widget.nativeElement.getBoundingClientRect().top + (this.column.row.alignment.value == 'center' ? anchorHeight : 0);
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


      // Align Center
      if (this.column.row.alignment.value == 'center') {


        // Prevent the bottom of the widget extending when colliding with something above it
        if (anchorPoint - (this.height * 0.5) < topCollisionPoint) {
          this.height = (anchorPoint - topCollisionPoint) * 2;
        }



        // If the height of the widget is greater than the row height, move the row
        if (this.height > maxRowHeight) {
          this.column.row.top -= (delta * 0.5);
        }


        // Align Bottom
      } else if (this.column.row.alignment.value == 'flex-end') {

        if (this.height < minHeight) {
          this.height = minHeight;

          delta = minHeight - tempHeight;
        }


        // Move the row if the widget's height is less than the row's height
        if (this.height < maxRowHeight) {
          this.column.row.top += delta;
        }
      }


      // Collision
      if (this.column.row.alignment.value == 'center' || this.column.row.alignment.value == 'flex-end') this.column.row.container.collisionUp();
      if (delta > 0 || this.column.row.alignment.value == 'center') this.column.row.container.collisionDown();


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
}
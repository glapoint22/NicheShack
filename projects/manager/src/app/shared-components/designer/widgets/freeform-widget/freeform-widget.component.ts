import { Component } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { BreakpointHorizontalAlignment, BreakpointVerticalAlignment } from 'projects/manager/src/app/classes/breakpoint';

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
    let previousHeight: number = startHeight;
    let maxRowHeight: number = this.getMaxRowHeight();
    let minHeight: number = this.getMinHeight();

    let onMousemove = (e: MouseEvent) => {
      let mousePos = (anchorPoint - e.clientY);
      let percent = mousePos / anchorHeight;
      this.height = startHeight * percent;
      let delta = this.height - previousHeight;

      // if(this.column.row.top - delta < 0) {
      //   this.height -= (delta - this.column.row.top);
      // }

      // Make sure the widget's height does not go below the min height
      if (this.height < minHeight) {
        this.height = minHeight;

        delta = minHeight - previousHeight;
      }


      // The row's vertical alignment is set to top
      if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Top) {
        this.column.row.top -= delta;



        // The widget's height is less than the row's height
        if (this.height < maxRowHeight) {

          // If the previous height was greater or equal to the row's height
          if (previousHeight >= maxRowHeight) {

            // We are recalculating the delta because we don't want the full delta, 
            // just the difference between the current height and the row's height
            delta = this.height - maxRowHeight;
          }


          // The widget's height is greater or equal to the row's height
        } else {

          // The previous height was less than or equal to the row's height
          if (previousHeight <= maxRowHeight) {

            // We are recalculating the delta because we don't want the full delta,
            // just the difference between the row's height and the previous height
            delta = maxRowHeight - previousHeight;
          } else {
            delta = 0;
          }
        }


        // Set the next row's top
        this.column.row.positionNextRow(-delta);









        // The row's vertical alignment is set to middle or bottom
      } else if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ||
        this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Bottom) {



        // The widget's height is less than the row's height
        if (this.height < maxRowHeight) {

          // If the previous height was greater or equal to the row's height
          if (previousHeight >= maxRowHeight) {

            // We are recalculating the delta because we don't want the full delta, 
            // just the difference between the row's height and the previous height
            delta = maxRowHeight - previousHeight;

          } else {
            delta = 0;
          }


          // The widget's height is greater or equal to the row's height
        } else {

          // The previous height was less than or equal to the row's height
          if (previousHeight <= maxRowHeight) {

            // We are recalculating the delta because we don't want the full delta,
            // just the difference between the current height and the row's height
            delta = this.height - maxRowHeight;
          }
        }





        // The row's vertical alignment is set to middle
        if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle) {
          delta *= 0.5;
          this.column.row.positionNextRow(delta);
        }


        // Move the row
        this.column.row.top -= delta;
      }

      previousHeight = this.height;
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
    let previousHeight: number = startHeight;
    let maxRowHeight: number = this.getMaxRowHeight();
    let minHeight: number = this.getMinHeight();


    let onMousemove = (e: MouseEvent) => {
      let mousePos = (e.clientY - anchorPoint);
      let percent = mousePos / anchorHeight;
      this.height = startHeight * percent;
      let delta = this.height - previousHeight;

      // Make sure the widget's height does not go below the min height
      if (this.height < minHeight) {
        this.height = minHeight;

        delta = minHeight - previousHeight;
      }


      // The row's vertical alignment is set to top or middle
      if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Top ||
        this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle) {




        // The widget's height is less than the row's height
        if (this.height < maxRowHeight) {

          // If the previous height was greater or equal to the row's height
          if (previousHeight >= maxRowHeight) {

            // We are recalculating the delta because we don't want the full delta, 
            // just the difference between the previous height and the row's height
            delta = maxRowHeight - previousHeight;

            // The previous height was less than the row's height
          } else {
            delta = 0;
          }


          // The widget's height is greater or equal to the row's height
        } else {

          // The previous height was less than or equal to the row's height
          if (previousHeight <= maxRowHeight) {

            // We are recalculating the delta because we don't want the full delta,
            // just the difference between the current height and the row's height
            delta = this.height - maxRowHeight;
          }
        }








        // The row's vertical alignment is set to middle
        if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle) {

          // Move the row with half of the delta
          delta *= 0.5;
          this.column.row.top -= delta;
        }

        // Set the next row's top
        this.column.row.positionNextRow(delta);








        // The row's vertical alignment is set to bottom
      } else if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Bottom) {


        // Set the next row's top
        this.column.row.positionNextRow(delta);



        // The widget's height is less than the row's height
        if (this.height < maxRowHeight) {

          // If the previous height was greater or equal to the row's height
          if (previousHeight >= maxRowHeight) {

            // We are recalculating the delta because we don't want the full delta, 
            // just the difference between the current height and the row's height
            delta = this.height - maxRowHeight;
          }

          // Move the row
          this.column.row.top += delta;

          // The widget's height is greater or equal to the row's height
        } else {

          // The previous height was less than or equal to the row's height
          if (previousHeight <= maxRowHeight) {

            // We are recalculating the delta because we don't want the full delta, 
            // just the difference between the row's height and the previous height
            delta = maxRowHeight - previousHeight;

            // Move the row
            this.column.row.top += delta;
          }
        }
      }

      previousHeight = this.height;
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
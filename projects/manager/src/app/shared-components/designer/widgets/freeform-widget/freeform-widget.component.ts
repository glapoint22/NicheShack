import { Component } from '@angular/core';
import { WidgetComponent } from '../widget/widget.component';
import { BreakpointHorizontalAlignment, BreakpointVerticalAlignment } from 'projects/manager/src/app/classes/breakpoint';

@Component({
  template: '',
})
export class FreeformWidgetComponent extends WidgetComponent {

  onHandleMousedown(handle: string, event: MouseEvent) {
    document.body.id = 'widget-resize';
    switch (handle) {
      case 'top-left':
        document.body.style.cursor = 'nw-resize';
        this.onTopHandleMousedown(event);
        this.onLeftHandleMousedown(event);
        break;

      case 'top':
        document.body.style.cursor = 'n-resize';
        this.onTopHandleMousedown(event);
        break;

      case 'top-right':
        document.body.style.cursor = 'ne-resize';
        this.onTopHandleMousedown(event);
        this.onRightHandleMousedown(event);
        break;

      case 'right':
        document.body.style.cursor = 'e-resize';
        this.onRightHandleMousedown(event);
        break;

      case 'bottom-right':
        document.body.style.cursor = 'se-resize';
        this.onBottomHandleMousedown(event);
        this.onRightHandleMousedown(event);
        break;


      case 'bottom':
        document.body.style.cursor = 's-resize';
        this.onBottomHandleMousedown(event);
        break;


      case 'bottom-left':
        document.body.style.cursor = 'sw-resize';
        this.onBottomHandleMousedown(event);
        this.onLeftHandleMousedown(event);
        break;

      case 'left':
        document.body.style.cursor = 'w-resize';
        this.onLeftHandleMousedown(event);
        break;
    }
  }


  onLeftHandleMousedown(event: MouseEvent) {
    let anchorWidth: number = this.widgetElement.nativeElement.clientWidth * (this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? 0.5 : 1);
    let anchorPoint: number = this.widgetElement.nativeElement.getBoundingClientRect().left + anchorWidth;
    let startWidth: number = this.widgetElement.nativeElement.clientWidth;
    let offset = event.clientX - (anchorPoint - anchorWidth);

    let onMousemove = (e: MouseEvent) => {
      let mousePos = (anchorPoint - e.clientX) + offset;
      let percent = mousePos / anchorWidth;

      this.setWidth(startWidth, percent);
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }



  onRightHandleMousedown(event: MouseEvent) {
    let anchorWidth: number = this.widgetElement.nativeElement.clientWidth * (this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? 0.5 : 1);
    let anchorPoint: number = this.widgetElement.nativeElement.getBoundingClientRect().left + (this.horizontalAlignment.value == BreakpointHorizontalAlignment.Center ? anchorWidth : 0);
    let startWidth: number = this.widgetElement.nativeElement.clientWidth;
    let offset = (anchorPoint + anchorWidth) - event.clientX;

    let onMousemove = (e: MouseEvent) => {
      let mousePos = (e.clientX - anchorPoint) + offset;
      let percent = mousePos / anchorWidth;

      this.setWidth(startWidth, percent)
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }



  onTopHandleMousedown(event: MouseEvent) {
    let anchorHeight: number = this.widgetElement.nativeElement.clientHeight * (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ? 0.5 : 1);
    let anchorPoint: number = this.widgetElement.nativeElement.getBoundingClientRect().top + anchorHeight;
    let startHeight: number = this.widgetElement.nativeElement.clientHeight;
    let previousHeight: number = startHeight;
    let maxRowHeight: number = this.getMaxRowHeight();
    let minHeight: number = this.getMinHeight();
    let maxHeight = this.getMaxHeight();
    let offset = event.clientY - (anchorPoint - anchorHeight);

    let onMousemove = (e: MouseEvent) => {
      let mousePos = (anchorPoint - e.clientY) + offset;
      let percent = mousePos / anchorHeight;
      this.height = startHeight * percent;


      this.sizeTop(maxHeight, minHeight, maxRowHeight, previousHeight);


      previousHeight = this.height;
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }


  sizeTop(maxHeight: number, minHeight: number, maxRowHeight: number, previousHeight: number) {
    let delta = this.height - previousHeight;


    // Make sure the widget's height does not go below the min height
    if (this.height < minHeight) {
      this.height = minHeight;

      delta = minHeight - previousHeight;
    }

    // Make sure the widget's height does not go above the max height
    if (this.height > maxHeight) {
      this.height -= this.height - maxHeight;

      delta = maxHeight - previousHeight;
    }


    // The row's vertical alignment is set to top
    if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Top) {
      // Set the row's position
      this.column.row.setPosition(-delta);



      // This block of code calculates delta to prevent the current row and next rows from moving
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



      // This block of code calculates delta to prevent the current row and next rows from moving
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


      // Set the row's position
      this.column.row.setPosition(-delta);
    }
  }


  onBottomHandleMousedown(event: MouseEvent) {
    let anchorHeight: number = this.widgetElement.nativeElement.clientHeight * (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ? 0.5 : 1);
    let anchorPoint: number = this.widgetElement.nativeElement.getBoundingClientRect().top + (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle ? anchorHeight : 0);
    let startHeight: number = this.widgetElement.nativeElement.clientHeight;
    let previousHeight: number = startHeight;
    let maxRowHeight: number = this.getMaxRowHeight();
    let minHeight: number = this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Bottom ? Math.max(this.getMinHeightAlt(), this.getMinHeight()) : this.getMinHeight();
    let maxHeight = this.getMaxHeight();
    let offset = (anchorPoint + anchorHeight) - event.clientY;


    let onMousemove = (e: MouseEvent) => {
      let mousePos = (e.clientY - anchorPoint) + offset;
      let percent = mousePos / anchorHeight;
      this.height = startHeight * percent;

      this.sizeBottom(maxHeight, minHeight, maxRowHeight, previousHeight);

      previousHeight = this.height;
    }

    let onMouseup = () => {
      this.mouseUp(onMousemove, onMouseup);
    }

    this.addEventListeners(onMousemove, onMouseup);
  }



  sizeBottom(maxHeight: number, minHeight: number, maxRowHeight: number, previousHeight: number) {
    let delta = this.height - previousHeight;

    // Make sure the widget's height does not go below the min height
    if (this.height < minHeight) {
      this.height = minHeight;

      delta = minHeight - previousHeight;
    }



    // The row's vertical alignment is set to top or middle
    if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Top ||
      this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle) {




      // This block of code calculates delta to prevent the current row and next rows from moving
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


      if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Top) {
        this.column.row.container.save();
      }





      // The row's vertical alignment is set to middle
      if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Middle) {

        // Make sure the widget's height does not go above the max height
        if (this.height > maxHeight) {
          this.height -= this.height - maxHeight;

          delta = maxHeight - previousHeight;
        }


        // Move the row with half of the delta
        delta *= 0.5;
        this.column.row.setPosition(-delta);
      }

      // Set the next row's top
      this.column.row.positionNextRow(delta);








      // The row's vertical alignment is set to bottom
    } else if (this.column.row.verticalAlignment.value == BreakpointVerticalAlignment.Bottom) {


      // Set the next row's top
      this.column.row.positionNextRow(delta);



      // This block of code calculates delta to prevent the current row and next rows from moving
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

      this.column.row.setPosition(delta);
    }
  }



  setWidth(startWidth: number, percent: number) {
    let columnWidth: number = this.column.columnElement.clientWidth;

    this.width = Math.max(startWidth * percent, 10);
    if (this.width >= columnWidth) this.width = null;

    if (document.body.style.cursor == 'w-resize' || document.body.style.cursor == 'e-resize') {
      this.column.row.container.save();
    }
  }

  getMinHeight(): number {
    let children: Array<Element> = Array.from(this.widgetElement.nativeElement.children);
    return Math.max(...children.filter(x => x.id != 'handle').map((x: any) => x.offsetHeight));
  }

  getMinHeightAlt() {
    // This method is used when vertical alignment is set to bottom and the bottom handle is being used
    let topsTotal = 0;

    // Get a sum of all previous rows tops
    for (let i = this.column.row.container.selectedRowIndex; i > -1; i--) {
      topsTotal += this.column.row.container.rows[i].component.top;
    }

    // Get the min height from all widgets in the current selected row
    let height = Math.min(...this.column.row.columns.map(x => x.component.widget.height));


    return height - topsTotal;
  }
}
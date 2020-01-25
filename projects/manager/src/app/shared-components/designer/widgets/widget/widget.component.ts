import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { Spacing } from 'projects/manager/src/app/classes/spacing';
import { ColumnComponent } from '../../column/column.component';

@Component({
  template: '',
})
export class WidgetComponent implements OnInit {
  @ViewChild('widget', { static: false }) widget: ElementRef;
  @Output() onHeightChangeTop: EventEmitter<number> = new EventEmitter();
  public width: number;
  public height: number;
  public margins: Spacing = new Spacing();
  public column: ColumnComponent;

  constructor(public widgetService: WidgetService) { }

  ngOnInit() {
    this.margins.left = 'auto';
    this.margins.right = 'auto';
  }


  onMousedown(handle: string) {
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
    let widgetElementHeight: number = widgetElementRect.height;
    let widgetHeight = widgetElementRect.height;
    let deltaHeight = widgetHeight;


    // Set the height
    this.height = widgetHeight;

    if (handle == 'top') {
      widgetElementPos = widgetElementRect.top + widgetElementHeight;
    } else {
      widgetElementPos = widgetElementRect.top;
    }


    let onMousemove = (e: MouseEvent) => {
      let mouseWidgetOffset = (e.clientY - widgetElementPos) * (handle == 'top' ? -1 : 1);
      let percent = mouseWidgetOffset / widgetElementHeight;
      this.height = widgetHeight * percent;
      let delta = this.height - deltaHeight;

      

      if(handle == 'top') {
        if(widgetElementPos - this.height < 105) this.height = widgetElementPos - 105;

        this.onHeightChangeTop.emit(delta);
        deltaHeight = this.height;
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
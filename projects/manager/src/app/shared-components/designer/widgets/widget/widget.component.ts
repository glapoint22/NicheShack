import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { Spacing } from 'projects/manager/src/app/classes/spacing';
import { ColumnComponent } from '../../column/column.component';
import { HorizontalAlignment } from 'projects/manager/src/app/classes/horizontal-alignment';

@Component({
  template: '',
})
export class WidgetComponent {
  @ViewChild('widget', { static: false }) widget: ElementRef;
  public width: number;
  public height: number;
  public horizontalAlignment: HorizontalAlignment = new HorizontalAlignment();
  // public margins: Spacing = new Spacing();
  public column: ColumnComponent;

  constructor(public widgetService: WidgetService) { }

  // ngOnInit() {
  //   this.margins.left = 'auto';
  //   this.margins.right = 'auto';
  // }


  onMousedown() {
    this.widgetService.selectedWidget = this;
    this.column.row.container.selectedRow = this.column.row;
  }



  mouseUp(onMousemove, onMouseup) {
    window.removeEventListener("mousemove", onMousemove);
    window.removeEventListener("mouseup", onMouseup);
    document.body.removeAttribute('style');
    document.body.removeAttribute('id');
  }


  addEventListeners(onMousemove, onMouseup) {
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }




  getTopCollisionPoint(): number {
    let point: number = this.column.row.container.containerElement.nativeElement.getBoundingClientRect().top;

    for (let i = 0; i < this.column.row.container.rows.length; i++) {
      let currentRow = this.column.row.container.rows[i];

      if (!this.column.row.rowElement.nativeElement.isEqualNode(currentRow.element.firstElementChild)) {
        point += currentRow.element.firstElementChild.getBoundingClientRect().height;
      } else {
        break;
      }
    }

    return point;
  }


  getMaxRowHeight(): number {
    let maxHeight: number = 0;

    if (this.column.row.columns.length > 1) {
      for (let i = 0; i < this.column.row.columns.length; i++) {
        if (!this.column.row.columns[i].element.isEqualNode(this.column.viewContainerRef.element.nativeElement.parentElement)) {
          maxHeight = Math.max(maxHeight, this.column.row.columns[i].element.clientHeight);
        }
      }
    }

    return maxHeight;
  }

  buildHTML(parent: HTMLElement) {}
}
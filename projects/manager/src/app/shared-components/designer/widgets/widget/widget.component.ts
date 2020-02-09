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


  onMousedown() {
    this.widgetService.selectedWidget = this;
    this.column.row.container.selectedRow = this.column.row;
  }



  mouseUp(onMousemove, onMouseup) {
    window.removeEventListener("mousemove", onMousemove);
    window.removeEventListener("mouseup", onMouseup);
    document.body.removeAttribute('style');
  }


  addEventListeners(onMousemove, onMouseup) {
    window.addEventListener("mousemove", onMousemove);
    window.addEventListener("mouseup", onMouseup);
  }




  getTopCollisionPoint(): number {
    let point: number = this.column.row.container.containerElement.nativeElement.getBoundingClientRect().top;

    for (let i = 0; i < this.column.row.container.rows.length; i++) {
      let currentRow = this.column.row.container.rows[i];

      if (!this.column.row.rowElement.nativeElement.isEqualNode(currentRow.location.nativeElement.firstElementChild)) {
        point += currentRow.location.nativeElement.firstElementChild.getBoundingClientRect().height;
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
        if (!this.column.row.columns[i].isEqualNode(this.column.viewContainerRef.element.nativeElement.parentElement)) {
          maxHeight = Math.max(maxHeight, this.column.row.columns[i].clientHeight);
        }
      }
    }

    return maxHeight;
  }


  getMinHeight(): number {
    let children: Array<Element> = Array.from(this.widget.nativeElement.children);
    return Math.max(...children.map((x: any) => x.offsetHeight));
  }
}
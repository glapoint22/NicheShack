import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Background } from '../../../classes/background';
import { ColumnData } from '../../../classes/column-data';
import { BreakpointType } from 'classes/breakpoint-type';
import { BorderBase } from 'classes/border-base';
import { CornersBase } from 'classes/corners-base';
import { ShadowBase } from 'classes/shadow-base';
import { Padding } from '../../../classes/padding';
import { displayBase } from 'classes/display-base';

@Component({
  selector: '[column]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  public background: Background = new Background();
  public columnElement: HTMLElement;
  public border: BorderBase = new BorderBase();
  public corners: CornersBase = new CornersBase();
  public shadow: ShadowBase = new ShadowBase();
  public padding: Padding = new Padding();
  public display: displayBase = new displayBase();


  ngAfterViewInit() {
    // Get the html column element
    this.columnElement = this.viewContainerRef.element.nativeElement.parentElement.parentElement;
  }



  setData(columnData: ColumnData) {
    this.background.setData(columnData.background);
    this.setColumnSpan(columnData);
    this.display.addClasses(columnData.breakpoints, this.columnElement);
    this.border.setData(columnData.border);
    this.corners.setData(columnData.corners);
    this.shadow.setData(columnData.shadow);
    this.padding.setData(columnData.padding);
  }


  setColumnSpan(columnData: ColumnData) {
    if(columnData.columnSpan) {
      this.columnElement.classList.add('col-' + columnData.columnSpan);
    } else {
      let breakpoints = columnData.breakpoints.filter(x => x.breakpointType == BreakpointType.ColumnSpan);

      breakpoints.forEach(breakpoint => {
        this.columnElement.classList.add('col-' + breakpoint.value + '-' + breakpoint.screenSize);
      });
    }
  }
}
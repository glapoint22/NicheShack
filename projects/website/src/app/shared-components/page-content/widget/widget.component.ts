import { Component, ElementRef, ViewChild } from '@angular/core';
import { HorizontalAlignmentBase } from 'classes/horizontal-alignment-base';
import { WidgetDataBase } from 'classes/widget-data-base';

@Component({
  template: '',
})
export class WidgetComponent {
  @ViewChild('widget', { static: false }) private widgetElementRef: ElementRef<HTMLElement>;
  public widgetElement: HTMLElement;
  public width: number;
  public height: number;
  public horizontalAlignment: HorizontalAlignmentBase = new HorizontalAlignmentBase();

  ngAfterViewInit() {
    this.widgetElement = this.widgetElementRef.nativeElement;
  }

  setData(widgetData: WidgetDataBase) {
    if (widgetData.width) this.width = widgetData.width;
    if (widgetData.height) this.height = widgetData.height;
    this.horizontalAlignment.addClasses(widgetData.breakpoints, this.widgetElement, widgetData.horizontalAlignment);
  }

}

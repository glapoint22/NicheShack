import { Component, ComponentFactoryResolver, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Background } from '../../../classes/background';
import { ColumnData } from '../../../classes/column-data';
import { BorderBase } from 'classes/border-base';
import { CornersBase } from 'classes/corners-base';
import { ShadowBase } from 'classes/shadow-base';
import { displayBase } from 'classes/display-base';
import { ColumnSpanBase } from 'classes/column-span-base';
import { PaddingBase } from 'classes/padding-base';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: '[column]',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  public columnElement: HTMLElement;
  public background: Background = new Background();
  public border: BorderBase = new BorderBase();
  public corners: CornersBase = new CornersBase();
  public shadow: ShadowBase = new ShadowBase();
  public display: displayBase = new displayBase();
  public columnSpan: ColumnSpanBase = new ColumnSpanBase();
  public padding: PaddingBase = new PaddingBase();


  constructor(private resolver: ComponentFactoryResolver) { }


  ngAfterViewInit() {
    // Get the html column element
    this.columnElement = this.viewContainerRef.element.nativeElement.parentElement.parentElement;
  }



  setData(columnData: ColumnData) {
    this.background.setData(columnData.background);
    this.border.setData(columnData.border);
    this.corners.setData(columnData.corners);
    this.shadow.setData(columnData.shadow);
    this.display.addClasses(columnData.breakpoints, this.columnElement);
    this.columnSpan.addClasses(columnData.breakpoints, this.columnElement, columnData.columnSpan);
    this.padding.addClasses(columnData.breakpoints, this.columnElement, columnData.padding);
  }


  createWidget(widget: Type<WidgetComponent>): WidgetComponent {
    let componentFactory = this.resolver.resolveComponentFactory(widget);
    let widgetComponentRef = this.viewContainerRef.createComponent(componentFactory);

    // Detect changes
    widgetComponentRef.hostView.detectChanges();

    return widgetComponentRef.instance;
  }
}
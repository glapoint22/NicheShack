import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Background } from '../../../classes/background';
import { BorderBase } from 'classes/border-base';
import { CornersBase } from 'classes/corners-base';
import { ShadowBase } from 'classes/shadow-base';
import { VerticalAlign } from 'classes/vertical-align';
import { ColumnComponent } from '../column/column.component';
import { RowData } from '../../../classes/row-data';
import { PaddingBase } from 'classes/padding-base';
import { VerticalAlignmentBase } from 'classes/vertical-alignment-base';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false }) viewContainerRef: ViewContainerRef;
  public top: number;
  public background: Background = new Background();
  public border: BorderBase = new BorderBase();
  public corners: CornersBase = new CornersBase();
  public shadow: ShadowBase = new ShadowBase();
  public verticalAlignment: VerticalAlignmentBase = new VerticalAlignmentBase();
  public rowElement: HTMLElement;
  public padding: PaddingBase = new PaddingBase();
  public verticalAlign = VerticalAlign;
  public columnCount: number = 0;


  constructor(private resolver: ComponentFactoryResolver) { }


  ngAfterViewInit() {
    // Get the html row element
    this.rowElement = this.viewContainerRef.element.nativeElement.parentElement;
  }


  createColumn(): ColumnComponent {
    let componentFactory = this.resolver.resolveComponentFactory(ColumnComponent);
    let columnComponentRef = this.viewContainerRef.createComponent(componentFactory);

    this.columnCount++;

    // Detect changes
    columnComponentRef.hostView.detectChanges();

    // Return the new column
    return columnComponentRef.instance;
  }


  setData(rowData: RowData) {
    this.background.setData(rowData.background);
    this.border.setData(rowData.border);
    this.corners.setData(rowData.corners);
    this.shadow.setData(rowData.shadow);
    this.padding.addClasses(rowData.breakpoints, this.rowElement, rowData.padding);
    this.verticalAlignment.addClasses(rowData.breakpoints, this.rowElement, rowData.verticalAlignment);
  }
}

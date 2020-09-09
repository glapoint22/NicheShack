import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { Background } from '../../../classes/background';
import { BorderBase } from 'classes/border-base';
import { CornersBase } from 'classes/corners-base';
import { ShadowBase } from 'classes/shadow-base';
import { Padding } from '../../../classes/padding';
import { VerticalAlignment } from '../../../classes/vertical-alignment';
import { VerticalAlign } from 'classes/vertical-align';
import { ColumnComponent } from '../column/column.component';
import { RowData } from '../../../classes/row-data';

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
  public padding: Padding = new Padding();
  public verticalAlignment: VerticalAlignment = new VerticalAlignment();
  public verticalAlign = VerticalAlign;
  public columnCount: number = 0;


  constructor(private resolver: ComponentFactoryResolver) { }


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
    this.padding.setData(rowData.padding);
    this.verticalAlignment.setData(rowData.verticalAlignment);
  }
}

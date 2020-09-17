import { Component, ViewChild } from '@angular/core';
import { BackgroundBase } from 'classes/background-base';
import { BorderBase } from 'classes/border-base';
import { ContainerWidgetDataBase } from 'classes/container-widget-data-base';
import { CornersBase } from 'classes/corners-base';
import { PaddingBase } from 'classes/padding-base';
import { ShadowBase } from 'classes/shadow-base';
import { ContainerComponent } from '../container/container.component';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'container-widget',
  templateUrl: './container-widget.component.html',
  styleUrls: ['./container-widget.component.scss']
})
export class ContainerWidgetComponent extends WidgetComponent {
  @ViewChild('container', { static: false }) container: ContainerComponent;
  public background: BackgroundBase = new BackgroundBase();
  public border: BorderBase = new BorderBase();
  public corners: CornersBase = new CornersBase();
  public shadow: ShadowBase = new ShadowBase();
  public padding: PaddingBase = new PaddingBase();

  ngOnInit() {
    this.height = 250;
  }


  setData(widgetData: ContainerWidgetDataBase) {
    this.background.setData(widgetData.background);
    this.border.setData(widgetData.border);
    this.corners.setData(widgetData.corners);
    this.shadow.setData(widgetData.shadow);
    this.padding.addClasses(widgetData.breakpoints, this.widgetElement, widgetData.padding);

    super.setData(widgetData);
  }

}

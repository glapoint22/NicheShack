import { Component, OnInit } from '@angular/core';
import { WidgetType } from 'classes/widget-type';
import { WidgetData } from 'projects/manager/src/app/classes/widget-data';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'divider-widget',
  templateUrl: './divider-widget.component.html',
  styleUrls: ['./divider-widget.component.scss']
})
export class DividerWidgetComponent extends WidgetComponent implements OnInit {

  

  ngOnInit() {
    this.name = this.defaultName = 'Divider';
    this.type = WidgetType.Divider;
    super.ngOnInit();
  }


  setData(widgetData: WidgetData) {
    super.setData(widgetData);
  }


  getData(): WidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: this.height,
      horizontalAlignment: widgetData.horizontalAlignment,
      breakpoints: widgetData.breakpoints
    }
  }

}

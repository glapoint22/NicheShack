import { Component, OnInit } from '@angular/core';
import { WidgetType } from 'classes/widget-type';
import { SectionWidgetData } from 'projects/manager/src/app/classes/section-widget-data';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'section-widget',
  templateUrl: './section-widget.component.html',
  styleUrls: ['./section-widget.component.scss']
})
export class SectionWidgetComponent extends WidgetComponent implements OnInit {
  public sectionType: number;


  ngOnInit() {
    this.name = this.defaultName = 'Section';
    this.type = WidgetType.Section;
    super.ngOnInit();
  }


  setData(widgetData: SectionWidgetData) {
    this.sectionType = widgetData.sectionType;
    super.setData(widgetData);
  }


  getData(): SectionWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: this.height,
      horizontalAlignment: widgetData.horizontalAlignment,
      breakpoints: widgetData.breakpoints,
      sectionType: this.sectionType
    }
  }


  getText(): string {
    let text: string;

    switch (this.sectionType) {
      case 1:
        text = 'Bonus';
        break;
      case 2:
        text = 'Components';
        break;
      case 3:
        text = 'Component';
        break;

      default:
        text = 'Bonuses';
        break;
    }

    return text;
  }

}

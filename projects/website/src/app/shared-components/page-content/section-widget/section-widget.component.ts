import { Component } from '@angular/core';
import { SectionWidgetData } from '../../../classes/section-widget-data';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'section-widget',
  templateUrl: './section-widget.component.html',
  styleUrls: ['./section-widget.component.scss']
})
export class SectionWidgetComponent extends WidgetComponent {
  public sectionType: number;

  setData(widgetData: SectionWidgetData) {
    this.sectionType = widgetData.sectionType;
    super.setData(widgetData);
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
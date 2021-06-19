import { Component, Input } from '@angular/core';
import { PageService } from '../../../services/page.service';
import { SectionWidgetComponent } from '../../designer/widgets/section-widget/section-widget.component';

@Component({
  selector: 'section-widget-properties',
  templateUrl: './section-widget-properties.component.html',
  styleUrls: ['./section-widget-properties.component.scss']
})
export class SectionWidgetPropertiesComponent {
  @Input() sectionWidget: SectionWidgetComponent;

  constructor(public pageService: PageService) { }

}

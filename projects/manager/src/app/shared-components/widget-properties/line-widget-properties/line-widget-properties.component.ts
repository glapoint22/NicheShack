import { Component, Input } from '@angular/core';
import { LineWidgetComponent } from '../../designer/widgets/line-widget/line-widget.component';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'line-widget-properties',
  templateUrl: './line-widget-properties.component.html',
  styleUrls: ['./line-widget-properties.component.scss']
})
export class LineWidgetPropertiesComponent {
  @Input() lineWidget: LineWidgetComponent;

  constructor(public pageService: PageService) { }
}
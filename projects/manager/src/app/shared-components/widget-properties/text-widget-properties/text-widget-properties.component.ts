import { Component, Input } from '@angular/core';
import { TextWidgetComponent } from '../../designer/widgets/text-widget/text-widget.component';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'text-widget-properties',
  templateUrl: './text-widget-properties.component.html',
  styleUrls: ['./text-widget-properties.component.scss']
})
export class TextWidgetPropertiesComponent {
  @Input() textWidget: TextWidgetComponent;

  constructor(public pageService: PageService) { }
}
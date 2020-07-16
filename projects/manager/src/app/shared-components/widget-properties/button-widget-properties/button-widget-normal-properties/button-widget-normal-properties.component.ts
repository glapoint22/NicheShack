import { Component, Input } from '@angular/core';
import { ButtonWidgetComponent } from '../../../designer/widgets/button-widget/button-widget.component';
import { PageService } from 'projects/manager/src/app/services/page.service';

@Component({
  selector: 'button-widget-normal-properties',
  templateUrl: './button-widget-normal-properties.component.html',
  styleUrls: ['./button-widget-normal-properties.component.scss']
})
export class ButtonWidgetNormalPropertiesComponent {
  @Input() buttonWidget: ButtonWidgetComponent;

  constructor(public pageService: PageService) { }
}
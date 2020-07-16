import { Component, Input } from '@angular/core';
import { ContainerWidgetComponent } from '../../designer/widgets/container-widget/container-widget.component';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'container-widget-properties',
  templateUrl: './container-widget-properties.component.html',
  styleUrls: ['./container-widget-properties.component.scss']
})
export class ContainerWidgetPropertiesComponent {
  @Input() containerWidget: ContainerWidgetComponent;

  constructor(public pageService: PageService) { }
}
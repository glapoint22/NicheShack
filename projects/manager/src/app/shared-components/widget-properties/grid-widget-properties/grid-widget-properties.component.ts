import { Component, Input } from '@angular/core';
import { GridWidgetComponent } from '../../designer/widgets/grid-widget/grid-widget.component';

@Component({
  selector: 'grid-widget-properties',
  templateUrl: './grid-widget-properties.component.html',
  styleUrls: ['./grid-widget-properties.component.scss']
})
export class GridWidgetPropertiesComponent {
  @Input() gridWidget: GridWidgetComponent;
}

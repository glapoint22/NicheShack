import { Component, Input } from '@angular/core';
import { ImageWidgetComponent } from '../../designer/widgets/image-widget/image-widget.component';

@Component({
  selector: 'image-widget-properties',
  templateUrl: './image-widget-properties.component.html',
  styleUrls: ['./image-widget-properties.component.scss']
})
export class ImageWidgetPropertiesComponent {
  @Input() imageWidget: ImageWidgetComponent;
}
import { Component, Input } from '@angular/core';
import { ImageWidgetComponent } from '../../designer/widgets/image-widget/image-widget.component';
import { MediaType } from '../../../classes/media';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'image-widget-properties',
  templateUrl: './image-widget-properties.component.html',
  styleUrls: ['./image-widget-properties.component.scss']
})
export class ImageWidgetPropertiesComponent {
  @Input() imageWidget: ImageWidgetComponent;
  public mediaType = MediaType;
  
  constructor(public pageService: PageService) { }
}
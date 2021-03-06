import { Component, Input } from '@angular/core';
import { VideoWidgetComponent } from '../../designer/widgets/video-widget/video-widget.component';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'video-widget-properties',
  templateUrl: './video-widget-properties.component.html',
  styleUrls: ['./video-widget-properties.component.scss']
})
export class VideoWidgetPropertiesComponent {
  @Input() videoWidget: VideoWidgetComponent;

  constructor(public pageService: PageService) { }
}

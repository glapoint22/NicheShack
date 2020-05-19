import { Component, Input } from '@angular/core';
import { Video } from 'projects/manager/src/app/classes/video';

@Component({
  selector: 'video-property',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  @Input() video: Video;
}

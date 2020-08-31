import { Component, Input, Output, EventEmitter, OnChanges, DoCheck } from '@angular/core';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { PopupService } from 'projects/manager/src/app/services/popup.service';
import { Video } from 'projects/manager/src/app/classes/video';

@Component({
  selector: 'video-property',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnChanges, DoCheck {
  constructor(private popupService: PopupService){}
  @Input() video: Video;
  @Output() onChange: EventEmitter<void> = new EventEmitter();
  private currentVideoId: number;


  ngDoCheck() {
    if (this.currentVideoId != this.video.id) {
      this.currentVideoId = this.video.id;
      this.onChange.emit();
    }
  }


  ngOnChanges() {
    this.currentVideoId = this.video.id;
  }





  // -----------------------------( ON VIDEO ICON CLICK )------------------------------ \\
  onVideoIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.Video;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;
    this.popupService.mediaBrowserPopup.media = this.video;
    this.popupService.mediaBrowserPopup.media = this.video;
  }
}
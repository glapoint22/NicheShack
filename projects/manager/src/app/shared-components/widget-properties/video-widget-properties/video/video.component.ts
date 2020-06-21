import { Component, Input } from '@angular/core';
import { Video } from 'projects/manager/src/app/classes/video';
import { MediaType } from 'projects/manager/src/app/classes/media';
import { PopupService } from 'projects/manager/src/app/services/popup.service';

@Component({
  selector: 'video-property',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  constructor(private popupService: PopupService){}

  // ******************************************************************************************************************
  @Input() video: Video;// <======= Property type needs to change so it can work with a property on media browser popup
  // ******************************************************************************************************************

  // -----------------------------( ON VIDEO ICON CLICK )------------------------------ \\
  onVideoIconClick(sourceElement: HTMLElement) {
    this.popupService.mediaType = MediaType.Video;
    this.popupService.sourceElement = sourceElement;
    this.popupService.mediaBrowserPopup.show = !this.popupService.mediaBrowserPopup.show;


    // *******************************************************
    // this.popupService.mediaBrowserPopup.video = this.video;
    // this.popupService.mediaBrowserPopup.video = this.video;
    // *******************************************************
  }
}

import { Component, Input } from '@angular/core';
import { ProductInfo } from '../../interfaces/product-info';
import { ShareService } from '../../services/share.service';
import { Media, MediaType } from '../../interfaces/media';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from 'projects/manager/src/app/classes/video';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  @Input() productInfo: ProductInfo;
  public selectedMedia: Media;
  public mediaType = MediaType;
  public currentMediaIndex: number = 0;
  public showVideoPlayer: boolean;
  public showVideoOverlay: boolean;
  private videoOverlayTimer: number;
  private mobileVideo: Video;

  constructor(public shareService: ShareService, private sanitizer: DomSanitizer) { }


  ngOnChanges() {
    this.selectedMedia = this.productInfo.media[0];

    // Set the safe url for each video
    this.productInfo.media.forEach((media: Media) => {
      if (media.type == MediaType.Video) {
        this.setVideo(media);
      }
    });
  }



  onThumbnailClick(media: Media) {
    this.selectedMedia = media;
  }


  onBuyClick(hoplink: string) {
    window.location.href = hoplink;
  }

  getProductUrl(): string {
    return '/' + this.productInfo.product.urlName + '/' + this.productInfo.product.id;
  }


  setVideo(media: Media) {
    media.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(media.url);
  }



  playVideo(media: Media) {
    if (media.type == MediaType.Video) {
      window.setTimeout(() => {
        let videoIframe = document.getElementById('video-iframe') as HTMLIFrameElement;
        this.mobileVideo = new Video(videoIframe);
        this.mobileVideo.url = media.url;
        this.mobileVideo.play();
      });

      this.selectedMedia = media;
      this.showVideoPlayer = true;
      this.showVideoOverlay = true;
      this.videoOverlayTimer = window.setTimeout(() => {
        this.showVideoOverlay = false;
      }, 3000);
    }
  }


  onVideoPlayerClick() {
    window.clearTimeout(this.videoOverlayTimer);

    this.showVideoOverlay = true;

    this.videoOverlayTimer = window.setTimeout(() => {
      this.showVideoOverlay = false;
    }, 3000);
  }


  closeVideoPlayer() {
    this.showVideoPlayer = false;
    this.showVideoOverlay = false;
    this.mobileVideo.stop();
  }
}
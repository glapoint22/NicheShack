import { Component, Input, ViewChild, OnChanges, AfterViewInit } from '@angular/core';
import { ProductInfo } from '../../interfaces/product-info';
import { ShareService } from '../../services/share.service';
import { Media, MediaType } from '../../interfaces/media';
import { DomSanitizer } from '@angular/platform-browser';
import { Video } from 'projects/manager/src/app/classes/video';
import { ReportItemComponent } from './report-item/report-item.component';
import { Router } from '@angular/router';
import { AccountService } from 'services/account.service';
import { Subscription } from 'rxjs';
import { RedirectService } from '../../services/redirect.service';
import { AddToListComponent } from './add-to-list/add-to-list.component';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnChanges, AfterViewInit {
  @Input() productInfo: ProductInfo;
  @ViewChild('reportItem', { static: false }) reportItem: ReportItemComponent;
  @ViewChild('addToList', { static: false }) addToList: AddToListComponent;
  public selectedMedia: Media;
  public mediaType = MediaType;
  public currentMediaIndex: number = 0;
  public showVideoPlayer: boolean;
  public showVideoOverlay: boolean;
  private videoOverlayTimer: number;
  private mobileVideo: Video;
  private subscription: Subscription;
  private isSignedIn: boolean;


  constructor(
    public shareService: ShareService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private accountService: AccountService,
    private redirectService: RedirectService
  ) { }





  ngOnChanges() {
    this.selectedMedia = this.productInfo.media[0];

    // Set the safe url for each video
    this.productInfo.media.forEach((media: Media) => {
      if (media.type == MediaType.Video) {
        this.setVideo(media);
      }
    });
  }


  ngAfterViewInit() {
    // Find out if the customer is signed in
    this.subscription = this.accountService.isSignedIn
      .subscribe((value: boolean) => {

        // Are we signed in
        this.isSignedIn = value;

        // If this is a redirect and we have a callback
        if (this.redirectService.callback == 'onReportItemClick') {
          window.setTimeout(() => {
            this.redirectService.callback = null;
            window.scrollTo(0, this.redirectService.scrollPosition);
            this.onReportItemClick();
          });
        } else if (this.redirectService.callback == 'onAddToListClick') {
          window.setTimeout(() => {
            this.redirectService.callback = null;
            window.scrollTo(0, this.redirectService.scrollPosition);
            this.onAddToListClick();
          });
        }
      });
  }


  onThumbnailClick(media: Media) {
    this.selectedMedia = media;
  }


  onBuyClick(hoplink: string) {
    window.open(hoplink, '_blank');
  }

  getProductUrl(): string {
    return '/' + this.productInfo.product.urlName + '/' + this.productInfo.product.urlId;
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


  onReportItemClick() {
    if (this.isSignedIn) {
      this.reportItem.show = true;
    } else {
      this.redirectService.redirect = { path: location.pathname, queryParams: null };
      this.redirectService.scrollPosition = window.scrollY;
      this.redirectService.callback = 'onReportItemClick';
      this.router.navigate(['/sign-in']);
    }
  }



  onAddToListClick() {
    if (this.isSignedIn) {
      this.addToList.show = true;
    } else {
      this.redirectService.redirect = { path: location.pathname, queryParams: null };
      this.redirectService.scrollPosition = window.scrollY;
      this.redirectService.callback = 'onAddToListClick';
      this.router.navigate(['/sign-in']);
    }
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProportionalWidgetComponent } from '../proportional-widget/proportional-widget.component';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'video-widget',
  templateUrl: './video-widget.component.html',
  styleUrls: ['./video-widget.component.scss']
})
export class VideoWidgetComponent extends ProportionalWidgetComponent implements BreakpointsComponent {
  @ViewChild('svg', { static: false }) placeholder: ElementRef;
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public video: string;
  public sanitizedVideo: SafeUrl;
  public handleMove: boolean;

  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService, private sanitizer: DomSanitizer) { super(widgetService, breakpointService) }


  ngOnInit() {
    // this.video = 'https://player.vimeo.com/video/264188894';
    this.sanitizedVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.video);
    super.ngOnInit();
  }

  onHandleMousedown(verticalHandle: string, horizontalHandle: string, event: MouseEvent) {
    this.handleMove = true;
    super.onHandleMousedown(verticalHandle, horizontalHandle, event);
  }

  mouseUp(onMousemove, onMouseup) {
    this.handleMove = false;
    super.mouseUp(onMousemove, onMouseup);
  }



  buildHTML(parent: HTMLElement) {
    let video: HTMLDivElement;

    // If we have a video
    if (this.video) {
      let iframe = document.createElement('iframe');

      video = document.createElement('div');
      let container = document.createElement('div');

      container.style.position = 'relative';
      container.style.width = '100%';
      container.style.height = '0';
      container.style.paddingBottom = '56.25%';
      video.appendChild(container);

      iframe.frameBorder = '0';
      iframe.allowFullscreen = true;
      iframe.src = this.video;
      iframe.align = 'top';
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';

      container.appendChild(iframe);


      // We use the placehoder
    } else {
      let svg = this.placeholder.nativeElement.cloneNode(true);

      // Set the svg style
      svg.style.fill = '#52adfb';
      svg.style.width = '50%';
      svg.style.height = '50%';

      // Add styling to center the svg
      video = document.createElement('div');
      video.style.display = 'flex';
      video.style.justifyContent = 'center';
      video.style.alignItems = 'center';
      video.appendChild(svg);
    }

    // Styles and attributes
    video.style.width = '100%';
    video.style.maxWidth = this.width + 'px';


    // Border, corners, and show styles
    this.border.applyStyle(video);
    this.corners.applyStyle(video);
    this.shadow.applyStyle(video);

    // Set the classes
    this.breakpointService.setBreakpointClasses(this, video);

    // Place the video inside the parent
    parent.appendChild(video);
  }
}
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProportionalWidgetComponent } from '../proportional-widget/proportional-widget.component';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { Video } from 'projects/manager/src/app/classes/video';
import { VideoWidgetData } from 'projects/manager/src/app/classes/video-widget-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';

@Component({
  selector: 'video-widget',
  templateUrl: './video-widget.component.html',
  styleUrls: ['./video-widget.component.scss']
})
export class VideoWidgetComponent extends ProportionalWidgetComponent implements BreakpointsComponent {
  @ViewChild('svg', { static: false }) placeholder: ElementRef;
  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public video: Video;
  

  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }


  ngOnInit() {
    this.name = 'Video';
    this.type = WidgetType.Video;
    super.ngOnInit();
  }


  ngAfterViewInit() {
    this.video = new Video(this.iframe.nativeElement);
    // this.video.thumbnail = 'thumbnail1.png';
    // this.video.url = 'https://www.youtube.com/embed/1AI6RS1st2E';
    // this.video.url = '//player.vimeo.com/video/173192945?muted=false';
    
  }


  load(widgetData: VideoWidgetData) {
    this.border.load(widgetData.border);
    this.corners.load(widgetData.corners);
    this.shadow.load(widgetData.shadow);
    this.video.load(widgetData.video);
    super.load(widgetData);
  }



  save(columnData: ColumnData) {
    let videoWidgetData = columnData.widgetData = new VideoWidgetData();

    // Name
    if (this.name != 'Video') videoWidgetData.name = this.name;
    
    // Border
    this.border.save(videoWidgetData.border);

    // Corners
    this.corners.save(videoWidgetData.corners);

    // Shadow
    this.shadow.save(videoWidgetData.shadow);

    // Video
    this.video.save(videoWidgetData.video);

    super.save(columnData);
  }


  buildHTML(parent: HTMLElement) {
    let video: HTMLDivElement;

    // If we have a video
    if (this.video.url) {
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
      iframe.src = this.video.url;
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
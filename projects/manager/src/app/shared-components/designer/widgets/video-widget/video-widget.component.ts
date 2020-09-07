import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProportionalWidgetComponent } from '../proportional-widget/proportional-widget.component';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { WidgetType } from 'classes/widget-type';
import { VideoWidgetData } from 'projects/manager/src/app/classes/video-widget-data';
import { Video } from 'projects/manager/src/app/classes/video';

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
  
  ngOnInit() {
    this.name = this.defaultName = 'Video';
    this.type = WidgetType.Video;
    super.ngOnInit();
  }


  ngAfterViewInit() {
    this.video = new Video(this.iframe.nativeElement);
    super.ngAfterViewInit();
    
  }


  setData(widgetData: VideoWidgetData) {
    this.border.setData(widgetData.border);
    this.corners.setData(widgetData.corners);
    this.shadow.setData(widgetData.shadow);
    this.video.setData(widgetData.video);
    super.setData(widgetData);
  }



  getData(): VideoWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: this.height,
      horizontalAlignment: widgetData.horizontalAlignment,
      border: this.border.getData(),
      corners: this.corners.getData(),
      shadow: this.shadow.getData(),
      video: this.video.getData(),
      breakpoints: []
    }
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
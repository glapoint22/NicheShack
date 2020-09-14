import { Component, ElementRef, ViewChild } from '@angular/core';
import { BorderBase } from 'classes/border-base';
import { CornersBase } from 'classes/corners-base';
import { ShadowBase } from 'classes/shadow-base';
import { VideoWidgetDataBase } from 'classes/video-widget-data-base';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'video-widget',
  templateUrl: './video-widget.component.html',
  styleUrls: ['./video-widget.component.scss']
})
export class VideoWidgetComponent extends WidgetComponent {
  @ViewChild('iframe', { static: false }) iframe: ElementRef<HTMLIFrameElement>;
  public border: BorderBase = new BorderBase();
  public corners: CornersBase = new CornersBase();
  public shadow: ShadowBase = new ShadowBase();


  setData(widgetData: VideoWidgetDataBase) {
    this.border.setData(widgetData.border);
    this.corners.setData(widgetData.corners);
    this.shadow.setData(widgetData.shadow);
    super.setData(widgetData);

    // Set the video src
    this.iframe.nativeElement.src = widgetData.video.url;
  }
}

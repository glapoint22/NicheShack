import { Component } from '@angular/core';
import { BorderBase } from 'classes/border-base';
import { CornersBase } from 'classes/corners-base';
import { ImageBase } from 'classes/Image-base';
import { ImageWidgetDataBase } from 'classes/image-widget-data-base';
import { LinkBase } from 'classes/link-base';
import { ShadowBase } from 'classes/shadow-base';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss']
})
export class ImageWidgetComponent extends WidgetComponent {
  public border: BorderBase = new BorderBase();
  public corners: CornersBase = new CornersBase();
  public shadow: ShadowBase = new ShadowBase();
  public link: LinkBase = new LinkBase();
  public image: ImageBase = new ImageBase();

  setData(widgetData: ImageWidgetDataBase) {
    this.border.setData(widgetData.border);
    this.corners.setData(widgetData.corners);
    this.shadow.setData(widgetData.shadow);
    this.link.setData(widgetData.link);
    this.image.setData(widgetData.image);
    super.setData(widgetData);

    // If this image has a link
    if (this.link.url) {
      let anchorElement = this.widgetElement as HTMLAnchorElement;

      anchorElement.href = this.link.url;
      anchorElement.target = '_blank';
    }
  }


}

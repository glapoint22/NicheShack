import { Component } from '@angular/core';
import { BorderBase } from 'classes/border-base';
import { CornersBase } from 'classes/corners-base';
import { ImageBase } from 'classes/Image-base';
import { ImageWidgetDataBase } from 'classes/image-widget-data-base';
import { LinkBase, LinkOption } from 'classes/link-base';
import { ShadowBase } from 'classes/shadow-base';
import { LinkService } from 'services/link.service';
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
  public linkOption = LinkOption;

  constructor(public linkService: LinkService) { super() }

  setData(widgetData: ImageWidgetDataBase) {
    this.border.setData(widgetData.border);
    this.corners.setData(widgetData.corners);
    this.shadow.setData(widgetData.shadow);
    this.link.setData(widgetData.link);
    this.image.setData(widgetData.image);
    super.setData(widgetData);
  }
}
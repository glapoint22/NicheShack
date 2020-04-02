import { Component } from '@angular/core';
import { FormService } from 'projects/manager/src/app/services/form.service';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { ProportionalWidgetComponent } from '../proportional-widget/proportional-widget.component';
import { Color } from 'projects/manager/src/app/classes/color';
import { LinkSource } from 'projects/manager/src/app/classes/link-source';
import { Link } from 'projects/manager/src/app/classes/link';

@Component({
  selector: 'image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss']
})
export class ImageWidgetComponent extends ProportionalWidgetComponent implements LinkSource {
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public image: string = '68010370e5514c82b1e5b138143d0862.png';
  public link: Link = new Link();

  constructor(widgetService: WidgetService, public _FormService: FormService) { super(widgetService) }




  // ----------------------------------------------------( ON EDIT )--------------------------------------------------\\
  onEdit() {
    this._FormService.border = this.border;
    this._FormService.corners = this.corners;
    this._FormService.shadow = this.shadow;
    this._FormService.horizontalAlignment = this.horizontalAlignment;
    this._FormService.linkSource = this;

    // Open the image form
    this._FormService.showImageForm = true;
  }


  // -------------------------------------------------( GET BORDER COLOR )-----------------------------------------------\\
  getBorderColor() {
    return Color.RGBAToHexA(this.border.color);
  }


  // -------------------------------------------------( GET SHADOW COLOR )-----------------------------------------------\\
  getShadowColor() {
    return Color.RGBAToHexA(this.shadow.color);
  }

  onImageLoad(event) {
    this.width = event.srcElement.naturalWidth;
  }


  buildHTML(parent: HTMLElement) {
    let img = document.createElement('img');

    img.src = 'images/' + this.image;
    img.style.width = '100%';
    img.style.maxWidth = this.width + 'px';
    
    
    this.border.applyStyle(img);
    this.corners.applyStyle(img);
    this.shadow.applyStyle(img);

    if (this.link.url) {
      let anchor = document.createElement('a');

      this.horizontalAlignment.applyStyle(anchor);

      img.style.display = 'inline';

      anchor.style.display = 'block';
      anchor.style.maxWidth = this.width + 'px';
      anchor.style.width = '100%';
      anchor.href = this.link.url;
      anchor.target = '_blank';
      anchor.appendChild(img);
      parent.appendChild(anchor);
    } else {
      img.style.display = 'block';
      this.horizontalAlignment.applyStyle(img);

      parent.appendChild(img);
      
    }


  }
}

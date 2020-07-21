import { Component, ViewChild, ElementRef } from '@angular/core';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { ProportionalWidgetComponent } from '../proportional-widget/proportional-widget.component';
import { Link } from 'projects/manager/src/app/classes/link';
import { Image } from 'projects/manager/src/app/classes/image';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { ImageWidgetData } from 'projects/manager/src/app/classes/image-widget-data';

@Component({
  selector: 'image-widget',
  templateUrl: './image-widget.component.html',
  styleUrls: ['./image-widget.component.scss']
})
export class ImageWidgetComponent extends ProportionalWidgetComponent implements BreakpointsComponent {
  @ViewChild('svg', { static: false }) placeholder: ElementRef;
  public border: Border = new Border();
  public corners: Corners = new Corners();
  public shadow: Shadow = new Shadow();
  public image: Image = new Image();
  public link: Link = new Link();
  public imageLoaded: boolean;

  ngOnInit() {
    this.name = this.defaultName = 'Image';
    this.type = WidgetType.Image;
    super.ngOnInit();
  }

  onImageLoad(event) {
    if (!this.width && !this.height) {
      this.width = event.srcElement.naturalWidth;
      this.height = event.srcElement.naturalHeight;
    }

    this.imageLoaded = true;
  }

  setData(widgetData: ImageWidgetData) {
    this.border.setData(widgetData.border);
    this.corners.setData(widgetData.corners);
    this.shadow.setData(widgetData.shadow);
    this.link.setData(widgetData.link);
    this.image.setData(widgetData.image);
    super.setData(widgetData);
  }




  getData(): ImageWidgetData {
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
      link: this.link.getData(),
      image: this.image.getData(),
      breakpoints: []
    }
  }



  buildHTML(parent: HTMLElement) {
    let img: any;

    // If we have an image
    if (this.image.url) {
      img = document.createElement('img');
      img.src = 'images/' + this.image.url;
      img.style.display = 'block';
      // We use the placehoder
    } else {
      let svg = this.placeholder.nativeElement.cloneNode(true);

      // Set the svg style
      svg.style.fill = '#52adfb';
      svg.style.width = '50%';
      svg.style.height = '50%';

      // Add styling to center the svg
      img = document.createElement('div');
      img.style.display = 'flex';
      img.style.justifyContent = 'center';
      img.style.alignItems = 'center';
      img.appendChild(svg);
    }

    // Styles and attributes
    img.style.width = '100%';
    img.style.maxWidth = this.width + 'px';
    img.alt = this.image.name;
    img.title = this.image.name;


    // Border, corners, and show styles
    this.border.applyStyle(img);
    this.corners.applyStyle(img);
    this.shadow.applyStyle(img);

    // If a link was applied
    if (this.link.url) {
      let anchor = document.createElement('a');

      // Set the anchor styles and attributes
      anchor.style.display = 'block';
      anchor.style.maxWidth = this.width + 'px';
      anchor.style.width = '100%';
      anchor.href = this.link.url;
      anchor.target = '_blank';

      // If we have an image, display it as inline
      if (this.image.url) img.style.display = 'inline';

      // Set the classes
      this.breakpointService.setBreakpointClasses(this, anchor);


      // Place the image inside the anchor and place the anchor inside the parent
      anchor.appendChild(img);
      parent.appendChild(anchor);
    } else {

      // Set the classes
      this.breakpointService.setBreakpointClasses(this, img);

      // Place the image inside the parent
      parent.appendChild(img);
    }
  }
}
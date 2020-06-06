import { Component, ViewChild, ElementRef } from '@angular/core';
import { Border } from 'projects/manager/src/app/classes/border';
import { Corners } from 'projects/manager/src/app/classes/corners';
import { Shadow } from 'projects/manager/src/app/classes/shadow';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { ProportionalWidgetComponent } from '../proportional-widget/proportional-widget.component';
import { Link } from 'projects/manager/src/app/classes/link';
import { Image } from 'projects/manager/src/app/classes/image';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { BreakpointsComponent } from 'projects/manager/src/app/classes/breakpoints-component';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { WidgetData } from 'projects/manager/src/app/classes/widget-data';
import { ImageWidgetData } from 'projects/manager/src/app/classes/image-widget-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';

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

  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }

  ngOnInit() {
    // this.image.url = '0aada12f8b21471ea96aebe9a503977b.png';
    // this.image.title = 'Alita';
    this.name = 'Image';
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

  load(widgetData: ImageWidgetData) {
    this.border.load(widgetData.border);
    this.corners.load(widgetData.corners);
    this.shadow.load(widgetData.shadow);
    this.link.load(widgetData.link);
    this.image.load(widgetData.image);
    super.load(widgetData);
  }




  save(columnData: ColumnData) {
    let imageWidgetData = columnData.widgetData = new ImageWidgetData();

    // Name
    if (this.name != 'Image') imageWidgetData.name = this.name;
    
    // Border
    this.border.save(imageWidgetData.border);

    // Corners
    this.corners.save(imageWidgetData.corners);

    // Shadow
    this.shadow.save(imageWidgetData.shadow);

    // Image
    this.image.save(imageWidgetData.image);

    // Link
    this.link.save(imageWidgetData.link);

    super.save(columnData);
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
    img.alt = this.image.title;
    img.title = this.image.title;


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
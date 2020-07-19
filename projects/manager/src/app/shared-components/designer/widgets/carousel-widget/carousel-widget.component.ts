import { Component, ViewChild, ElementRef } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { CarouselBanner } from 'projects/manager/src/app/classes/carousel-banner';
import { CarouselWidgetData } from 'projects/manager/src/app/classes/carousel-widget-data';
import { CarouselBannerData } from 'projects/manager/src/app/classes/carousel-banner-data';
import { ColumnData } from 'projects/manager/src/app/classes/column-data';
import { Image } from 'projects/manager/src/app/classes/image';

@Component({
  selector: 'carousel-widget',
  templateUrl: './carousel-widget.component.html',
  styleUrls: ['./carousel-widget.component.scss']
})
export class CarouselWidgetComponent extends FreeformWidgetComponent {
  @ViewChild('svg', { static: false }) placeholder: ElementRef;
  public banners: Array<CarouselBanner> = [];
  public currentBannerIndex: number = 0;


  ngOnInit() {
    this.name = 'Carousel';
    this.type = WidgetType.Carousel;
    super.ngOnInit();
  }





  setData(widgetData: CarouselWidgetData) {
    widgetData.banners.forEach((banner: CarouselBannerData) => {
      this.banners.push(new CarouselBanner(banner));
    });
    super.setData(widgetData);
  }


  getData(columnData: ColumnData) {
    let carouselWidgetData = columnData.widgetData = new CarouselWidgetData();

    // Name
    if (this.name != 'Carousel') carouselWidgetData.name = this.name;

    // Categories
    if (this.banners.length > 0) carouselWidgetData.banners = this.banners;

    super.getData(columnData);
  }




  buildHTML(parent: HTMLElement) {
    let container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';


    let img: any;
    let currentImage: Image;

    // If we have an image
    if (this.banners.length > 0) {
      currentImage = this.banners[this.currentBannerIndex].image;
      img = document.createElement('img');
      img.src = 'images/' + currentImage.url;
      img.style.display = 'block';
      img.style.width = '100%';
      img.style.maxWidth = '1496px';
      img.style.maxHeight = '451px';
      img.style.objectFit = 'cover';
      img.alt = currentImage.name;
      img.title = currentImage.name;


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
    img.style.maxWidth = '1496px';





    // If a link was applied
    if (this.banners.length > 0 && this.banners[this.currentBannerIndex].link.url) {
      let anchor = document.createElement('a');
      let link = this.banners[this.currentBannerIndex].link;

      // Set the anchor styles and attributes
      anchor.style.display = 'block';
      anchor.style.maxWidth = '1496px';
      anchor.style.width = '100%';
      anchor.href = link.url;
      anchor.target = '_blank';

      // Set the classes
      this.breakpointService.setBreakpointClasses(this, anchor);


      // Place the image inside the anchor and place the anchor inside the parent
      anchor.appendChild(img);
      container.appendChild(anchor);
    } else {

      // Set the classes
      this.breakpointService.setBreakpointClasses(this, img);

      container.appendChild(img);
    }


    parent.appendChild(container);
  }
}
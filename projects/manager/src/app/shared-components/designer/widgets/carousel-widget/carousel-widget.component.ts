import { Component, ViewChild, ElementRef } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetType } from 'classes/widget-type';
import { LinkableImage } from 'classes/linkable-image';
import { CarouselWidgetData } from 'projects/manager/src/app/classes/carousel-widget-data';
import { LinkableImageData } from 'classes/linkable-image-data';
import { Image } from 'projects/manager/src/app/classes/image';
import { ImageBase } from 'classes/Image-base';

@Component({
  selector: 'carousel-widget',
  templateUrl: './carousel-widget.component.html',
  styleUrls: ['./carousel-widget.component.scss']
})
export class CarouselWidgetComponent extends FreeformWidgetComponent {
  @ViewChild('svg', { static: false }) placeholder: ElementRef;
  public banners: Array<LinkableImage> = [];
  public currentBannerIndex: number = 0;


  ngOnInit() {
    this.name = this.defaultName = 'Carousel';
    this.type = WidgetType.Carousel;
    super.ngOnInit();
  }





  setData(widgetData: CarouselWidgetData) {
    widgetData.banners.forEach((banner: LinkableImageData) => {
      this.banners.push(new LinkableImage(banner));
    });
    super.setData(widgetData);
  }


  getData(): CarouselWidgetData {
    let widgetData = super.getData();

    return {
      name: this.name != this.defaultName ? this.name : null,
      widgetType: widgetData.widgetType,
      width: widgetData.width,
      height: null,
      horizontalAlignment: widgetData.horizontalAlignment,
      banners: this.banners.length > 0 ? this.banners : [],
      breakpoints: []
    }
  }




  buildPreview(parent: HTMLElement) {
    let container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';


    let img: any;
    let currentImage: ImageBase;

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

      // Place the image inside the anchor and place the anchor inside the parent
      anchor.appendChild(img);
      container.appendChild(anchor);
    } else {
      container.appendChild(img);
    }


    parent.appendChild(container);
  }
}
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { LinkableImageBase } from 'classes/linkable-image-base';
import { LinkableImageData } from 'classes/linkable-image-data';
import { CarouselWidgetDataBase } from 'classes/carousel-widget-data-base';
import { LinkService } from 'services/link.service';
import { CarouselDirective } from '../../../directives/carousel.directive';
import { WidgetComponent } from '../widget/widget.component';

@Component({
  selector: 'carousel-widget',
  templateUrl: './carousel-widget.component.html',
  styleUrls: ['./carousel-widget.component.scss']
})
export class CarouselWidgetComponent extends WidgetComponent implements AfterViewInit {
  @ViewChild(CarouselDirective, { static: false }) carousel: CarouselDirective;
  public banners: Array<LinkableImageBase> = [];
  public currentBannerIndex: number = 0;

  constructor(
    private linkService: LinkService,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { super() }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.carousel.play();
    }
  }

  setData(widgetData: CarouselWidgetDataBase) {
    widgetData.banners.forEach((banner: LinkableImageData) => {
      this.banners.push(new LinkableImageBase(banner));
    });
  }

  onClick(index: number) {
    this.linkService.navigate(this.banners[index].link);
  }
}

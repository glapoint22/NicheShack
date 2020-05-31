import { Component } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { CarouselBanner } from 'projects/manager/src/app/classes/carousel-banner';
import { CarouselWidgetData } from 'projects/manager/src/app/classes/carousel-widget-data';
import { CarouselBannerData } from 'projects/manager/src/app/classes/carousel-banner-data';

@Component({
  selector: 'carousel-widget',
  templateUrl: './carousel-widget.component.html',
  styleUrls: ['./carousel-widget.component.scss']
})
export class CarouselWidgetComponent extends FreeformWidgetComponent {
  public banners: Array<CarouselBanner> = [];


  constructor(widgetService: WidgetService,
    breakpointService: BreakpointService) { super(widgetService, breakpointService) }


  ngOnInit() {
    this.height = 250
    this.name = 'Carousel';
    this.type = WidgetType.Carousel;
    super.ngOnInit();
  }

  load(widgetData: CarouselWidgetData) {
    widgetData.banners.forEach((banner: CarouselBannerData) => {
      this.banners.push(new CarouselBanner(banner));
    });
    super.load(widgetData);
  }
}
import { Component } from '@angular/core';
import { FreeformWidgetComponent } from '../freeform-widget/freeform-widget.component';
import { WidgetService } from 'projects/manager/src/app/services/widget.service';
import { BreakpointService } from 'projects/manager/src/app/services/breakpoint.service';
import { WidgetType } from 'projects/manager/src/app/classes/widget-type';
import { CarouselBanner } from 'projects/manager/src/app/classes/carousel-banner';

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

    // this.banners = [
    //   {
    //     image: {
    //       url: '13912b12e08343ef9f797289d39d189c.jpg',
    //       title: 'Keto'
    //     },
    //     link: {
    //       selectedOption: 'Page',
    //       url: 'http://www.alitamovie.com',
    //       disabled: false,
    //       linkDataChanged: false
    //     }
    //   }
    // ]

    super.ngOnInit();
  }

}

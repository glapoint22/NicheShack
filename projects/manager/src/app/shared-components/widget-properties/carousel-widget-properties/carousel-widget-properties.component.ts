import { Component, OnInit, Input } from '@angular/core';
import { CarouselWidgetComponent } from '../../designer/widgets/carousel-widget/carousel-widget.component';

@Component({
  selector: 'carousel-widget-properties',
  templateUrl: './carousel-widget-properties.component.html',
  styleUrls: ['./carousel-widget-properties.component.scss']
})
export class CarouselWidgetPropertiesComponent implements OnInit {
  @Input() carouselWidget: CarouselWidgetComponent;

  constructor() { }

  ngOnInit() {
  }

}

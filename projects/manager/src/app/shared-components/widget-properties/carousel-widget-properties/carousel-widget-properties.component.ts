import { Component, Input } from '@angular/core';
import { CarouselWidgetComponent } from '../../designer/widgets/carousel-widget/carousel-widget.component';
import { MediaType } from '../../../classes/media';

@Component({
  selector: 'carousel-widget-properties',
  templateUrl: './carousel-widget-properties.component.html',
  styleUrls: ['./carousel-widget-properties.component.scss']
})
export class CarouselWidgetPropertiesComponent {
  @Input() carouselWidget: CarouselWidgetComponent;
  public currentIndex: number = 0;
  public mediaType = MediaType;
}

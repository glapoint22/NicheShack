import { Component, Input, ViewChild } from '@angular/core';
import { CarouselWidgetComponent } from '../../designer/widgets/carousel-widget/carousel-widget.component';
import { MediaType } from '../../../classes/media';
import { LinkableImageBase } from '../../../../../../../classes/linkable-image-base';
import { PageService } from '../../../services/page.service';
import { PromptService } from 'services/prompt.service';
import { CounterComponent } from '../../counter/counter.component';
import { LinkableImage } from '../../../classes/linkable-image';

@Component({
  selector: 'carousel-widget-properties',
  templateUrl: './carousel-widget-properties.component.html',
  styleUrls: ['./carousel-widget-properties.component.scss']
})
export class CarouselWidgetPropertiesComponent {
  @Input() carouselWidget: CarouselWidgetComponent;
  @ViewChild('counter', { static: false }) counter: CounterComponent;
  public mediaType = MediaType;


  constructor(private promptService: PromptService, public pageService: PageService) { }


  // --------------------------------------------------------------------- On Add Banner --------------------------------------------------------
  onAddBannerClick() {
    this.carouselWidget.banners.push(new LinkableImage());
    this.counter.set(this.carouselWidget.banners.length);
    this.carouselWidget.currentBannerIndex = this.carouselWidget.banners.length - 1;
    this.pageService.save();
  }



  // --------------------------------------------------------------------- On Delete Click --------------------------------------------------------
  onDeleteClick() {
    // Prompt the user
    let promptTitle = 'Delete Banner';
    let promptMessage = 'Are you sure you want to delete this banner?';
    this.promptService.showPrompt(promptTitle, promptMessage, this.deleteBanner, this);
  }



  // --------------------------------------------------------------------- Delete Banner --------------------------------------------------------
  deleteBanner() {
    // Remove the banner
    this.carouselWidget.banners.splice(this.carouselWidget.currentBannerIndex, 1);

    // If we still have banners left
    if (this.carouselWidget.banners.length > 0) {
      this.carouselWidget.currentBannerIndex = Math.min(this.carouselWidget.banners.length - 1, this.carouselWidget.currentBannerIndex);
      this.counter.set(this.carouselWidget.currentBannerIndex + 1);
    }

    this.pageService.save();
  }
}

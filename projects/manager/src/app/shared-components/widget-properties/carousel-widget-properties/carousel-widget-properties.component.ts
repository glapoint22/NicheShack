import { Component, Input, ViewChild } from '@angular/core';
import { CarouselWidgetComponent } from '../../designer/widgets/carousel-widget/carousel-widget.component';
import { MediaType } from '../../../classes/media';
import { CarouselBanner } from '../../../classes/carousel-banner';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { PromptService } from '../../../services/prompt.service';

@Component({
  selector: 'carousel-widget-properties',
  templateUrl: './carousel-widget-properties.component.html',
  styleUrls: ['./carousel-widget-properties.component.scss']
})
export class CarouselWidgetPropertiesComponent {
  @Input() carouselWidget: CarouselWidgetComponent;
  @ViewChild('paginator', { static: false }) paginator: PaginatorComponent;
  public mediaType = MediaType;


  constructor(private promptService: PromptService) { }


  // --------------------------------------------------------------------- On Add Banner --------------------------------------------------------
  onAddBannerClick() {
    this.carouselWidget.banners.push(new CarouselBanner());
    this.paginator.setPage(this.carouselWidget.banners.length);
    this.carouselWidget.currentBannerIndex = this.carouselWidget.banners.length - 1;
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
      this.paginator.setPage(this.carouselWidget.currentBannerIndex + 1);
    }
  }
}

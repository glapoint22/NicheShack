import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsPageRoutingModule } from './reviews-page-routing.module';
import { ReviewsPageComponent } from './reviews-page.component';
import { ReviewsModule } from '../../shared-components/reviews/reviews.module';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';


@NgModule({
  declarations: [ReviewsPageComponent],
  imports: [
    CommonModule,
    ReviewsPageRoutingModule,
    ReviewsModule,
    HeaderFooterModule
  ]
})
export class ReviewsPageModule { }

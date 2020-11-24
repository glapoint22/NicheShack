import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { ReportReviewComponent } from './report-review/report-review.component';
import { ReviewComponent } from './review/review.component';
import { ReviewSummaryComponent } from './review-summary/review-summary.component';
import { FormsModule } from '@angular/forms';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { StarsModule } from 'shared-components/stars/stars.module';
import { PaginatorModule } from 'shared-components/paginator/paginator.module';



@NgModule({
  declarations: [
    ReviewsComponent,
    ReportReviewComponent,
    ReviewComponent,
    ReviewSummaryComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule,
    FormsModule,
    PaginatorModule,
    StarsModule
  ],
  exports: [
    ReviewsComponent,
    ReportReviewComponent,
    ReviewComponent,
    ReviewSummaryComponent
  ]
})
export class ReviewsModule { }

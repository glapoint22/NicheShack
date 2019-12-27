import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewsComponent } from './reviews.component';
import { ReportReviewComponent } from './report-review/report-review.component';
import { ReviewComponent } from './review/review.component';
import { ReviewSummaryComponent } from './review-summary/review-summary.component';
import { StarsModule } from '../stars/stars.module';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from '../paginator/paginator.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



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
    StarsModule,
    FormsModule,
    PaginatorModule
  ],
  exports: [
    ReviewsComponent,
    ReportReviewComponent,
    ReviewComponent,
    ReviewSummaryComponent
  ]
})
export class ReviewsModule { }

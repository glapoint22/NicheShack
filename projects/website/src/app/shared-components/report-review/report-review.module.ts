import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportReviewComponent } from './report-review.component';
import { ShowHideModule } from '../../directives/show-hide/show-hide.module';



@NgModule({
  declarations: [ReportReviewComponent],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [ReportReviewComponent]
})
export class ReportReviewModule { }

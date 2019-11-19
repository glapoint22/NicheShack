import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { ProductInfoModule } from '../../shared-components/product-info/product-info.module';
import { ReviewModule } from '../../shared-components/review/review.module';
import { ReportReviewModule } from '../../shared-components/report-review/report-review.module';
import { ReviewSummaryModule } from '../../shared-components/review-summary/review-summary.module';


@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    HeaderFooterModule,
    ProductInfoModule,
    ReviewModule,
    ReportReviewModule,
    ReviewSummaryModule
  ]
})
export class ProductPageModule { }

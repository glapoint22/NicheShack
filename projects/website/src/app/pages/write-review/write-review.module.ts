import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteReviewRoutingModule } from './write-review-routing.module';
import { WriteReviewComponent } from './write-review.component';
import { StarsModule } from '../../shared-components/stars/stars.module';
import { FormsModule } from '@angular/forms';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';


@NgModule({
  declarations: [WriteReviewComponent],
  imports: [
    CommonModule,
    WriteReviewRoutingModule,
    StarsModule,
    FormsModule,
    HeaderFooterModule
  ]
})
export class WriteReviewModule { }

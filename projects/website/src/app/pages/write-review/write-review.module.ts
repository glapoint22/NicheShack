import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WriteReviewRoutingModule } from './write-review-routing.module';
import { WriteReviewComponent } from './write-review.component';
import { FormsModule } from '@angular/forms';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { StarsModule } from 'shared-components/stars/stars.module';


@NgModule({
  declarations: [WriteReviewComponent],
  imports: [
    CommonModule,
    WriteReviewRoutingModule,
    FormsModule,
    HeaderFooterModule,
    StarsModule
  ]
})
export class WriteReviewModule { }

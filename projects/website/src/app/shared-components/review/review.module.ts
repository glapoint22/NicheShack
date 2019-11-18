import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review.component';
import { StarsModule } from '../stars/stars.module';



@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    StarsModule
  ],
  exports: [ReviewComponent]
})
export class ReviewModule { }

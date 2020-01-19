import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarginsComponent } from './margins.component';
import { RangeSliderModule } from '../range-slider/range-slider.module';



@NgModule({
  declarations: [MarginsComponent],
  imports: [
    CommonModule,
    RangeSliderModule
  ],

  exports: [MarginsComponent]
})
export class MarginsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaddingComponent } from './padding.component';
import { RangeSliderModule } from '../range-slider/range-slider.module';



@NgModule({
  declarations: [PaddingComponent],
  imports: [
    CommonModule,
    RangeSliderModule
  ],

  exports: [PaddingComponent]
})
export class PaddingModule { }

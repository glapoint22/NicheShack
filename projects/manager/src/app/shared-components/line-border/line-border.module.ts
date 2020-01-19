import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineBorderComponent } from './line-border.component';
import { RangeSliderModule } from '../range-slider/range-slider.module';



@NgModule({
  declarations: [LineBorderComponent],
  imports: [
    CommonModule,
    RangeSliderModule
  ],

  exports: [LineBorderComponent]
})
export class LineBorderModule { }

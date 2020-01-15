import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderComponent } from './border.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';
import { RangeSliderModule } from '../range-slider/range-slider.module';



@NgModule({
  declarations: [BorderComponent],
  imports: [
    CommonModule,
    ColorSwatchModule,
    RangeSliderModule
  ],

  exports: [BorderComponent]
})
export class BorderModule { }

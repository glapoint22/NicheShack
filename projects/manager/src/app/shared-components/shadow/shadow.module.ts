import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowComponent } from './shadow.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';
import { RangeSliderModule } from '../range-slider/range-slider.module';



@NgModule({
  declarations: [ShadowComponent],
  imports: [
    CommonModule,
    ColorSwatchModule,
    RangeSliderModule
  ],

  exports: [ShadowComponent]
})
export class ShadowModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeSliderComponent } from './range-slider.component';
import { MinMaxModule } from '../../directives/min-max/min-max.module';



@NgModule({
  declarations: [RangeSliderComponent],
  imports: [
    CommonModule,
    MinMaxModule
  ],

  exports: [RangeSliderComponent]
})
export class RangeSliderModule { }
  
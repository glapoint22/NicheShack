import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CornersComponent } from './corners.component';
import { RangeSliderModule } from '../range-slider/range-slider.module';



@NgModule({
  declarations: [CornersComponent],
  imports: [
    CommonModule,
    RangeSliderModule
  ],

  exports: [CornersComponent]
})
export class CornersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderComponent } from './border.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';



@NgModule({
  declarations: [BorderComponent],
  imports: [
    CommonModule,
    ColorSwatchModule
  ],

  exports: [BorderComponent]
})
export class BorderModule { }

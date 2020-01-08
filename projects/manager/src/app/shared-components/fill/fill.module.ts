import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FillComponent } from './fill.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';



@NgModule({
  declarations: [FillComponent],
  imports: [
    CommonModule,
    ColorSwatchModule
  ],

  exports: [FillComponent]

})
export class FillModule { }

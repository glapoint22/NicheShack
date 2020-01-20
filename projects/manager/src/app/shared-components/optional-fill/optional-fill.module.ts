import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionalFillComponent } from './optional-fill.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';



@NgModule({
  declarations: [OptionalFillComponent],
  imports: [
    CommonModule,
    ColorSwatchModule
  ],

  exports:[OptionalFillComponent]
})
export class OptionalFillModule { }

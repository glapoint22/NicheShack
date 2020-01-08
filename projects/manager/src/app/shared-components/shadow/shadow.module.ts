import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowComponent } from './shadow.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';



@NgModule({
  declarations: [ShadowComponent],
  imports: [
    CommonModule,
    ColorSwatchModule
  ],

  exports: [ShadowComponent]
})
export class ShadowModule { }

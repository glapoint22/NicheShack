import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonTextComponent } from './button-text.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';



@NgModule({
  declarations: [ButtonTextComponent],
  imports: [
    CommonModule,
    ColorSwatchModule
  ],

  exports: [ButtonTextComponent]
})
export class ButtonTextModule { }

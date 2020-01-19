import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonTextComponent } from './button-text.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ButtonTextComponent],
  imports: [
    CommonModule,
    ColorSwatchModule,
    FormsModule
  ],

  exports: [ButtonTextComponent]
})
export class ButtonTextModule { }

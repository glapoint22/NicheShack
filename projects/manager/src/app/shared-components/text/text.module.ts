import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './text.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';



@NgModule({
  declarations: [TextComponent],
  imports: [
    CommonModule,
    ColorSwatchModule
  ],

  exports: [TextComponent]
})
export class TextModule { }

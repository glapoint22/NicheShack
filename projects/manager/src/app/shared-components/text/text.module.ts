import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './text.component';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';
import { ColorIconModule } from '../color-icon/color-icon.module';



@NgModule({
  declarations: [TextComponent],
  imports: [
    CommonModule,
    ColorSwatchModule,
    ColorIconModule
  ],

  exports: [TextComponent]
})
export class TextModule { }

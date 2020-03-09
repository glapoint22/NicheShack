import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent } from './text.component';
import { ColorIconModule } from '../color-icon/color-icon.module';



@NgModule({
  declarations: [TextComponent],
  imports: [
    CommonModule,
    ColorIconModule
  ],

  exports: [TextComponent]
})
export class TextModule { }

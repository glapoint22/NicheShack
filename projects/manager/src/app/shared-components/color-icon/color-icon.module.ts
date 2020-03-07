import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorIconComponent } from './color-icon.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [ColorIconComponent],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [ColorIconComponent]
})
export class ColorIconModule { }

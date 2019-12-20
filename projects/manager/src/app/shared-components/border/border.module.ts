import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderComponent } from './border.component';



@NgModule({
  declarations: [BorderComponent],
  imports: [
    CommonModule
  ],

  exports: [BorderComponent]
})
export class BorderModule { }

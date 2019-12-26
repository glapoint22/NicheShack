import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaddingComponent } from './padding.component';



@NgModule({
  declarations: [PaddingComponent],
  imports: [
    CommonModule
  ],

  exports: [PaddingComponent]
})
export class PaddingModule { }

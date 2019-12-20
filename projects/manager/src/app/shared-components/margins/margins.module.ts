import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarginsComponent } from './margins.component';



@NgModule({
  declarations: [MarginsComponent],
  imports: [
    CommonModule
  ],

  exports: [MarginsComponent]
})
export class MarginsModule { }

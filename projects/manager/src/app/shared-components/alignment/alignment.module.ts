import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlignmentComponent } from './alignment.component';



@NgModule({
  declarations: [AlignmentComponent],
  imports: [
    CommonModule
  ],

  exports: [

    AlignmentComponent
  ]
})
export class AlignmentModule { }

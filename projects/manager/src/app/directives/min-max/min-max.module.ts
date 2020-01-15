import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinMaxDirective } from './min-max.directive';



@NgModule({
  declarations: [MinMaxDirective],
  imports: [
    CommonModule
  ],

  exports: [MinMaxDirective]
})
export class MinMaxModule { }

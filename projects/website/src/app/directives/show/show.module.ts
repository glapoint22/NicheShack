import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDirective } from './show.directive';



@NgModule({
  declarations: [ShowDirective],
  imports: [
    CommonModule
  ],
  exports: [ShowDirective]
})
export class ShowModule { }

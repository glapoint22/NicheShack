import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideDirective } from './hide.directive';



@NgModule({
  declarations: [HideDirective],
  imports: [
    CommonModule
  ],
  exports: [HideDirective]
})
export class HideModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDirective } from './show/show.directive';
import { HideDirective } from './hide/hide.directive';



@NgModule({
  declarations: [
    ShowDirective,
    HideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowDirective,
    HideDirective
  ]
})
export class ShowHideModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowDirective } from './show/show.directive';
import { HideDirective } from './hide/hide.directive';
import { OnShowDirective } from './on-show/on-show.directive';



@NgModule({
  declarations: [
    ShowDirective,
    HideDirective,
    OnShowDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowDirective,
    HideDirective,
    OnShowDirective
  ]
})
export class ShowHideModule { }

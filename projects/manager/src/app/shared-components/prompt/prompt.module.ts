import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptComponent } from './prompt.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [PromptComponent],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [PromptComponent]
})
export class PromptModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromptComponent } from './prompt.component';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [PromptComponent],
  imports: [
    CommonModule,
    DialogBoxModule,
    ShowHideModule
  ],
  exports: [PromptComponent]
})
export class PromptModule { }

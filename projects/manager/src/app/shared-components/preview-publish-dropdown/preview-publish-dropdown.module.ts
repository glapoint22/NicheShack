import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewPublishDropdownComponent } from './preview-publish-dropdown.component';



@NgModule({
  declarations: [PreviewPublishDropdownComponent],
  imports: [
    CommonModule
  ],

  exports: [
    PreviewPublishDropdownComponent
  ]
})
export class PreviewPublishDropdownModule { }

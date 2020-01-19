import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFormComponent } from './video-form.component';
import { MarginsModule } from '../margins/margins.module';
import { MediaBrowserModule } from '../media-browser/media-browser.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';



@NgModule({
  declarations: [VideoFormComponent],
  imports: [
    CommonModule,
    MarginsModule,
    MediaBrowserModule,
    DialogBoxModule,
    ShowHideModule
  ],
  
  exports: [VideoFormComponent]
})
export class VideoFormModule { }

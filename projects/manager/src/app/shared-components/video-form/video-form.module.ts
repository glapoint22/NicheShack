import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFormComponent } from './video-form.component';
import { MarginsModule } from '../margins/margins.module';
import { MediaBrowserModule } from '../media-browser/media-browser.module';



@NgModule({
  declarations: [VideoFormComponent],
  imports: [
    CommonModule,
    MarginsModule,
    MediaBrowserModule
  ],
  
  exports: [VideoFormComponent]
})
export class VideoFormModule { }

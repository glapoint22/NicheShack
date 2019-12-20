import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoFormComponent } from './video-form.component';
import { MarginsModule } from '../margins/margins.module';



@NgModule({
  declarations: [VideoFormComponent],
  imports: [
    CommonModule,
    MarginsModule
  ],
  
  exports: [VideoFormComponent]
})
export class VideoFormModule { }

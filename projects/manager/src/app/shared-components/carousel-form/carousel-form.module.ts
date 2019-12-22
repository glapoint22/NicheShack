import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselFormComponent } from './carousel-form.component';
import { MediaBrowserModule } from '../media-browser/media-browser.module';
import { LinkModule } from '../link/link.module';



@NgModule({
  declarations: [CarouselFormComponent],
  imports: [
    CommonModule,
    MediaBrowserModule,
    LinkModule
  ],
  exports: [CarouselFormComponent]
})
export class CarouselFormModule { }

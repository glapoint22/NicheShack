import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaBrowserComponent } from './media-browser.component';



@NgModule({
  declarations: [MediaBrowserComponent],
  imports: [
    CommonModule
  ],
  exports: [MediaBrowserComponent]
})
export class MediaBrowserModule { }
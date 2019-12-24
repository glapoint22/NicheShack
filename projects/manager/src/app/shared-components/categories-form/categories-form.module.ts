import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesFormComponent } from './categories-form.component';
import { MediaBrowserModule } from '../media-browser/media-browser.module';



@NgModule({
  declarations: [CategoriesFormComponent],
  imports: [
    CommonModule,
    MediaBrowserModule
  ],
  exports: [CategoriesFormComponent]
})
export class CategoriesFormModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageFormComponent } from './image-form.component';
import { MediaBrowserModule } from '../media-browser/media-browser.module';
import { BorderModule } from '../border/border.module';
import { CornersModule } from '../corners/corners.module';
import { ShadowModule } from '../shadow/shadow.module';
import { LinkModule } from '../link/link.module';
import { MarginsModule } from '../margins/margins.module';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [ImageFormComponent],
  imports: [
    CommonModule,
    MediaBrowserModule,
    BorderModule,
    CornersModule,
    ShadowModule,
    LinkModule,
    MarginsModule,
    DialogBoxModule,
    ShowHideModule
  ],
  exports: [ImageFormComponent]
})
export class ImageFormModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowFormComponent } from './row-form.component';
import { FillModule } from '../fill/fill.module';
import { BorderModule } from '../border/border.module';
import { CornersModule } from '../corners/corners.module';
import { ShadowModule } from '../shadow/shadow.module';
import { PaddingModule } from '../padding/padding.module';
import { AlignmentModule } from '../alignment/alignment.module';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [
    RowFormComponent],
  imports: [
    CommonModule,
    FillModule,
    BorderModule,
    CornersModule,
    ShadowModule,
    PaddingModule,
    AlignmentModule,
    DialogBoxModule,
    ShowHideModule
  ],

  exports: [RowFormComponent]
})
export class RowFormModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowFormComponent } from './row-form.component';
import { BorderModule } from '../border/border.module';
import { CornersModule } from '../corners/corners.module';
import { ShadowModule } from '../shadow/shadow.module';
import { PaddingModule } from '../padding/padding.module';
import { AlignmentModule } from '../alignment/alignment.module';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { OptionalFillModule } from '../optional-fill/optional-fill.module';



@NgModule({
  declarations: [
    RowFormComponent],
  imports: [
    CommonModule,
    OptionalFillModule,
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

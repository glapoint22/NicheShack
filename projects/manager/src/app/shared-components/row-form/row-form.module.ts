import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowFormComponent } from './row-form.component';
import { FillModule } from '../fill/fill.module';
import { BorderModule } from '../border/border.module';
import { CornersModule } from '../corners/corners.module';
import { ShadowModule } from '../shadow/shadow.module';
import { PaddingModule } from '../padding/padding.module';
import { AlignmentModule } from '../alignment/alignment.module';



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
    AlignmentModule
  ],

  exports: [RowFormComponent]
})
export class RowFormModule { }

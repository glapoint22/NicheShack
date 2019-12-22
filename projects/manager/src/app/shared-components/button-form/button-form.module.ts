import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonFormComponent } from './button-form.component';
import { ShadowModule } from '../shadow/shadow.module';
import { MarginsModule } from '../margins/margins.module';
import { FillModule } from '../fill/fill.module';
import { BorderModule } from '../border/border.module';
import { CornersModule } from '../corners/corners.module';
import { LinkModule } from '../link/link.module';
import { ButtonTextModule } from '../button-text/button-text.module';
import { TextModule } from '../text/text.module';




@NgModule({
  declarations: [
    ButtonFormComponent
  ],

  imports: [
    CommonModule,
    ShadowModule,
    MarginsModule,
    FillModule,
    BorderModule,
    CornersModule,
    LinkModule,
    ButtonTextModule,
    TextModule
  ],

  exports: [ButtonFormComponent]
})
export class ButtonFormModule { }

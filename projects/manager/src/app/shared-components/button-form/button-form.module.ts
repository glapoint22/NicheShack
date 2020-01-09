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
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';
import { ColorSwatchModule } from '../color-swatch/color-swatch.module';




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
    TextModule,
    ShowHideModule,
    DialogBoxModule,
    ColorSwatchModule
  ],

  exports: [ButtonFormComponent]
})
export class ButtonFormModule { }

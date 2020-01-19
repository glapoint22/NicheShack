import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineFormComponent } from './line-form.component';
import { ShadowModule } from '../shadow/shadow.module';
import { MarginsModule } from '../margins/margins.module';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { FillModule } from '../fill/fill.module';
import { LineBorderModule } from '../line-border/line-border.module';



@NgModule({
  declarations: [LineFormComponent],
  imports: [
    CommonModule,
    FillModule,
    ShadowModule,
    MarginsModule,
    DialogBoxModule,
    ShowHideModule,
    LineBorderModule
  ],
  exports: [LineFormComponent]
})
export class LineFormModule { }

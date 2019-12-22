import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerFormComponent } from './container-form.component';
import { FillModule } from '../fill/fill.module';
import { BorderModule } from '../border/border.module';
import { CornersModule } from '../corners/corners.module';
import { ShadowModule } from '../shadow/shadow.module';
import { MarginsModule } from '../margins/margins.module';



@NgModule({
  declarations: [ContainerFormComponent],
  imports: [
    CommonModule,
    FillModule,
    BorderModule,
    CornersModule,
    ShadowModule,
    MarginsModule
  ],

  exports: [ContainerFormComponent]
})
export class ContainerFormModule { }

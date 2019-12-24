import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineFormComponent } from './line-form.component';
import { BorderModule } from '../border/border.module';
import { ShadowModule } from '../shadow/shadow.module';
import { MarginsModule } from '../margins/margins.module';



@NgModule({
  declarations: [LineFormComponent],
  imports: [
    CommonModule,
    BorderModule,
    ShadowModule,
    MarginsModule
  ],
  exports: [LineFormComponent]
})
export class LineFormModule { }

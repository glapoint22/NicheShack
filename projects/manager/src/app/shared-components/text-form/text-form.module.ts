import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormComponent } from './text-form.component';
import { MarginsModule } from '../margins/margins.module';
import { LinkModule } from '../link/link.module';
import { TextModule } from '../text/text.module';



@NgModule({
  declarations: [TextFormComponent],
  imports: [
    CommonModule,
    TextModule,
    LinkModule,
    MarginsModule
  ],

  exports: [TextFormComponent]
})
export class TextFormModule { }

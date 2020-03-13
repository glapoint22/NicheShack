import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkFormComponent } from './link-form.component';
import { DialogBoxModule } from '../dialog-box/dialog-box.module';
import { LinkModule } from '../link/link.module';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [
    LinkFormComponent
  ],
  imports: [
    CommonModule,
    DialogBoxModule,
    LinkModule,
    ShowHideModule
  ],
  exports: [
    LinkFormComponent
  ]
})
export class LinkFormModule { }

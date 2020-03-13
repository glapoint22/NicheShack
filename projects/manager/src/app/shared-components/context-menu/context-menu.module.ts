import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [ContextMenuComponent],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [
    ContextMenuComponent
  ]
})
export class ContextMenuModule { }

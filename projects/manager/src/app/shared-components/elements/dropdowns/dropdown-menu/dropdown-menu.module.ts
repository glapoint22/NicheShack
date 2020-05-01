import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';



@NgModule({
  declarations: [
    DropdownMenuComponent
  ],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [
    DropdownMenuComponent
  ]
})
export class DropdownMenuModule { }

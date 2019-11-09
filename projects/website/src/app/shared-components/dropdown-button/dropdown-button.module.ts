import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownButtonComponent } from './dropdown-button.component';
import { ShowHideModule } from '../../directives/show-hide/show-hide.module';



@NgModule({
  declarations: [DropdownButtonComponent],
  imports: [
    CommonModule,
    ShowHideModule
  ],
  exports: [DropdownButtonComponent]
})
export class DropdownButtonModule { }

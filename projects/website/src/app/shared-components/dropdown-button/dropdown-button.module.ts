import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownButtonComponent } from './dropdown-button.component';
import { ShowModule } from '../../directives/show/show.module';
import { HideModule } from '../../directives/hide/hide.module';



@NgModule({
  declarations: [DropdownButtonComponent],
  imports: [
    CommonModule,
    ShowModule,
    HideModule
  ],
  exports: [DropdownButtonComponent]
})
export class DropdownButtonModule { }

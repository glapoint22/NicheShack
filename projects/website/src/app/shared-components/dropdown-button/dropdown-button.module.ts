import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownButtonComponent } from './dropdown-button.component';
import { ShowModule } from '../../directives/show/show.module';



@NgModule({
  declarations: [DropdownButtonComponent],
  imports: [
    CommonModule,
    ShowModule
  ],
  exports: [DropdownButtonComponent]
})
export class DropdownButtonModule { }

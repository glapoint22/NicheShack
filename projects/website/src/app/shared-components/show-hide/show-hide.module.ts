import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowHideComponent } from './show-hide.component';



@NgModule({
  declarations: [ShowHideComponent],
  imports: [
    CommonModule
  ],
  exports: [ShowHideComponent]
})
export class ShowHideModule { }

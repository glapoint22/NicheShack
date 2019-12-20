import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShadowComponent } from './shadow.component';



@NgModule({
  declarations: [ShadowComponent],
  imports: [
    CommonModule
  ],

  exports: [ShadowComponent]
})
export class ShadowModule { }

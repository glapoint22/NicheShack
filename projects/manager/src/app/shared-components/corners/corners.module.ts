import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CornersComponent } from './corners.component';



@NgModule({
  declarations: [CornersComponent],
  imports: [
    CommonModule
  ],

  exports: [CornersComponent]
})
export class CornersModule { }

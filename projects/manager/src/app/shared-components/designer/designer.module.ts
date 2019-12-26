import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './designer.component';



@NgModule({
  declarations: [DesignerComponent],
  imports: [
    CommonModule
  ],
  exports: [DesignerComponent]
})
export class DesignerModule { }

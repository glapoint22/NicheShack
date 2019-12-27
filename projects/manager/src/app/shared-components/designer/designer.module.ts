import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerComponent } from './designer.component';
import { WidgetsModule } from '../widgets/widgets.module';



@NgModule({
  declarations: [DesignerComponent],
  imports: [
    CommonModule,
    WidgetsModule
  ],
  exports: [DesignerComponent]
})
export class DesignerModule { }

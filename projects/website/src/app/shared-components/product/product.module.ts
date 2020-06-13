import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { StarsModule } from 'shared-components/stars/stars.module';



@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    StarsModule
  ],
  exports: [ProductComponent]
})
export class ProductModule { }

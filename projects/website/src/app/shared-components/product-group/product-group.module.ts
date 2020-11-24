import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGroupComponent } from './product-group.component';



@NgModule({
  declarations: [ProductGroupComponent],
  imports: [
    CommonModule
  ],
  exports: [ProductGroupComponent]
})
export class ProductGroupModule { }

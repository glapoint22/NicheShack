import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGroupComponent } from './product-group.component';
import { ProductModule } from '../product/product.module';



@NgModule({
  declarations: [ProductGroupComponent],
  imports: [
    CommonModule,
    ProductModule
  ],
  exports: [ProductGroupComponent]
})
export class ProductGroupModule { }

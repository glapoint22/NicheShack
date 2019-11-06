import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGroupComponent } from './product-group.component';
import { ProductModule } from '../product/product.module';
import { QuickLookModule } from '../quick-look/quick-look.module';



@NgModule({
  declarations: [ProductGroupComponent],
  imports: [
    CommonModule,
    ProductModule,
    QuickLookModule
  ],
  exports: [ProductGroupComponent]
})
export class ProductGroupModule { }

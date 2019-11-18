import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductInfoComponent } from './product-info.component';
import { StarsModule } from '../stars/stars.module';



@NgModule({
  declarations: [ProductInfoComponent],
  imports: [
    CommonModule,
    StarsModule
  ],
  exports: [ProductInfoComponent]
})
export class ProductInfoModule { }

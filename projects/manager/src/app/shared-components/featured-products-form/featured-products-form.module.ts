import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedProductsFormComponent } from './featured-products-form.component';



@NgModule({
  declarations: [FeaturedProductsFormComponent],
  imports: [
    CommonModule
  ],
  exports: [FeaturedProductsFormComponent]
})
export class FeaturedProductsFormModule { }

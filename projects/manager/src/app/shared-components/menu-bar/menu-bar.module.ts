import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from './menu-bar.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { ProductReportFormComponent } from './product-report-form/product-report-form.component';
import { FeaturedProductsFormComponent } from './featured-products-form/featured-products-form.component';



@NgModule({
  declarations: [
    MenuBarComponent, 
    MessageFormComponent, 
    ProductReportFormComponent,
    FeaturedProductsFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuBarComponent, 
    MessageFormComponent, 
    ProductReportFormComponent,
    FeaturedProductsFormComponent
  ]
})
export class MenuBarModule { }

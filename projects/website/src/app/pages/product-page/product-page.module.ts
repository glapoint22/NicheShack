import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';


@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    HeaderFooterModule
  ]
})
export class ProductPageModule { }

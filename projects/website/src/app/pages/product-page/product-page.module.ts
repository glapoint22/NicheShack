import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPageRoutingModule } from './product-page-routing.module';
import { ProductPageComponent } from './product-page.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { ProductInfoModule } from '../../shared-components/product-info/product-info.module';
import { ReviewsModule } from '../../shared-components/reviews/reviews.module';

@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    CommonModule,
    ProductPageRoutingModule,
    HeaderFooterModule,
    ProductInfoModule,
    ReviewsModule
  ]
})
export class ProductPageModule { }
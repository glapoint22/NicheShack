import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { HomeComponentsModule } from './components/home-components.module';
import { ProductGroupModule } from '../../shared-components/product-group/product-group.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderFooterModule,
    HomeComponentsModule,
    ProductGroupModule
  ]
})
export class HomeModule { }

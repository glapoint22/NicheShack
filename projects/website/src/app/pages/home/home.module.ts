import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { HomeComponentsModule } from './components/home-components.module';
import { SharePageModule } from '../share-page/share-page.module';
import { PageContentModule } from '../../shared-components/page-content/page-content.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HeaderFooterModule,
    HomeComponentsModule,
    SharePageModule,
    PageContentModule
  ]
})
export class HomeModule { }

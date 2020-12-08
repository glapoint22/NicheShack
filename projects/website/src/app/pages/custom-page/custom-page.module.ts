import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomPageRoutingModule } from './custom-page-routing.module';
import { CustomPageComponent } from './custom-page.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { PageContentModule } from '../../shared-components/page-content/page-content.module';


@NgModule({
  declarations: [CustomPageComponent],
  imports: [
    CommonModule,
    CustomPageRoutingModule,
    HeaderFooterModule,
    PageContentModule
  ]
})
export class CustomPageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseRoutingModule } from './browse-routing.module';
import { BrowseComponent } from './browse.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { PageContentModule } from '../../shared-components/page-content/page-content.module';


@NgModule({
  declarations: [BrowseComponent],
  imports: [
    CommonModule,
    BrowseRoutingModule,
    HeaderFooterModule,
    PageContentModule
  ]
})
export class BrowseModule { }

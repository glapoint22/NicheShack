import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { PageContentModule } from '../../shared-components/page-content/page-content.module';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    HeaderFooterModule,
    PageContentModule
  ]
})
export class SearchModule { }

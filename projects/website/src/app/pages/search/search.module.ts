import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
// import { FormsModule } from '@angular/forms';
// import { ShowHideModule } from 'directives/show-hide/show-hide.module';
// import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';
// import { PaginatorModule } from 'shared-components/paginator/paginator.module';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    HeaderFooterModule,
    // PaginatorModule,
    // FormsModule,
    // ShowHideModule,
    // CustomInputModule
  ]
})
export class SearchModule { }

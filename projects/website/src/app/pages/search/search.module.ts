import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FiltersPanelModule } from '../../shared-components/filters-panel/filters-panel.module';
import { GridWidgetModule } from '../../shared-components/page-content/grid-widget/grid-widget.module';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { PaginatorModule } from '../../shared-components/paginator/paginator.module';
import { FormsModule } from '@angular/forms';
import { ShowHideModule } from 'directives/show-hide/show-hide.module';
import { CustomInputModule } from 'shared-components/custom-input/custom-input.module';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FiltersPanelModule,
    GridWidgetModule,
    HeaderFooterModule,
    PaginatorModule,
    FormsModule,
    ShowHideModule,
    CustomInputModule
  ]
})
export class SearchModule { }

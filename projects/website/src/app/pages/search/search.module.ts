import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { FiltersPanelModule } from '../../shared-components/filters-panel/filters-panel.module';
import { GridWidgetModule } from '../../shared-components/page-content/grid-widget/grid-widget.module';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FiltersPanelModule,
    GridWidgetModule
  ]
})
export class SearchModule { }

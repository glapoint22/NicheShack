import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';


@NgModule({
  declarations: [ListsComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    HeaderFooterModule
  ]
})
export class ListsModule { }

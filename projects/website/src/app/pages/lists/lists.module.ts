import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsRoutingModule } from './lists-routing.module';
import { ListsComponent } from './lists.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { StarsModule } from '../../shared-components/stars/stars.module';
import { DropdownButtonModule } from '../../shared-components/dropdown-button/dropdown-button.module';


@NgModule({
  declarations: [ListsComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    HeaderFooterModule,
    DropdownButtonModule,
    StarsModule
  ]
})
export class ListsModule { }

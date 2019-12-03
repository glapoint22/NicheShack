import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedListRoutingModule } from './shared-list-routing.module';
import { SharedListComponent } from './shared-list.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { FormsModule } from '@angular/forms';
import { StarsModule } from '../../shared-components/stars/stars.module';


@NgModule({
  declarations: [SharedListComponent],
  imports: [
    CommonModule,
    SharedListRoutingModule,
    HeaderFooterModule,
    FormsModule,
    StarsModule
  ]
})
export class SharedListModule { }

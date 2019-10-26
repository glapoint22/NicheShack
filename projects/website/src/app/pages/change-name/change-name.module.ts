import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeNameRoutingModule } from './change-name-routing.module';
import { ChangeNameComponent } from './change-name.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChangeNameComponent],
  imports: [
    CommonModule,
    ChangeNameRoutingModule,
    HeaderFooterModule,
    FormsModule
  ]
})
export class ChangeNameModule { }

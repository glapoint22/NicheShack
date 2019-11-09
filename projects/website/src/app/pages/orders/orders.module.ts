import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { DropdownButtonModule } from '../../shared-components/dropdown-button/dropdown-button.module';
import { FormsModule } from '@angular/forms';
import { CustomInputModule } from '../../custom-input/custom-input.module';
import { ShowHideModule } from '../../directives/show-hide/show-hide.module';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    HeaderFooterModule,
    DropdownButtonModule,
    FormsModule,
    CustomInputModule,
    ShowHideModule
  ]
})
export class OrdersModule { }

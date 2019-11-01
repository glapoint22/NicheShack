import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { DropdownButtonModule } from '../../shared-components/dropdown-button/dropdown-button.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    HeaderFooterModule,
    DropdownButtonModule,
    FormsModule
  ]
})
export class OrdersModule { }

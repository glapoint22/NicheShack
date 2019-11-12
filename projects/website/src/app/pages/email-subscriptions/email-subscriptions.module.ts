import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailSubscriptionsRoutingModule } from './email-subscriptions-routing.module';
import { EmailSubscriptionsComponent } from './email-subscriptions.component';


@NgModule({
  declarations: [EmailSubscriptionsComponent],
  imports: [
    CommonModule,
    EmailSubscriptionsRoutingModule
  ]
})
export class EmailSubscriptionsModule { }

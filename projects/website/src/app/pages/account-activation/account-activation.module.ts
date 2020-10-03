import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountActivationRoutingModule } from './account-activation-routing.module';
import { AccountActivationComponent } from './account-activation.component';


@NgModule({
  declarations: [AccountActivationComponent],
  imports: [
    CommonModule,
    AccountActivationRoutingModule
  ]
})
export class AccountActivationModule { }

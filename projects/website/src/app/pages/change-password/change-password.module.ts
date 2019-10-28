import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { HeaderFooterModule } from '../../shared-components/header-footer/header-footer.module';
import { ChangePasswordComponent } from './change-password.component';
import { FormsModule } from '@angular/forms';
import { MatchValueModule } from '../../directives/match-value/match-value.module';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    HeaderFooterModule,
    FormsModule,
    MatchValueModule
  ]
})
export class ChangePasswordModule { }

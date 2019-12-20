import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account.component';
import { FormsModule } from '@angular/forms';
import { MatchValueModule } from 'directives/match-value/match-value.module';


@NgModule({
  declarations: [CreateAccountComponent],
  imports: [
    CommonModule,
    CreateAccountRoutingModule,
    FormsModule,
    MatchValueModule
  ]
})
export class CreateAccountModule { }

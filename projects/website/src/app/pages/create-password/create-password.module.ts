import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePasswordRoutingModule } from './create-password-routing.module';
import { CreatePasswordComponent } from './create-password.component';
import { FormsModule } from '@angular/forms';
import { MatchValueModule } from '../../directives/match-value/match-value.module';


@NgModule({
  declarations: [CreatePasswordComponent],
  imports: [
    CommonModule,
    CreatePasswordRoutingModule,
    FormsModule,
    MatchValueModule
  ]
})
export class CreatePasswordModule { }

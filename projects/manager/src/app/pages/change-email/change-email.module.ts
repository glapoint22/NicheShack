import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeEmailRoutingModule } from './change-email-routing.module';
import { ChangeEmailComponent } from './change-email.component';
import { ValidationPageModule } from '../validation-page/validation-page.module';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { FormsModule } from '@angular/forms';
import { MatchValueModule } from 'directives/match-value/match-value.module';


@NgModule({
  declarations: [ChangeEmailComponent],
  imports: [
    CommonModule,
    ChangeEmailRoutingModule,
    ValidationPageModule,
    MenuBarModule,
    FormsModule,
    MatchValueModule
  ]
})
export class ChangeEmailModule { }

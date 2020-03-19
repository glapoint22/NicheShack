import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { ValidationPageModule } from '../validation-page/validation-page.module';
import { FormsModule } from '@angular/forms';
import { MatchValueModule } from 'directives/match-value/match-value.module';
import { MenuBarModule } from '../../shared-components/menu-bar/menu-bar.module';
import { ContextMenuModule } from '../../shared-components/context-menu/context-menu.module';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    ValidationPageModule,
    FormsModule,
    MatchValueModule,
    MenuBarModule,
    ContextMenuModule
  ]
})
export class ChangePasswordModule { }
